import { Router } from 'express';
import wishlishController from '../controllers/wishListController';
const wishListRouter = Router();

wishListRouter.get('/', wishlishController.getAll);
wishListRouter.get('/user/:id', wishlishController.getByUserId);
wishListRouter.post('/', wishlishController.create);
wishListRouter.patch('/:id', wishlishController.update);
wishListRouter.delete('/:id', wishlishController.delete);

export default wishListRouter;
