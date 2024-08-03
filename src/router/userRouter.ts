import { Router } from 'express';
import userController from '../controllers/userController';
import upload from '../middleware/uploadFile';

const userRouter = Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getById!);
userRouter.post('/', userController.create);
userRouter.patch('/:id', upload.single('avatar'), userController.update);

export default userRouter;
