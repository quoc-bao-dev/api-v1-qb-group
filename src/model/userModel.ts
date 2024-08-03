import { ObjectId, Schema, model } from 'mongoose';
import { BaseDocument } from '../interface/model';

enum Role {
    user = 'user',
    admin = 'admin',
}
export interface UserDocument extends BaseDocument {
    username: string;
    password: string;
    email: string;
    fullName: string;
    firstName: string;
    lastName: string;
    avatar: string;
    phoneNumber: string;
    address: string;
    addressDetail: ObjectId;
    isActive: boolean;
    role: Role;
}

const UserSchema = new Schema<UserDocument>(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        fullName: { type: String },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        avatar: { type: String },
        phoneNumber: { type: String },
        address: { type: String },
        addressDetail: { type: Schema.Types.ObjectId, ref: 'Address' },
        isActive: { type: Boolean, default: true },
        role: { type: String, required: true, enum: Object.values(Role), default: Role.user },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre('save', function (next) {
    this.fullName = `${this.firstName} ${this.lastName}`;
    next();
});
UserSchema.post('findOneAndUpdate', function (doc) {
    doc.fullName = `${doc.firstName} ${doc.lastName}`;
    doc.save();
});

const UserModel = model<UserDocument>('User', UserSchema);

export default UserModel;
