import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import { BadRequestError } from '../errors/error';
import ProductModel from '../model/productModel';
import addressService from '../services/addressService';
import orderService from '../services/orderService';
import { log } from 'console';
import VoucherModel, { VoucherDocument } from '../model/voucherModel';

const orderController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await orderService.getAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },
    getById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = await orderService.getById(id);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },
    getByUserId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.params;
            const data = await orderService.getByUserId(userId);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    },

    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body;

            // add address
            const deliveryAddress = { ...data.deliveryAddress, userId: data.userId };
            const userAddress = await addressService.getbyUserId(data.userId);

            const bool = _.every(userAddress, (address) => {
                const keysPick = ['country', 'city', 'district', 'address', 'postalCode', 'phone'];
                const newAdd = _.cloneDeep(_.pick(address, keysPick));
                const oldAdd = _.cloneDeep(_.pick(deliveryAddress, keysPick));

                return !_.isEqual(oldAdd, newAdd);
            });

            // khac hoan toan dia chi cu, tao moi dia chi
            if (bool && userAddress.length <= 2) {
                await addressService.create(deliveryAddress);
            }

            // checkVoucher

            if (data.voucher) {
                const vouchers = data.voucher as VoucherDocument[];
                vouchers.forEach(async (voucher) => {
                    await VoucherModel.findOneAndUpdate(
                        { code: voucher.code },
                        {
                            $inc: { usageCount: 1 },
                        }
                    );
                });
            }
            // add payment method
            const result = await orderService.create(data);

            if (result) {
                data.orderItems.forEach(async (i) => {
                    const prod = await ProductModel.findOne({ name: i.product.name });
                    await prod?.updateOne({ $inc: { stock: -i.quantity, sold: i.quantity } });
                });
            }

            res.status(200).json(result);

            res.status(200).json({});
        } catch (error) {
            next(error);
        }
    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await orderService.update(id, data);
            res.status(200).json(result);
        } catch (error) {
            next(new BadRequestError(error.message));
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await orderService.delete(id);
            res.status(200).json(result);
        } catch (error) {
            next(new BadRequestError(error.message));
        }
    },
};

export default orderController;
