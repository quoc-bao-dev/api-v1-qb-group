import { BaseService } from '../interface/service';
import ProductModel, { ProductDocument } from '../model/productModel';
import ReviewModel from '../model/reviewModel';

interface ProductPaginationResult {
    products: ProductDocument[];
    total: number;
    totalResults: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage: number;
    previousPage: number;
}
interface ProductService extends BaseService<ProductDocument> {
    getPagination: (page: number, limit: number, query: object, sort?: object) => Promise<ProductPaginationResult>;
    getRelated: (id: string) => Promise<ProductDocument[]>;
    getHotSale: () => Promise<ProductDocument[]>;
}

const productService: ProductService = {
    create: async (data) => {
        try {
            const result = await ProductModel.create(data);
            await result.save();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAll: async () => {
        try {
            const result = await ProductModel.find().populate('category').populate('brand');
            return result;
        } catch (error) {
            throw error;
        }
    },

    getRelated: async (id: string) => {
        try {
            const product = await ProductModel.findById(id);
            const result = await ProductModel.aggregate([
                { $match: { category: product?.category, _id: { $ne: id } } },
                { $addFields: { priceDiff: { $subtract: ['$price', product?.price] } } },
                { $match: { priceDiff: { $lte: 20000 } } },
                { $sample: { size: 5 } },
                { $sort: { priceDiff: 1 } },
                {
                    $lookup: {
                        from: 'categories', // The name of the category collection
                        localField: 'category',
                        foreignField: '_id',
                        as: 'categoryDetails',
                    },
                },
                { $unwind: '$categoryDetails' }, // Unwind if you expect a single category per product
                {
                    $lookup: {
                        from: 'brands', // The name of the brand collection
                        localField: 'brand',
                        foreignField: '_id',
                        as: 'brandDetails',
                    },
                },
                { $unwind: '$brandDetails' },
            ]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    getPagination: async (page, limit, query, sort) => {
        try {
            const result = await ProductModel.find({ ...query, isShow: true })
                .sort({ ...sort })
                .skip((page - 1) * limit)
                .limit(limit);
            const total = await ProductModel.countDocuments(query);
            const totalPages = Math.ceil(total / limit);
            const hasNextPage = page * limit < total;
            const hasPreviousPage = page > 1;
            const previousPage = page - 1;
            const nextPage = page + 1;
            const totalResults = result.length;
            return {
                totalResults,
                products: result,
                total,
                limit,
                page,
                totalPages,
                hasPreviousPage,
                hasNextPage,
                previousPage,
                nextPage,
            };
        } catch (error) {
            throw error;
        }
    },
    getHotSale: async () => {
        try {
            //? get hot sale
            const result = await ProductModel.find({ isShow: true }).sort({ discount: -1 }).limit(4);
            return result;
        } catch (error) {
            throw error;
        }
    },

    getById: async (id) => {
        try {
            const result = await ProductModel.findById(id).populate('category').populate('brand');
            await result?.updateOne({ $inc: { view: 1 } });
            return result;
        } catch (error) {
            throw error;
        }
    },

    update: async (id, data) => {
        try {
            const result = await ProductModel.findByIdAndUpdate(id, data, {
                new: true,
            });
            return result;
        } catch (error) {
            throw error;
        }
    },

    delete: async (id) => {
        try {
            // delete comment of product
            await ReviewModel.deleteMany({ productId: id });

            const result = await ProductModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw error;
        }
    },
};

export default productService;
