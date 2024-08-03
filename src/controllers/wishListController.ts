import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import WishListModel from '../model/wishListModel';
import wishlishService from '../services/wishlishService';
const wishlishController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await wishlishService.getAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    getByUserId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const isShowId = req.query.show_id === 'true';
            const data = await wishlishService.getbyUserId(id, isShowId);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findWishLish = await WishListModel.findOne({ userId: req.body.userId });
            if (findWishLish) {
                if (findWishLish.products.includes(req.body.productId)) {
                    const result = await WishListModel.findOneAndUpdate(
                        { userId: req.body.userId },
                        { $pull: { products: req.body.productId } },
                        { new: true }
                    );
                    return res.status(200).json({ result, status: 'removed' });
                }
                const result = await WishListModel.findOneAndUpdate(
                    { userId: req.body.userId },
                    { $push: { products: req.body.productId } },
                    { new: true }
                );

                return res.status(200).json({ result, status: 'added' });
            }

            const newWishlish = await WishListModel.create({
                userId: req.body.userId,
                products: [req.body.productId],
            });

            return res.status(200).json({ result: newWishlish, status: 'added' });
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await wishlishService.update(id, data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await wishlishService.delete(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};

export default wishlishController;
