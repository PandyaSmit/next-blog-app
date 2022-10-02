import { IBlogDetails, IBlogUpdate } from '../dtos/IBlogs';
import BlogsModel from '../models/BlogsModel';

class BlogsServices {
    async getBlogs(): Promise<IBlogDetails[]> {
        const blogs = await BlogsModel.find().lean();

        const blogsResponse = blogs.map((blog: any) => {
            const blogResp = JSON.parse(JSON.stringify(blog));
            blogResp.user = {
                _id: '123',
                username: 'smit',
                email: 'smitpandya20@gmail.com'
            }

            return blogResp;
        })

        return blogsResponse;
    }

    async createBlog(blog: IBlogDetails) {
        await BlogsModel.create(blog);
    }

    async updateBlog(id: string, blog: IBlogUpdate) {
        blog.updatedAt = new Date();
        await BlogsModel.updateOne({ _id: id }, blog);
    }

    async getBlogById(id: string) {
        const blog = await BlogsModel.findOne({ _id: id }).lean();

        return {
            ...blog,
            user: {
                _id: '123',
                username: 'smit',
                email: 'smitpandya20@gmail.com'
            }
        };
    }

    async removeBlogById(id: string) {
        const updateOptions = {
            isDeleted: true,
            updatedAt: new Date(),
        };
        await BlogsModel.updateOne({ _id: id }, updateOptions);
    }
}

export const blogsService = new BlogsServices();