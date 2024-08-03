import ProductDetailModel, { ProductDetailDocument } from './../model/productDetailModel';
import { BaseService } from '../interface/service';
import { log } from 'console';

const productDetailService: BaseService<ProductDetailDocument> = {
    create: async (data) => {
        try {
            const result = await ProductDetailModel.create(data);
            await result.save();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const result = await ProductDetailModel.find();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const result = await ProductDetailModel.findById(id);
            return result;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, data) => {
        const prod = await ProductDetailModel.findOne({ productId: id });
        try {
            const result = await ProductDetailModel.findOneAndUpdate(
                { productId: id },
                {
                    $set: data,
                },
                {
                    new: true,
                }
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const result = await ProductDetailModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    },
};

export default productDetailService;
