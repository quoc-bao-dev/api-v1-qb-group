import { log } from 'console';
import ChatModel, { ChatDocument } from '../../model/chat/chatModel';
import MessageModel from '../../model/chat/messageModel';

const chatService = {
    getAllRoomsByUserId: async (userId: string) => {
        try {
            const result = await ChatModel.find({ participants: userId });
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAllRoomsInfoByUserId: async (userId: string) => {
        try {
            const result = await ChatModel.find({ participants: userId }).populate('participants');
            return result;
        } catch (error) {
            throw error;
        }
    },
    createRoom: async (lsUserId: ChatDocument['participants']) => {
        try {
            const room: Partial<ChatDocument> = {
                participants: [],
                isGroupChat: false,
            };
            if (lsUserId.length == 2) {
            } else if (lsUserId.length > 2) {
                room.isGroupChat = true;
            }
            room.participants = lsUserId;

            const result = await ChatModel.create(room);
            return result;
        } catch (error) {
            throw error;
        }
    },

    getRoomById: async (id: string) => {
        try {
            const result = await ChatModel.findById(id);
            return result;
        } catch (error) {
            throw error;
        }
    },

    getChatByRoomId: async (id: string) => {
        try {
            const result = await MessageModel.find({ chatId: id }).populate('senderId').sort({ createdAt: -1 });
            return result;
        } catch (error) {
            throw error;
        }
    },

    getRoomInfo: async (id: string) => {
        try {
            const result = await ChatModel.findById(id).populate('participants');
            return result;
        } catch (error) {
            throw error;
        }
    },
};

export default chatService;
