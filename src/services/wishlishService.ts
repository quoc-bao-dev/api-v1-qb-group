import { BaseService } from '../interface/service';
import WishListModel, { WishListDocument } from '../model/wishListModel';

const wishlishService: BaseService<WishListDocument> & {
    getbyUserId: (id: string, isShowId: boolean) => Promise<WishListDocument[]>;
} = {
    create: async (data) => {
        try {
            const result = await WishListModel.create(data);
            await result.save();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const result = await WishListModel.find();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const result = await WishListModel.findById(id);
            return result;
        } catch (error) {
            throw error;
        }
    },

    getbyUserId: async (id, isShowId = false) => {
        try {
            if (isShowId) {
                const result = await WishListModel.find({ userId: id });
                return result;
            }
            const result = await WishListModel.find({ userId: id }).populate('products');
            return result;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const result = await WishListModel.findOneAndUpdate({ _id: id }, data, {
                new: true,
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const result = await WishListModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    },
};

export default wishlishService;
