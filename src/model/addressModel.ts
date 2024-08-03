import { ObjectId, Schema, model } from 'mongoose';
import { BaseDocument } from '../interface/model';

export interface AddressDocument extends BaseDocument {
    userId: ObjectId;
    address: string;
    city: string;
    district: string;
    postalCode: string;
    country: string;
    phone: string;
    recipientName: string;
}

const AddressSchema = new Schema<AddressDocument>(
    {
        userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        country: { type: String, required: true },
        city: { type: String, required: true },
        district: { type: String, required: true },
        address: { type: String, required: true },
        postalCode: { type: String, required: true },
        phone: { type: String },
        recipientName: { type: String },
    },
    {
        timestamps: true,
    }
);

const AddressModel = model<AddressDocument>('Address', AddressSchema);

export default AddressModel;
