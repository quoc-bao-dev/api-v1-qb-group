import { ObjectId, Schema, model } from 'mongoose';
import { BaseDocument } from '../interface/model';
import ProductDetailModel from './productDetailModel';

export interface ReviewDocument extends BaseDocument {
    productId: ObjectId;
    userId: ObjectId;
    rating: number;
    comment: string;
    images?: string[];
    isShow?: boolean;
}

const ReviewSchema = new Schema<ReviewDocument>(
    {
        productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
        userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        images: { type: [String] },
        isShow: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

ReviewSchema.post('save', function (doc) {
    // add comment to product detail
    ProductDetailModel.findOneAndUpdate({ productId: doc.productId }, { $push: { reviews: doc._id } });
});
ReviewSchema.post('findOneAndDelete', function (doc) {
    // remove comment from product detail
    ProductDetailModel.findOneAndUpdate({ productId: doc.productId }, { $pull: { reviews: doc._id } });
});

const ReviewModel = model<ReviewDocument>('Review', ReviewSchema);

export default ReviewModel;
