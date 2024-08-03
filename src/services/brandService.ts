import { BaseService } from '../interface/service';
import BrandModel, { BrandDocument } from '../model/brandModel';
import ProductModel from '../model/productModel';

const brandService: BaseService<BrandDocument> = {
    create: async (data) => {
        try {
            const result = await BrandModel.create(data);
            await result.save();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const result = await BrandModel.find();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const result = await BrandModel.findById(id);
            return result;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const result = await BrandModel.findOneAndUpdate({ _id: id }, data, {
                new: true,
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const countProduct = await ProductModel.countDocuments({ brand: id });
            if (countProduct > 0) {
                throw new Error('Brand has products');
            }
            const result = await BrandModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    },
};

export default brandService;
