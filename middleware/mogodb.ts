import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { MONGO_DATABASE } from '../src/constants';

const connectDB = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res);
    }

    if (!MONGO_DATABASE.URL) {
        throw Error('PLEASE EXPORT DB URL')
    }

    // Use new db connection
    await mongoose.connect(MONGO_DATABASE.URL);
    return handler(req, res);
};

export default connectDB;