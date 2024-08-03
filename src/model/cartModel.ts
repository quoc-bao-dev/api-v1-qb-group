import { ObjectId, Schema, model } from 'mongoose';
import { BaseDocument } from '../interface/model';
import { ProductDocument } from './productModel';
import { log } from 'console';

interface CartItem extends BaseDocument {
    quantity: number;
    checked: boolean;
    isOnServer?: boolean;
    product: ProductDocument;
}
export interface CartDocument extends BaseDocument {
    userId: ObjectId;
    cart: CartItem[];
}

const CartItemSchema = new Schema<CartItem>(
    {
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        checked: {
            type: Boolean,
            default: false,
        },
        isOnServer: {
            type: Boolean,
            default: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    },
    {}
);

const CartSchema = new Schema<CartDocument>(
    {
        userId: {
            type: Schema.ObjectId,
            required: true,
            unique: true,
        },
        cart: {
            type: [CartItemSchema],
        },
    },
    {
        timestamps: true,
    }
);

CartItemSchema.pre<CartItem>('save', async function (next) {
    this.checked = false;
    next();
});

CartSchema.post('findOneAndUpdate', async function (doc) {
    if (doc) {
        for (let item of doc.cart) {
            item.checked = false;
        }
        await doc.save();
    }
});

const CartModel = model<CartDocument>('Cart', CartSchema);

export default CartModel;
