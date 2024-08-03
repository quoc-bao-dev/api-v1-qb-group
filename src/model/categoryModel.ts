import _ from 'lodash';
import { Schema, model } from 'mongoose';
import { BaseDocument } from '../interface/model';

export interface CategoryDocument extends BaseDocument {
    name: string;
    image: string;
    slug: string;
    isShow: boolean;
    description: string;
    orderNumber: number;
}

const CategorySchema = new Schema<CategoryDocument>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        orderNumber: {
            type: Number,
            default: 0,
        },
        isShow: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

CategorySchema.pre<CategoryDocument>('save', async function (next) {
    this.slug = _.kebabCase(this.name);
    const order = await CategoryModel.countDocuments();
    this.orderNumber = this.orderNumber || order + 1;
    next();
});

CategorySchema.post('findOneAndUpdate', async function (doc: CategoryDocument) {
    const updatedFields = Object.keys((this?.getUpdate() as any).$set || {});
    if (updatedFields.includes('name')) {
        doc.slug = _.kebabCase(doc.name);
    }
    if (updatedFields.includes('orderNumber')) {
        const productIndex = doc.orderNumber;
        const categories = await CategoryModel.find().sort({ orderNumber: 1 });

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            if (i === productIndex) {
                category.orderNumber = i;
            } else if (i > productIndex) {
                category.orderNumber = i - 1;
            }
            await category.save();
        }
    }
});

const CategoryModel = model<CategoryDocument>('Category', CategorySchema);

export default CategoryModel;
