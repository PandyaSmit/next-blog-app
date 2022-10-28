export type IUserDetails = {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}

export type IUserCreate = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    status: number;
    isDeleted: boolean;
}

export type IUserUpdate = {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    status?: number;
    isDeleted?: boolean;
    updatedAt?: Date;
}