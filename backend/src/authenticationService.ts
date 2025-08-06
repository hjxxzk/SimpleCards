import mongoose from 'mongoose';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY: Secret = process.env.ACCESS_TOKEN_SECRET || "";

interface CustomRequest extends Request {
    id?: string;
    token?: any;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Please authenticate' });;
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).id = (decoded as any).id;
        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};