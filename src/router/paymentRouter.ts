import { Router } from 'express';
import paymentController from '../controllers/paymentController';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';

const paymentRouter = Router();

paymentRouter.post('/momo', authenticateMiddleware, paymentController.paymentMomo);
paymentRouter.post('/zalopay', authenticateMiddleware, paymentController.paymentZalopay);
paymentRouter.post('/zalopay/callback', authenticateMiddleware, paymentController.paymentZalopayCallback);
paymentRouter.post('/zalopay/status', authenticateMiddleware, paymentController.paymentZalopayStatus);

// payment success
paymentRouter.post('/success', paymentController.paymentSuccess);

export default paymentRouter;
