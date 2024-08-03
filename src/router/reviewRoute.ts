import { Router } from 'express';
import reviewController from '../controllers/reviewController';
import upload from '../middleware/uploadFile';

const reviewRouter = Router();

reviewRouter.get('/', reviewController.getAll);
reviewRouter.get('/product/:id', reviewController.getByProduct);
reviewRouter.get('/user/:id', reviewController.getByUser);
reviewRouter.post('/', upload.array('files'), reviewController.create);
reviewRouter.patch('/:id', reviewController.update);
reviewRouter.delete('/:id', reviewController.delete);

export default reviewRouter;
