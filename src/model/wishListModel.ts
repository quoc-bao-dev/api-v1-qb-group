import { model, ObjectId, Schema } from 'mongoose';
import { BaseDocument } from '../interface/model';

export interface WishListDocument extends BaseDocument {
    userId: ObjectId;
    products: ObjectId[];
}

const WishListSchema = new Schema<WishListDocument>(
    {
        userId: { type: String },
        products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    },
    { timestamps: true }
);

const WishListModel = model<WishListDocument>('WishList', WishListSchema);

export default WishListModel;
