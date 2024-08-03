import { Document, ObjectId } from 'mongoose';
export interface BaseDocument extends Document {
    _id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
