import { NextFunction, Request, Response } from 'express';
import categoryService from '../services/categoryService';
const categoryController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await categoryService.getAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },
    getAllAdmin: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await categoryService.getAllAdmin();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const result = await categoryService.create(data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await categoryService.update(id, data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await categoryService.delete(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};

export default categoryController;
