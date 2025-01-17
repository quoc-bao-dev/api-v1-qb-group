import { Router } from 'express';
import chatController from '../controllers/chatController';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';

const chatRouter = Router();
chatRouter.get('/user/:id', authenticateMiddleware, chatController.getChatByUserId);
chatRouter.get('/user-room-info/:id', authenticateMiddleware, chatController.getChatByUserId);
chatRouter.get('/room/:id', authenticateMiddleware, chatController.getChatByRoomId);
chatRouter.get('/room-info/:id', authenticateMiddleware, chatController.getRoomInfo);
chatRouter.post('/', authenticateMiddleware, chatController.createRoom);

export default chatRouter;
