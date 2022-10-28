import jwt from 'jsonwebtoken';
import * as crypto from 'crypto-js';
import { SECRET_KEY } from '../constants';

class UtilServices {
    encryptPassword = (password: string) => {
        return crypto.AES.encrypt(password, SECRET_KEY).toString();
    }

    descryptPassword = (password: string, hashedPassword: string) => {
        const bytes = crypto.AES.decrypt(hashedPassword, SECRET_KEY);
        const originalPassword = bytes.toString(crypto.enc.Utf8);
        return originalPassword === password;
    }

    createToken = (payload: any) => {
        return jwt.sign(payload, SECRET_KEY);
    }

    verifyToken = (token: string) => {
        return jwt.verify(token, SECRET_KEY);
    }
}

export const utilServices = new UtilServices();