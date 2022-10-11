// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../middleware/mogodb';
import { AuthController } from '../../../src/controllers/AuthController';

function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    return AuthController.authUser(req, res);
}

export default connectDB(handler);