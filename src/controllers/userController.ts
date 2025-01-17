import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import { NotFoundError } from '../errors/error';
import userService from '../services/userService';

const userController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await userService.getAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    getById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = await userService.getById!(id);
            if (!data) {
                throw new NotFoundError(`User with ID ${id} not found`);
            }
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;
            const result = await userService.create(data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const image = req.file;
            const avatar = req.file?.filename!;
            const { id } = req.params;
            const data = _.omit(req.body, ['username', 'email']);
            if (image) {
                data.avatar = avatar;
            } else {
                if (req.body.avatar) {
                    data.avatar = req.body.avatar;
                }
            }

            const result = await userService.update(id, data);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await userService.delete(id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};

export default userController;
