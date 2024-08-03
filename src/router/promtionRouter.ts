import { Router } from 'express';
import promotionController from '../controllers/promotionController';

const promotionRouter = Router();

promotionRouter.get('/', promotionController.getAll);
promotionRouter.post('/', promotionController.create);
promotionRouter.patch('/:id', promotionController.update);
promotionRouter.delete('/:id', promotionController.delete);

export default promotionRouter;
