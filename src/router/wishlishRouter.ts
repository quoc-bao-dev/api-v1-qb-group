import { Router } from 'express';
import wishlishController from '../controllers/wishListController';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';
const wishListRouter = Router();

wishListRouter.get('/', authenticateMiddleware, wishlishController.getAll);
wishListRouter.get('/user/:id', authenticateMiddleware, wishlishController.getByUserId);
wishListRouter.post('/', wishlishController.create);
wishListRouter.patch('/:id', wishlishController.update);
wishListRouter.delete('/:id', wishlishController.delete);

export default wishListRouter;
