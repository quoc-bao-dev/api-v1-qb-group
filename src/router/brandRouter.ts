import { Router } from 'express';
import brandController from '../controllers/brandController';
import { checkRole } from '../middleware/checkRoleMiddleware';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';

const brandRouter = Router();

brandRouter.get('/', brandController.getAll);
brandRouter.post('/', authenticateMiddleware, checkRole(['admin']), brandController.create);
brandRouter.patch('/:id', authenticateMiddleware, checkRole(['admin']), brandController.update);
brandRouter.delete('/:id', authenticateMiddleware, checkRole(['admin']), brandController.delete);

export default brandRouter;
