// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { BlogsController } from '../../../src/controllers/BlogsController';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query } = req;

    if (method === 'GET') {
        return BlogsController.getBlogs(req, res);
    } else if (method === 'POST') {
        return BlogsController.createBlog(req, res);
    } else if (method === 'PUT') {
        return BlogsController.updateBlog(req, res);
    } else if (method === 'DELETE') {
        return BlogsController.removeBlogById(req, res);
    } else if (method === 'GET' && query.id) {
        return BlogsController.getBlogById(req, res);
    }
}
