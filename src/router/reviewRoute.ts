import { Router } from 'express';
import reviewController from '../controllers/reviewController';
import upload from '../middleware/uploadFile';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';

const reviewRouter = Router();

reviewRouter.get('/', reviewController.getAll);
reviewRouter.get('/product/:id', reviewController.getByProduct);
reviewRouter.get('/user/:id', reviewController.getByUser);
reviewRouter.post('/', authenticateMiddleware, upload.array('files'), reviewController.create);
reviewRouter.patch('/:id', authenticateMiddleware, authenticateMiddleware, reviewController.update);
reviewRouter.delete('/:id', authenticateMiddleware, reviewController.delete);

export default reviewRouter;
