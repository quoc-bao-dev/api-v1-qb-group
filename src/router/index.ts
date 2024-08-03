import { Router } from 'express';
import addressRouter from './addressRouter';
import authenRouter from './authenRouter';
import brandRouter from './brandRouter';
import cartRouter from './cartRouter';
import categoryRouter from './categoryRouter';
import chatRouter from './chatRouter';
import imagesRouter from './imagesRouter';
import orderRouter from './orderRouter';
import paymentRouter from './paymentRouter';
import productDetailRouter from './productDetailRouter';
import productRouter from './productRouter';
import promotionRouter from './promtionRouter';
import reviewRouter from './reviewRoute';
import userRouter from './userRouter';
import voucherRouter from './voucherRouter';
import wishListRouter from './wishlishRouter';

const router = Router();

router.use('/brand', brandRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/product-detail', productDetailRouter);
router.use('/review', reviewRouter);
router.use('/user', userRouter);
router.use('/address', addressRouter);
router.use('/promotion', promotionRouter);
router.use('/order', orderRouter);
router.use('/authen', authenRouter);
router.use('/voucher', voucherRouter);
router.use('/payment', paymentRouter);
router.use('/cart', cartRouter);
router.use('/chat', chatRouter);
router.use('/image', imagesRouter);
router.use('/wish-list', wishListRouter);

export default router;
