import { Schema, model } from 'mongoose';
import { BaseDocument } from '../interface/model';
import ProductDetailModel from './productDetailModel';

export interface PromotionDocument extends BaseDocument {
    promoCode: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
}

const PromotionSchema = new Schema<PromotionDocument>(
    {
        promoCode: { type: String, required: true, unique: true },
        discountPercentage: { type: Number, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
    },
    {
        timestamps: true,
    }
);

PromotionSchema.post('findOneAndDelete', async function (doc) {
    // remove promotion from product detail
    await ProductDetailModel.updateMany({}, { $pull: { promotions: doc._id } });
    await ProductDetailModel.updateMany(
        { 'options.promotions._id': doc._id },
        { $pull: { 'options.$[].promotions': { _id: doc._id } } }
    );
});

const PromotionModel = model<PromotionDocument>('Promotion', PromotionSchema);

export default PromotionModel;
