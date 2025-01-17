import { Router } from 'express';
import orderController from '../controllers/orderController';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';
import { checkRole } from '../middleware/checkRoleMiddleware';

const orderRouter = Router();

orderRouter.get('/', authenticateMiddleware, checkRole(['admin']), orderController.getAll);
orderRouter.get('/:id', authenticateMiddleware, orderController.getById);
orderRouter.get('/user/:userId', orderController.getByUserId);
orderRouter.post('/', authenticateMiddleware, orderController.create);
orderRouter.patch('/:id', authenticateMiddleware, orderController.update);
orderRouter.delete('/:id', authenticateMiddleware, orderController.delete);

export default orderRouter;
