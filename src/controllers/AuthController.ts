import _ from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IUserDetails } from '../dtos/IUsers';
import { authService } from '../services/AuthService';

export class AuthController {
    static async signIn(req: NextApiRequest, res: NextApiResponse) {
        try {
            const user: IUserDetails = await authService.getUserByEmail(req.body.email.toLowerCase());

            if (!user) {
                return res.status(404).json({ error: 'user not found' });
            } else if (user.password !== req.body.password) {
                return res.status(400).json({ error: 'wrong password' });
            }

            res.status(200).json({ message: 'aunthenticated' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'please try again' });
        }
    }

    static async createUser(req: NextApiRequest, res: NextApiResponse) {
        try {
            const findOptions = {
                $or: [
                    {
                        username: req.body.username,
                        isDeleted: false
                    },
                    {
                        email: req.body.email.toLowerCase(),
                        isDeleted: false
                    }
                ]
            };

            const user = await authService.getUser(findOptions);

            if (user && user.email === req.body.email.toLowerCase()) {
                return res.status(409).json({ error: 'email already registered' });
            } if (user && user?.username === req.body.username) {
                return res.status(409).json({ error: 'username already taken' });
            }

            req.body.email = req.body.email.toLowerCase();

            await authService.createUser(req.body);
            res.status(200).json({ message: 'user created' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'please try again' });
        }
    }
}