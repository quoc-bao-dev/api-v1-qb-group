import { Router } from 'express';
import cartController from '../controllers/cartController';

const cartRouter = Router();

cartRouter.get('/user/:id', cartController.getByUserId);
cartRouter.post('/', cartController.create);
cartRouter.put('/update', cartController.updateByUserId);

export default cartRouter;
