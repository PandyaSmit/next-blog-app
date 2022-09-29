import type { NextApiRequest, NextApiResponse } from 'next';

type IBlog = {
    _id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
    user: {
        _id: string;
        username: string;
        email: string;
    };
}

type IBlogsResponse = {
    blogs: IBlog[]
}

export class BlogsController {
    static async getBlogs(req: NextApiRequest, res: NextApiResponse<IBlogsResponse>) {
        const blogs: IBlog[] = [{
            _id: '123',
            title: 'First Blog',
            content: 'this is my first blog',
            authorId: '123',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user: {
                _id: '123',
                username: 'smit',
                email: 'smitpandya20@gmail.com'
            }
        }];
        res.status(200).json({ blogs });
    }

    static async createBlog(req: NextApiRequest, res: NextApiResponse) {
        res.status(200).json({ message: 'blog created' });
    }

    static updateBlog(req: NextApiRequest, res: NextApiResponse) {
        res.status(200).json({ message: 'update blog working' });
    }

    static getBlogById(req: NextApiRequest, res: NextApiResponse) {
        res.status(200).json({ message: 'get blog by id working' });
    }

    static removeBlogById(req: NextApiRequest, res: NextApiResponse) {
        res.status(200).json({ message: 'remove blog working' });
    }
}