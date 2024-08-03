import { Router } from 'express';
import paymentController from '../controllers/paymentController';

const paymentRouter = Router();

paymentRouter.post('/momo', paymentController.paymentMomo);
paymentRouter.post('/zalopay', paymentController.paymentZalopay);
paymentRouter.post('/zalopay/callback', paymentController.paymentZalopayCallback);
paymentRouter.post('/zalopay/status', paymentController.paymentZalopayStatus);

// payment success
paymentRouter.post('/success', paymentController.paymentSuccess);

export default paymentRouter;
