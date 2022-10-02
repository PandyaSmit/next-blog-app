import type { NextApiRequest, NextApiResponse } from 'next';
import { IBlogDetails } from '../dtos/IBlogs';
import { blogsService } from '../services/BlogsService';

export class BlogsController {
    static async getBlogs(req: NextApiRequest, res: NextApiResponse) {
        try {
            const blogs: IBlogDetails[] = await blogsService.getBlogs();
            res.status(200).json(blogs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'please try again' });
        }
    }

    static async createBlog(req: NextApiRequest, res: NextApiResponse) {
        try {
            await blogsService.createBlog(req.body);
            res.status(200).json({ message: 'blog created' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'please try again' });
        }
    }

    static async updateBlog(req: NextApiRequest, res: NextApiResponse) {
        try {
            const id = req.query.id?.toString();

            if (!id) {
                return res.status(200).json({ message: 'id is required' });
            }

            await blogsService.updateBlog(id, req.body);
            res.status(200).json({ message: 'blog updated' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'please try again' });
        }
    }

    static async getBlogById(req: NextApiRequest, res: NextApiResponse) {
        try {
            const id = req.query.id?.toString();

            if (!id) {
                return res.status(200).json({ message: 'id is required' });
            }

            const blog = await blogsService.getBlogById(id);

            if (!blog) {
                return res.status(404).json({ error: 'blog not found' });
            }

            res.status(200).json(blog);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'please try again' });
        }
    }

    static async removeBlogById(req: NextApiRequest, res: NextApiResponse) {
        try {
            const id = req.query.id?.toString();

            if (!id) {
                return res.status(200).json({ message: 'id is required' });
            }

            await blogsService.removeBlogById(id);

            res.status(200).json({ message: 'blog removed' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'please try again' });
        }
    }
}