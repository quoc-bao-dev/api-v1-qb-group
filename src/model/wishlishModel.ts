import { model, ObjectId, Schema, SchemaTypes } from 'mongoose';
import { BaseDocument } from '../interface/model';

export interface WishlishDocument extends BaseDocument {
    userId: ObjectId;
    // products: ObjectId[];
}

const WishlishSchema = new Schema<WishlishDocument>(
    {
        userId: { type: String },
        // userId: { type: Schema.Types.ObjectId, ref: 'User' },
        // products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    },
    { timestamps: true }
);

const WishlishModel = model<WishlishDocument>('Wishlish', WishlishSchema);

export default WishlishModel;
