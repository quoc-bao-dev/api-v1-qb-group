import { NextFunction, Request, Response } from 'express';
const brandMiddleWare = {
    log: (req: Request, res: Response, next: NextFunction) => {
        next();
    },
};

export default brandMiddleWare;
