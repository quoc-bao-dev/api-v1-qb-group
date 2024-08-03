import { Router } from 'express';
import { authenController } from '../controllers/authenController';
import { authenticateMiddleware } from '../middleware/authenticateMiddleware';
const authenRouter = Router();

//register
authenRouter.post('/register', authenController.regsiter);

//login
authenRouter.post('/login', authenController.login);

//change password
authenRouter.post('/verify-change-pass', authenticateMiddleware, authenController.verifyChangePass);
authenRouter.post('/change-password', authenticateMiddleware, authenController.changePassword);

//logout in client

//refresh token
authenRouter.post('/refresh-token', authenController.refreshToken);
//verify token
authenRouter.post('/verify-token', authenController.verifyToken);

export default authenRouter;
