import { ObjectId, Schema, model } from 'mongoose';
import { BaseDocument } from '../interface/model';

enum OrderStatus {
    Pending = 'pending',
    Comfirmed = 'confirmed',
    Shipped = 'shipped',
    Delivered = 'delivered',
    Completed = 'completed',
    Cancelled = 'cancelled',
}
enum PaymentStatus {
    Pending = 'pending',
    Success = 'success',
    Failed = 'failed',
}

export interface OrderProduct extends BaseDocument {
    brand: ObjectId;
    category: ObjectId;
    description: string;
    discount: number;
    image: string;
    name: string;
    price: number;
    slug: string;
    tags: string[];
}

export interface DeliveryAddress extends BaseDocument {
    address: string;
    city: string;
    country: string;
    deliveryMethod: string;
    district: string;
    phone: string;
    postalCode: string;
    recipientName: string;
}

export interface OrderItem extends BaseDocument {
    product: OrderProduct;
    quantity: number;
}
export interface OrderDocument extends BaseDocument {
    userId: Schema.Types.ObjectId;
    totalAmount: number;
    subTotal: number;
    shippingFee?: number;
    discountAmount?: number;
    discountPercentage?: number;
    tax?: number;
    orderDate: Date;
    deliveryDate?: Date;
    paymentMethod: string;
    deliveryAddress: DeliveryAddress;
    status: OrderStatus;
    orderItems: OrderItem[];
    paymentStatus: string;
    paymentDate?: Date;
}

const OrderProductSchema = new Schema<OrderProduct>(
    {
        brand: { type: Schema.Types.ObjectId, required: true, ref: 'Brand' },
        category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
        description: { type: String, required: true },
        discount: { type: Number },
        image: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        slug: { type: String, required: true },
        tags: { type: [String], required: true },
    },
    { _id: false }
);

const DeliveryAddressSchema = new Schema<DeliveryAddress>(
    {
        address: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        deliveryMethod: { type: String, required: true },
        district: { type: String, required: true },
        phone: { type: String, required: true },
        postalCode: { type: String, required: true },
        recipientName: { type: String, required: true },
    },
    { _id: false }
);

const OrderItemSchema = new Schema<OrderItem>(
    {
        product: { type: OrderProductSchema, required: true },
        quantity: { type: Number, required: true },
    },
    { _id: false }
);

const OrderSchema = new Schema<OrderDocument>(
    {
        userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        totalAmount: { type: Number, required: true },
        subTotal: { type: Number, required: true },
        shippingFee: { type: Number },
        discountAmount: { type: Number },
        discountPercentage: { type: Number },
        tax: { type: Number },
        orderDate: { type: Date, required: true, default: Date.now },
        deliveryDate: {
            type: Date,
            default: function () {
                const currentDate = new Date();
                return new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000);
            },
        },
        paymentMethod: { type: String, required: true },
        deliveryAddress: { type: DeliveryAddressSchema, required: true },
        status: { type: String, enum: Object.values(OrderStatus) },
        orderItems: { type: [OrderItemSchema], required: true },
        paymentStatus: { type: String, enum: Object.values(PaymentStatus), default: 'pending' },
        paymentDate: { type: Date },
    },
    {
        timestamps: true,
    }
);

OrderSchema.pre('save', function (next) {
    if (!this.deliveryDate) {
        this.deliveryDate = new Date(this.orderDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    }
    next();
});

OrderSchema.pre('save', function (next) {
    this.status = OrderStatus.Pending;
    next();
});

const OrderModel = model<OrderDocument>('Order', OrderSchema);

export default OrderModel;
