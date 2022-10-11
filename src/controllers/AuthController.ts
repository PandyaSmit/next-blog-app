import type { NextApiRequest, NextApiResponse } from 'next';
import { IUserDetails } from '../dtos/IUsers';
import { authService } from '../services/AuthService';

export class AuthController {
    static async authUser(req: NextApiRequest, res: NextApiResponse) {
        try {
            const user: IUserDetails = await authService.getUserByUsername(req.body.username);

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
            let user = authService.getUserByUsername(req.body.username);

            if (user) {

            }


            await authService.createUser(req.body);
            res.status(200).json({ message: 'user created' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'please try again' });
        }
    }
}