import { Router } from 'express';
import productController from '../controllers/productController';
import { log } from 'console';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';
import { checkRole } from '../middleware/checkRoleMiddleware';

const productRouter = Router();

productRouter.get('/', productController.getPagination);
productRouter.get('/category/:id', productController.getPagination);
productRouter.get('/related/:id', productController.getRelated);
productRouter.get('/hotsale', productController.getHotSale);

//? add middleware for check role
productRouter.get('/all', authenticateMiddleware, checkRole(['admin']), productController.getAll);
productRouter.get('/sold', authenticateMiddleware, checkRole(['admin']), productController.getBestSelling);
productRouter.get('/view', authenticateMiddleware, checkRole(['admin']), productController.getTopView);

productRouter.get('/:id', productController.getById!);

productRouter.post('/', productController.create);
productRouter.patch('/:id', productController.update);
productRouter.delete('/:id', productController.delete);

export default productRouter;
