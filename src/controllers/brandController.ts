import { NextFunction, Request, Response } from 'express';
import brandService from '../services/brandService';

const brandController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await brandService.getAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const result = await brandService.create(data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await brandService.update(id, data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await brandService.delete(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};

export default brandController;
