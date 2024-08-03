import { log } from 'console';
import { BaseService } from '../interface/service';
import CategoryModel, { CategoryDocument } from '../model/categoryModel';
import ProductModel from '../model/productModel';

const categoryService: BaseService<CategoryDocument> & { getAllAdmin: () => Promise<CategoryDocument[]> } = {
    create: async (data) => {
        try {
            const result = await CategoryModel.create(data);
            await result.save();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const result = await CategoryModel.find({ isShow: true });
            return result;
        } catch (error) {
            throw error;
        }
    },
    getAllAdmin: async () => {
        try {
            const result = await CategoryModel.find();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const result = await CategoryModel.findById(id);
            return result;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const result = await CategoryModel.findByIdAndUpdate(id, data, {
                new: true,
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const countProduct = await ProductModel.countDocuments({ category: id });
            if (countProduct > 0) {
                throw new Error('Category has products');
            }
            const result = await CategoryModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    },
};

export default categoryService;
