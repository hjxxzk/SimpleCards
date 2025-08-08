import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    id?: string;
    token?: any;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const SECRET_KEY: Secret = process.env.ACCESS_TOKEN_SECRET || "";

    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Please authenticate (no token provided)' });;
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).id = (decoded as any).id;
        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};