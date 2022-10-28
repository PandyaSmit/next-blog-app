import _ from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import { authService } from '../services/AuthService';
import { utilServices } from '../services/UtilServices';

export class AuthController {
    static async auth(req: NextApiRequest, res: NextApiResponse) {
        try {
            const auth = req.headers.authorization;

            if (!auth) {
                return res.status(400).json({ error: 'unauthorized' });
            }

            const bearerToken = auth.split('bearer' || 'Bearer')[1];

            const decodedToken = utilServices.verifyToken(bearerToken);

            if (!decodedToken || !decodedToken['id']) {
                return res.status(400).json({ error: 'unauthorized' });
            }

            const user = await authService.getUserById(decodedToken['id']);

            if (!user) {
                return res.status(400).json({ error: 'unauthorized' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'please try again' });
        }
    }

    static async signIn(req: NextApiRequest, res: NextApiResponse) {
        try {
            const user = await authService.getUserByEmail(req.body.email.toLowerCase());

            if (!user) {
                return res.status(404).json({ error: 'user not found' });
            } else if (!utilServices.descryptPassword(req.body.password, user.password)) {
                return res.status(400).json({ error: 'wrong password' });
            }

            const token = utilServices.createToken({ id: user._id, email: user.email });

            res.status(200).json({ token });
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

            const userPayload = {
                ...req.body,
                email: req.body.email.toLowerCase(),
                password: utilServices.encryptPassword(req.body.password)
            }

            await authService.createUser(userPayload);
            res.status(200).json({ message: 'user created' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'please try again' });
        }
    }
}