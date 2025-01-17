import { Router } from 'express';
import userController from '../controllers/userController';
import upload from '../middleware/uploadFile';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';
import { checkRole } from '../middleware/checkRoleMiddleware';

const userRouter = Router();

userRouter.get('/', authenticateMiddleware, checkRole(['admin']), userController.getAll);
userRouter.get('/:id', authenticateMiddleware, userController.getById!);
userRouter.post('/', userController.create);
userRouter.patch('/:id', authenticateMiddleware, upload.single('avatar'), userController.update);

export default userRouter;
