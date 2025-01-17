import { Router } from 'express';
import voucherController from '../controllers/voucherController';
import { checkRole } from '../middleware/checkRoleMiddleware';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';
const voucherRouter = Router();

voucherRouter.get('/', voucherController.getAll);
voucherRouter.get('/code/:code', voucherController.getByCode);
voucherRouter.post('/', authenticateMiddleware, checkRole(['admin']), voucherController.create);
voucherRouter.patch('/:id', authenticateMiddleware, checkRole(['admin']), voucherController.update);
voucherRouter.delete('/:id', authenticateMiddleware, checkRole(['admin']), voucherController.delete);

export default voucherRouter;
