import { Router } from 'express';
import addressController from '../controllers/addressController';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';
import { checkRole } from '../middleware/checkRoleMiddleware';
const addressRouter = Router();

addressRouter.get('/', authenticateMiddleware, checkRole(['admin']), addressController.getAll);
addressRouter.get('/user/:id', authenticateMiddleware, addressController.getByUserId);
addressRouter.post('/', authenticateMiddleware, addressController.create);
addressRouter.patch('/:id', authenticateMiddleware, addressController.update);
addressRouter.delete('/:id', authenticateMiddleware, addressController.delete);

export default addressRouter;
