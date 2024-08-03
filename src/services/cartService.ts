import { NotFoundError } from '../errors/error';
import { BaseService } from '../interface/service';
import CartModel, { CartDocument } from '../model/cartModel';
import UserModel from '../model/userModel';

const cartService: BaseService<CartDocument> & {
    getByUserId(id: string): Promise<CartDocument | null>;
} = {
    create: async (data) => {
        try {
            const result = await CartModel.create(data);
            await result.save();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const result = await CartModel.find();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const result = await CartModel.findById(id);
            return result;
        } catch (error) {
            throw error;
        }
    },

    getByUserId: async (userId) => {
        try {
            const findeCart = await CartModel.findOne({ userId: userId }).populate('cart.product');
            if (!findeCart) {
                const user = await UserModel.findById(userId);
                if (!user) {
                    throw new NotFoundError('Not found user');
                }
                const newCart = await CartModel.create({ userId: userId, cart: [] });
                await newCart.save();
                return newCart;
            }
            return findeCart;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const result = await CartModel.findOneAndUpdate({ _id: id }, data, {
                new: true,
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const result = await CartModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    },
};

export default cartService;
