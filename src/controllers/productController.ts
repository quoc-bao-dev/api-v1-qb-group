import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import { NotFoundError } from '../errors/error';
import BrandModel from '../model/brandModel';
import CategoryModel from '../model/categoryModel';
import ProductDetailModel, { ProductDetailDocument } from '../model/productDetailModel';
import productService from '../services/productService';
import ProductModel from '../model/productModel';

interface QuerryParams {
    [key: string]: string | object;
}

const productController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await productService.getAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    getRelated: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = await productService.getRelated(id);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },
    getPagination: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
            const query: QuerryParams = {};
            const sort: QuerryParams = {};

            if (req.query.category) {
                query.category = req.query.category as string;
            }
            if (req.query.brand) {
                query.brand = req.query.brand as string;
            }

            if (req.query.search) {
                query.$or = [
                    { name: { $regex: req.query.search as string, $options: 'i' } },
                    { description: { $regex: req.query.search as string, $options: 'i' } },
                ];
            }

            if (req.query.sort) {
                const sortParams = (req.query.sort as string).split(':');
                if (sortParams.length === 2) {
                    const sortField = sortParams[0];
                    const sortDirection = sortParams[1] === 'desc' ? -1 : 1;
                    _.set(sort, sortField, sortDirection);
                }
            }

            if (req.query.price) {
                query.price = req.query.price as string;
            }

            const result = await productService.getPagination(page, limit, query, sort);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    getBestSelling: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await ProductModel.find({ isShow: true }).sort({ sold: -1 }).limit(10);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    getTopView: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await ProductModel.find({ isShow: true }).sort({ view: -1 }).limit(10);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
    getById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = await productService.getById!(id);
            const detail = await ProductDetailModel.findOne({ productId: id });
            let newDetail: ProductDetailDocument | null = null;
            if (!detail) {
                const detailProduct = await ProductDetailModel.create({ productId: id });
                await detailProduct.save();
                newDetail = detailProduct;
            }
            const detaiData = detail === null ? newDetail?.toObject() : detail.toObject();
            const responseData = { ...data?.toObject(), ...detaiData };
            res.status(200).json(responseData);
        } catch (error) {
            next(error);
        }
    },

    getHotSale: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await productService.getHotSale();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // find category
            const category = await CategoryModel.findById(req.body.category);
            if (!category) {
                throw new NotFoundError('Category not found');
            }

            // find brand
            const brand = await BrandModel.findById(req.body.brand);
            if (!brand) {
                throw new NotFoundError('Brand not found');
            }

            const data = req.body;
            const result = await productService.create(data);
            if (result) {
                const id = result._id;
                const { options } = req.body;
                if (options) {
                    const prodDetail = await ProductDetailModel.create({ productId: id, options });
                }
                return res.status(200).json(result);
            }

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await productService.update(id, data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            // delete product detail
            await ProductDetailModel.findOneAndDelete({ productId: id });
            const result = await productService.delete(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};

export default productController;
