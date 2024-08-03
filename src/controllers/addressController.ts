import { NextFunction, Request, Response } from 'express';
import addressService from '../services/addressService';
const addressController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await addressService.getAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    getByUserId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = await addressService.getbyUserId(id);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const result = await addressService.create(data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await addressService.update(id, data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await addressService.delete(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};

export default addressController;
