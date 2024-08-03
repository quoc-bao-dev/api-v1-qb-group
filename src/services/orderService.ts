import { log } from 'console';
import { BaseService } from '../interface/service';
import OrderModel, { OrderDocument } from '../model/orderModel';

const orderService: BaseService<OrderDocument> & {
    getByUserId(id: string): Promise<OrderDocument[] | null>;
    getById(id: string): Promise<OrderDocument | null>;
} = {
    create: async (data) => {
        try {
            const result = await OrderModel.create(data);
            await result.save();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const result = await OrderModel.find();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const result = await OrderModel.findById(id);
            return result;
        } catch (error) {
            throw error;
        }
    },

    getByUserId: async (userId) => {
        try {
            const result = await OrderModel.find({ userId: userId });
            return result;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const result = await OrderModel.findByIdAndUpdate(id, data, {
                new: true,
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const result = await OrderModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    },
};

export default orderService;
