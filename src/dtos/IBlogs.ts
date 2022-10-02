export type IBlogDetails = {
    _id: string;
    title: string;
    content: string;
    authorId: string;
    status: number;
    publishedDate: Date;
    tags: string[];
    attachments: string[];
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: {
        _id: string;
        username: string;
        email: string;
    };
}

export type IBlogsResponse = {
    blogs: IBlogDetails[]
}

export type IBlogCreate = {
    title: string;
    content: string;
    status: number;
    publishedDate?: Date;
    tags: string[];
    attachments: string[];
    isDeleted: boolean;
}

export type IBlogUpdate = {
    title?: string;
    content?: string;
    status: number;
    publishedDate: Date;
    tags: string[];
    attachments: string[];
    isDeleted: boolean;
    updatedAt?: Date;
}