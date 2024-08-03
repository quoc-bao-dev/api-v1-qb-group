import { NextFunction, Response } from 'express';
import { AuthenticateRequest } from './authenticateMiddleware';
import { ForbiddenError, UnauthorizedError } from '../errors/error';

export const checkRole = (roles: string[]) => (req: AuthenticateRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw new UnauthorizedError('Unauthorized');
        }
        const { role } = req.user;
        if (role && roles.includes(role)) {
            return next();
        } else {
            throw new ForbiddenError('Forbidden');
        }
    } catch (error) {
        next(error); // Chuyển lỗi đến middleware xử lý lỗi
    }
};
