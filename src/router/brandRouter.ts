import { Router } from 'express';
import brandController from '../controllers/brandController';

const brandRouter = Router();

brandRouter.get('/', brandController.getAll);
brandRouter.post('/', brandController.create);
brandRouter.patch('/:id', brandController.update);
brandRouter.delete('/:id', brandController.delete);

export default brandRouter;
