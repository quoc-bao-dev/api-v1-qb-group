import chatService from '../services/chat/chatService';
import { NextFunction, Request, Response } from 'express';

const chatController = {
    getChatByUserId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await chatService.getAllRoomsByUserId(id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },
    getChatInfoByUserId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await chatService.getAllRoomsInfoByUserId(id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    getChatByRoomId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await chatService.getChatByRoomId(id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    createRoom: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { listUserId } = req.body;
            const result = await chatService.createRoom(listUserId);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    getRoomInfo: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await chatService.getRoomInfo(id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },
};

export default chatController;
