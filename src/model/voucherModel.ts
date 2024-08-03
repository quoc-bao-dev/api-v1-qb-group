import { ObjectId, Schema, model } from 'mongoose';
import { BaseDocument } from '../interface/model';

export interface VoucherDocument extends BaseDocument {
    code: string;
    description: string;
    discountAmount?: number;
    discountPercentage?: number;
    expirationDate: Date;
    minOrderValue: number;
    maxDiscountAmount: number;
    usageLimit: number;
    usageCount: number;
    isActive: boolean;
    userId?: ObjectId;
}

const VoucherSchema = new Schema<VoucherDocument>(
    {
        code: { type: String, required: true, unique: true },
        discountPercentage: { type: Number, default: 0 },
        expirationDate: { type: Date, required: true },
        isActive: { type: Boolean, default: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        description: { type: String },
        discountAmount: { type: Number },
        minOrderValue: { type: Number },
        maxDiscountAmount: { type: Number },
        usageLimit: { type: Number },
        usageCount: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

const VoucherModel = model<VoucherDocument>('Voucher', VoucherSchema);

export default VoucherModel;
