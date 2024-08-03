import { Router } from 'express';
import addressController from '../controllers/addressController';
const addressRouter = Router();

addressRouter.get('/', addressController.getAll);
addressRouter.get('/user/:id', addressController.getByUserId);
addressRouter.post('/', addressController.create);
addressRouter.patch('/:id', addressController.update);
addressRouter.delete('/:id', addressController.delete);

export default addressRouter;
