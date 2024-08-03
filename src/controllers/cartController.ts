import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../errors/error';
import CartModel, { CartDocument } from '../model/cartModel';
import cartService from '../services/cartService';
import userService from '../services/userService';

const cartController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await cartService.getAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    getByUserId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;

            const user = await userService.getById!(id);
            if (!user) {
                throw new NotFoundError(`User with ID ${id} not found`);
            }

            const cartOfUser = await cartService.getByUserId(id);

            res.status(200).json(cartOfUser);
        } catch (error) {
            next(error);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const result = await cartService.create(data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    updateByUserId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.body.userId;
            const cart = req.body.cart as CartDocument;
            const result = await CartModel.findOneAndUpdate({ userId: userId }, { cart: cart });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await cartService.update(id, data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await cartService.delete(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};

export default cartController;
