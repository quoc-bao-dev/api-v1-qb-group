import { Promotion } from './../model/productDetailModel';
import { BaseService } from '../interface/service';
import PromotionModel, { PromotionDocument } from '../model/promotionModel';

const promotionService: BaseService<PromotionDocument> = {
    create: async (data) => {
        try {
            const result = await PromotionModel.create(data);
            await result.save();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const result = await PromotionModel.find();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const result = await PromotionModel.findById(id);
            return result;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const result = await PromotionModel.findByIdAndUpdate(id, data, {
                new: true,
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const result = await PromotionModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    },
};

export default promotionService;
