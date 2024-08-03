import { Request, Response, NextFunction } from 'express';
import HttpError from '../errors/HttpError';

const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    const code = err.name || 'Internal Server Error';

    res.status(statusCode).json({
        code: code,
        success: false,
        error: message,
    });
};

export default errorHandler;
