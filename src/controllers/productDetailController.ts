import { NextFunction, Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../errors/error';
import ProductModel from '../model/productModel';
import productDetailService from '../services/producDetailService';
import { log } from 'console';
const productDetailController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await productDetailService.getAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    getById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = await productDetailService.getById!(id);
            if (!data) {
                throw new NotFoundError(`Product detail with ID ${id} not found`);
            }
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // find product
            if (!req.body.productId) {
                throw new BadRequestError('productId is required');
            } else {
                const product = await ProductModel.findById(req.body.productId);
                if (!product) {
                    throw new NotFoundError('Product not found');
                }
            }

            const data = req.body;
            const result = await productDetailService.create(data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await productDetailService.update(id, data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await productDetailService.delete(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};

export default productDetailController;
