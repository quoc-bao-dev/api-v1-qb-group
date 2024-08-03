import { NextFunction, Request, Response } from 'express';
import voucherService from '../services/voucherService';

const voucherController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await voucherService.getAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    getByCode: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { code } = req.params;
            const data = await voucherService.getByCode(code);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const result = await voucherService.create(data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await voucherService.update(id, data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await voucherService.delete(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    getById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await voucherService.getById!(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};

export default voucherController;
