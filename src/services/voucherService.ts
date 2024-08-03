import { BaseService } from '../interface/service';
import VoucherModel, { VoucherDocument } from '../model/voucherModel';
import UserModel from '../model/userModel';

interface VoucherService extends BaseService<VoucherDocument> {
    getByCode(code: string): Promise<VoucherDocument | null>;
}
const voucherService: VoucherService = {
    create: async (data) => {
        try {
            const result = await VoucherModel.create(data);
            if (data.userId) {
                await UserModel.findByIdAndUpdate(data.userId, { $push: { vouchers: result._id } });
            }
            await result.save();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const result = await VoucherModel.find();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getByCode: async (code) => {
        try {
            const result = await VoucherModel.findOne({ code });
            return result;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const result = await VoucherModel.findById(id);
            return result;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const result = await VoucherModel.findByIdAndUpdate(id, data, {
                new: true,
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const result = await VoucherModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    },
};

export default voucherService;
