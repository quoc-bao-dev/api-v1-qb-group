import { Router } from 'express';
import chatController from '../controllers/chatController';

const chatRouter = Router();
chatRouter.get('/user/:id', chatController.getChatByUserId);
chatRouter.get('/user-room-info/:id', chatController.getChatByUserId);
chatRouter.get('/room/:id', chatController.getChatByRoomId);
chatRouter.get('/room-info/:id', chatController.getRoomInfo);
chatRouter.post('/', chatController.createRoom);

export default chatRouter;
