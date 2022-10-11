import mongoose, { Schema } from 'mongoose';
import { users_status_enum } from '../constants/users';
import { v4 as uuid } from 'uuid';

const UsersSchema = new Schema(
    {
        _id: { type: String, required: true, default: uuid },
        username: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        status: {
            type: Number,
            default: users_status_enum.active,
            required: true,
        },
        createdAt: { type: Date, default: new Date() },
        updatedAt: { type: Date, default: new Date() },
        isDeleted: { type: Boolean, default: false }
    },
    { collection: 'Users' }
);


global.Users = global?.Users || mongoose.model('Users', UsersSchema);

export default global.Users;