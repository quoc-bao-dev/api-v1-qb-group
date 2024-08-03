import { checkRole } from './../middleware/checkRoleMiddleware';
import { Router } from 'express';
import categoryController from '../controllers/categoryController';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';
const categoryRouter = Router();

categoryRouter.get('/', categoryController.getAll);
categoryRouter.get('/admin', authenticateMiddleware, checkRole(['admin']), categoryController.getAllAdmin);

categoryRouter.post('/', categoryController.create);
categoryRouter.patch('/:id', categoryController.update);
categoryRouter.delete('/:id', categoryController.delete);

export default categoryRouter;
