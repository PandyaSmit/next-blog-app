// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { BlogsController } from '../../../src/controllers/BlogsController';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query } = req;

    if (method === 'PUT' && query.id) {
        return BlogsController.updateBlog(req, res);
    } else if (method === 'DELETE' && query.id) {
        return BlogsController.removeBlogById(req, res);
    } else if (method === 'GET' && query.id) {
        return BlogsController.getBlogById(req, res);
    } else {
        return res.status(404);
    }
}
