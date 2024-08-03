import { log } from 'console';
import { BaseService } from '../interface/service';
import ReviewModel, { ReviewDocument } from '../model/reviewModel';

interface ReviewService extends BaseService<ReviewDocument> {
    getByProduct(productId: string): Promise<ReviewDocument[]>;
    getByUser(userId: string): Promise<ReviewDocument[]>;
}

const reviewService: ReviewService = {
    create: async (data) => {
        try {
            const result = await ReviewModel.create(data);
            await result.save();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const result = await ReviewModel.find().populate('productId').populate('userId');
            return result;
        } catch (error) {
            throw error;
        }
    },

    getByProduct: async (productId) => {
        try {
            const result = await ReviewModel.find({ productId, isShow: true }).populate('productId').populate('userId');
            return result;
        } catch (error) {
            throw error;
        }
    },

    getByUser: async (userId) => {
        try {
            const result = await ReviewModel.find({ userId }).populate('productId').populate('userId');
            return result;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const result = await ReviewModel.findById(id);
            return result;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const result = await ReviewModel.findByIdAndUpdate(id, data, {
                new: true,
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const result = await ReviewModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    },
};

export default reviewService;
