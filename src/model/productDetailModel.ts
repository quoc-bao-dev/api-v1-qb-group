import { ObjectId, Schema, model } from 'mongoose';
import { BaseDocument } from '../interface/model';
import ProductModel from './productModel';

export interface Feature {
    featureName: string;
    featureDescription: string;
}

export interface Promotion {
    promoCode: string;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
}

export interface OptionItem {
    value: string;
    priceInc: number;
    stock: number;
    isDefault: boolean;
    color?: string;
}
export interface Option {
    color: OptionItem[];
    ram: OptionItem[];
    storage: OptionItem[];
}

export interface ShippingDetails {
    weight: string;
    dimensions: string;
    shippingFee: number;
}

interface ProductImage {
    url: string;
    isPrimary: boolean;
}
export interface ProductDetailDocument extends BaseDocument {
    productId: ObjectId;
    images: ProductImage[];
    description: string;
    features: Feature[];
    options: Option;
    rating: number;
    reviews: ObjectId[];
    promotions: ObjectId[];
    shippingDetails: ShippingDetails;
}

const ImageSchema = new Schema<ProductImage>(
    {
        url: { type: String, required: true },
        isPrimary: { type: Boolean, required: true },
    },
    {
        _id: false,
    }
);

const FeatureSchema = new Schema<Feature>(
    {
        featureName: { type: String, required: true },
        featureDescription: { type: String, required: true },
    },
    {
        _id: false,
    }
);

const OptionItemSchema = new Schema<OptionItem>(
    {
        value: { type: String, required: true },
        priceInc: { type: Number, default: 0 },
        stock: { type: Number, default: 0 },
        isDefault: { type: Boolean, default: false },
        color: { type: String },
    },
    {
        _id: false,
    }
);

const OptionSchema = new Schema<Option>(
    {
        color: { type: [OptionItemSchema] },
        ram: { type: [OptionItemSchema] },
        storage: { type: [OptionItemSchema] },
    },
    {
        _id: false,
    }
);

const ShippingDetailsSchema = new Schema<ShippingDetails>(
    {
        weight: { type: String },
        dimensions: { type: String },
        shippingFee: { type: Number },
    },
    {
        _id: false,
    }
);

const ProductDetailSchema = new Schema<ProductDetailDocument>(
    {
        productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product', unique: true },
        images: { type: [ImageSchema] },
        description: { type: String },
        features: { type: [FeatureSchema] },
        options: { type: OptionSchema },
        rating: { type: Number },
        promotions: { type: [Schema.Types.ObjectId], ref: 'Promotion' },
        shippingDetails: { type: ShippingDetailsSchema },
    },
    {
        timestamps: true,
    }
);

ProductDetailSchema.pre<ProductDetailDocument>('save', async function (next) {
    const product = await ProductModel.findById(this.productId);
    if (product) {
        this.images.push({ url: product.image, isPrimary: true });
    }
    next();
});

const ProductDetailModel = model<ProductDetailDocument>('ProductDetail', ProductDetailSchema);

export default ProductDetailModel;
