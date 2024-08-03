import { Schema, model } from 'mongoose';
import { BaseDocument } from '../interface/model';
import { slugGenerate } from '../util/slug';
export interface BrandDocument extends BaseDocument {
    name: string;
    image: string;
    slug: string;
    description: string;
    orderNumber: number;
    isShow: boolean;
}
const BrandSchema = new Schema<BrandDocument>(
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

BrandSchema.pre<BrandDocument>('save', async function (next) {
    slugGenerate(this);
    const order = await BrandModel.countDocuments();
    this.orderNumber = this.orderNumber || order + 1;
    next();
});
BrandSchema.post('findOneAndUpdate', async function (doc: BrandDocument) {
    const updatedFields = Object.keys((this?.getUpdate() as any).$set || {});
    if (updatedFields.includes('name')) {
        slugGenerate(doc);
    }
    if (updatedFields.includes('orderNumber')) {
        const productIndex = doc.orderNumber;
        const brands = await BrandModel.find().sort({ orderNumber: 1 });
        for (let i = 0; i < brands.length; i++) {
            const brand = brands[i];
            if (i === productIndex) {
                brand.orderNumber = i;
            } else if (i > productIndex) {
                brand.orderNumber = i - 1;
            }
            brand.save();
        }
    }
});

const BrandModel = model<BrandDocument>('Brand', BrandSchema);

export default BrandModel;
