import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
    attachments: [
        {
            type: {
                type: String, // e.g., "image", "video", "file"
            },
            url: { type: String },
        },
    ],
});

const MessageModel = mongoose.model('Message', messageSchema);
export default MessageModel;
