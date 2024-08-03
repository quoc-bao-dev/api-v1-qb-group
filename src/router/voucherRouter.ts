import { Router } from 'express';
import voucherController from '../controllers/voucherController';
const voucherRouter = Router();

voucherRouter.get('/', voucherController.getAll);
voucherRouter.get('/code/:code', voucherController.getByCode);
voucherRouter.post('/', voucherController.create);
voucherRouter.patch('/:id', voucherController.update);
voucherRouter.delete('/:id', voucherController.delete);

export default voucherRouter;
