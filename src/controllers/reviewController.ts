import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../errors/error';
import reviewService from '../services/reviewService';

const reviewController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await reviewService.getAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    getByProduct: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = await reviewService.getByProduct(id);
            if (!data) {
                throw new NotFoundError(
                    `Reviews for product with ID ${id} not found`
                );
            }
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    getByUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = await reviewService.getByUser(id);
            if (!data) {
                throw new NotFoundError(
                    `Reviews for user with ID ${id} not found`
                );
            }
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body.json;
            const files = req.files;
            const images = (files as Express.Multer.File[])!.map(
                (file) => `${file.filename}`
            );

            const result = await reviewService.create({
                ...JSON.parse(data),
                images,
            });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await reviewService.update(id, data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await reviewService.delete(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};

export default reviewController;
