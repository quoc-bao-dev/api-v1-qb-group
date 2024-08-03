import mongoose, { Schema } from 'mongoose';
import { BaseDocument } from '../../interface/model';

export interface ChatDocument extends BaseDocument {
    participants: Schema.Types.ObjectId[];
    isGroupChat: boolean;
    groupName?: string;
    groupAvatar?: string;
    createdAt: Date;
    updatedAt: Date;
}
const chatSchema = new Schema<ChatDocument>({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    isGroupChat: { type: Boolean, default: false },
    groupName: { type: String },
    groupAvatar: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const ChatModel = mongoose.model('Chat', chatSchema);

export default ChatModel;
