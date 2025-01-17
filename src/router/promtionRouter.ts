import { Router } from 'express';
import promotionController from '../controllers/promotionController';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';
import { checkRole } from '../middleware/checkRoleMiddleware';

const promotionRouter = Router();

promotionRouter.get('/', authenticateMiddleware, checkRole(['admin']), promotionController.getAll);
promotionRouter.post('/', authenticateMiddleware, checkRole(['admin']), promotionController.create);
promotionRouter.patch('/:id', authenticateMiddleware, checkRole(['admin']), promotionController.update);
promotionRouter.delete('/:id', authenticateMiddleware, checkRole(['admin']), promotionController.delete);

export default promotionRouter;
