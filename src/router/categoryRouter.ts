import { checkRole } from './../middleware/checkRoleMiddleware';
import { Router } from 'express';
import categoryController from '../controllers/categoryController';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';
const categoryRouter = Router();

categoryRouter.get('/', categoryController.getAll);
categoryRouter.get('/admin', authenticateMiddleware, checkRole(['admin']), categoryController.getAllAdmin);

categoryRouter.post('/', authenticateMiddleware, checkRole(['admin']), categoryController.create);
categoryRouter.patch('/:id', authenticateMiddleware, checkRole(['admin']), categoryController.update);
categoryRouter.delete('/:id', authenticateMiddleware, checkRole(['admin']), categoryController.delete);

export default categoryRouter;
