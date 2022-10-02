import mongoose, { Schema } from 'mongoose';
import { blogs_status_enum } from '../constants/blogs';
import { v4 as uuid } from 'uuid';

const BlogsSchema = new Schema(
    {
        _id: { type: String, required: true, default: uuid },
        title: { type: String, required: true },
        content: { type: String, required: true },
        authorId: { type: String, required: true },
        status: {
            type: Number,
            default: blogs_status_enum.draft,
            required: true,
        },
        publishedDate: { type: Date, default: new Date() },
        tags: { type: Array },
        attachments: { type: Array },
        createdAt: { type: Date, default: new Date() },
        updatedAt: { type: Date, default: new Date() },
        isDeleted: { type: Boolean, default: false }
    },
    { collection: 'Blogs' }
);


global.Blogs = global?.Blogs || mongoose.model('Blogs', BlogsSchema);

export default global.Blogs;