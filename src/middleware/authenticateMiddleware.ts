import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors/error';
import { UserDocument } from '../model/userModel';
import { verifyAccessToken } from '../util/tokenUtil';

export interface AuthenticateRequest extends Request {
    user?: Partial<UserDocument>;
}
export const authenticateMiddleware = (req: AuthenticateRequest, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new UnauthorizedError('Unauthorized');
        }

        const token = authorization.split(' ')[1];

        if (token) {
            const payload = verifyAccessToken(token);
            if (payload) {
                req.user = payload;
                return next();
            } else {
                throw new UnauthorizedError('Unauthorized');
            }
        }
        throw new UnauthorizedError('Unauthorized');
    } catch (error) {
        next(error); // Chuyển lỗi đến middleware xử lý lỗi
    }
};
