import { Router } from 'express';
import cartController from '../controllers/cartController';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';

const cartRouter = Router();

cartRouter.get('/user/:id', authenticateMiddleware, cartController.getByUserId);
cartRouter.post('/', authenticateMiddleware, cartController.create);
cartRouter.put('/update', authenticateMiddleware, cartController.updateByUserId);

export default cartRouter;
