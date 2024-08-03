import { Router } from 'express';
import productDetailController from '../controllers/productDetailController';

const productDetailRouter = Router();

productDetailRouter.get('/', productDetailController.getAll);
productDetailRouter.get('/:id', productDetailController.getById!);
productDetailRouter.post('/', productDetailController.create);
productDetailRouter.patch('/:id', productDetailController.update);
productDetailRouter.delete('/:id', productDetailController.delete);

export default productDetailRouter;
