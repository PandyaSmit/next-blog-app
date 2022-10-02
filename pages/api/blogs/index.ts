// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../middleware/mogodb';
import { BlogsController } from '../../../src/controllers/BlogsController';

function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;

    if (method === 'GET') {
        return BlogsController.getBlogs(req, res);
    } else if (method === 'POST') {
        return BlogsController.createBlog(req, res);
    } else {
        return res.status(404);
    }
}

export default connectDB(handler);