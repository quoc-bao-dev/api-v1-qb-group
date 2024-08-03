import { Server, Socket } from 'socket.io';
import MessageModel from '../../model/chat/messageModel';
import chatService from '../../services/chat/chatService';
import { ObjectId } from 'mongoose';
import { log } from 'console';
import _ from 'lodash';

/**
 * Set up the chat socket handler.
 *
 * @param io - The Socket.IO server instance.
 */
const chatSocket = (io: Server): void => {
    io.on('connection', (socket: Socket) => {
        console.log('New client connected');

        // Xử lý sự kiện gửi tin nhắn
        socket.on('sendMessage', async (data: { chatId: string; senderId: string; message: string }) => {
            try {
                // Lưu tin nhắn vào MongoDB
                const message = new MessageModel({
                    chatId: data.chatId,
                    senderId: data.senderId,
                    message: data.message,
                    timestamp: new Date(),
                });
                await message.save();

                const mess = await message.populate('senderId');
                // Phát tin nhắn tới các client trong cùng chat
                io.to(data.chatId).emit('newMessage', mess);
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        // Xử lý sự kiện join chat
        socket.on('joinRoom', async (chatId: string) => {
            const room = chatService.getRoomById(chatId);
            if (!room) {
                console.log('Room not found');
                socket.emit('notFoundRoom', 'Room not found');
                return;
            }

            socket.join(chatId);
            socket.emit('roomJoined', chatId);
            console.log(`Client joined chat ${chatId}`);
        });

        // Xử lý sự kiện create room
        socket.on('createRoom', async (lsUserId: string[]) => {
            const room = await chatService.createRoom(lsUserId as []);
            socket.emit('roomCreated', room);
        });

        // Xử lý sự kiện disconnect
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

export default chatSocket;
