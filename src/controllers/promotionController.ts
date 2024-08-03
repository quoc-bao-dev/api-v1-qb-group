import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/error';
import promotionService from '../services/promotionService';
const promotionController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await promotionService.getAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const result = await promotionService.create(data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await promotionService.update(id, data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await promotionService.delete(id);
            res.status(200).json(result);
        } catch (error) {
            next(new BadRequestError(error.message));
        }
    },
};

export default promotionController;
