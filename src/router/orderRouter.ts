import { Router } from 'express';
import orderController from '../controllers/orderController';

const orderRouter = Router();

orderRouter.get('/', orderController.getAll);
orderRouter.get('/:id', orderController.getById);
orderRouter.get('/user/:userId', orderController.getByUserId);
orderRouter.post('/', orderController.create);
orderRouter.patch('/:id', orderController.update);
orderRouter.delete('/:id', orderController.delete);

export default orderRouter;
