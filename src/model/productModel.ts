import _ from 'lodash';
import { ObjectId, Schema, model } from 'mongoose';
import { BaseDocument } from '../interface/model';

// Interface cho ProductDocument
export interface ProductDocument extends BaseDocument {
    name: string;
    description: string;
    price: number;
    slug: string;
    stock: number;
    category: ObjectId;
    brand: ObjectId;
    image: string;
    tags: string[];
    discount: number;
    isShow: boolean;
    orderNumber: number;
    isNewItem: boolean;
    rating: Number;
    view: Number;
    sold: Number;
}

const ProductSchema = new Schema<ProductDocument>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        slug: {
            type: String,
        },
        stock: {
            type: Number,
            default: 1,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
        },
        discount: {
            type: Number,
            default: 0,
        },
        isShow: {
            type: Boolean,
            default: true,
        },
        orderNumber: {
            type: Number,
            default: 0,
        },
        isNewItem: {
            type: Boolean,
            default: true,
        },
        rating: { type: Number, default: 5 },

        view: { type: Number, default: 1000 },

        sold: { type: Number, default: 10 },
    },
    {
        timestamps: true,
    }
);

// generate slug
ProductSchema.pre('save', function (next) {
    this.slug = _.kebabCase(this.name);
    next();
});
ProductSchema.post('findOneAndUpdate', function (doc) {
    doc.slug = _.kebabCase(doc.name);
});

// Update product price on order
ProductSchema.post('findOneAndUpdate', async function (doc) {
    const updatedFields = Object.keys((this?.getUpdate() as any).$set || {});

    if (updatedFields.includes('orderNumber')) {
        // update orderNumber
        const productIndex = doc.orderNumber;
        const products = await ProductModel.find({ isShow: true }).sort({ orderNumber: 1 });

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            if (i === productIndex) {
                product.orderNumber = i;
            } else if (i > productIndex) {
                product.orderNumber = i - 1;
            }
            await product.save();
        }
    }
});

const ProductModel = model<ProductDocument>('Product', ProductSchema);

export default ProductModel;
