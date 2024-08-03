import { NextFunction, Request, Response } from 'express';
import { sendMailChangePass } from '../app/mailer';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/error';
import UserModel, { UserDocument } from '../model/userModel';
import {
    generateAccessToken,
    generateRefreshToken,
    getUserFromToken,
    verifyAccessToken,
    verifyRefreshToken,
} from '../util/tokenUtil';
import getUUID from '../util/uuid';
interface ResgiterRequest extends Request {
    user?: Partial<UserDocument>;
}

const changePassUUID: Record<string, string> = {};

export const authenController = {
    regsiter: async (req: ResgiterRequest, res: Response, next: NextFunction) => {
        try {
            const user = req.body;
            const result = await UserModel.create(user);
            result.save();
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },

    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password, username } = req.body;

            if (!email && !username) {
                throw new BadRequestError('Email or username are not found');
            } else if (!password) {
                throw new BadRequestError('Password is required');
            } else if (email) {
                const user = await UserModel.findOne({ email });
                if (!user) {
                    throw new BadRequestError('Email not found');
                } else if (user.password !== password) {
                    throw new BadRequestError('Password is not correct');
                } else {
                    const accessToken = generateAccessToken(user);
                    const refreshToken = generateRefreshToken(user);
                    return res.status(200).json({ message: 'Login success', accessToken, refreshToken });
                }
            } else if (username) {
                const user = await UserModel.findOne({ username });
                if (!user) {
                    throw new BadRequestError('Username not found');
                } else if (user.password !== password) {
                    throw new BadRequestError('Password is not correct');
                } else {
                    const accessToken = generateAccessToken(user);
                    const refreshToken = generateRefreshToken(user);
                    return res.status(200).json({ message: 'Login success', accessToken, refreshToken });
                }
            }
        } catch (error) {
            next(error);
        }
    },

    changePassword: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password, newPassword, code } = req.body;

            if (code.code !== changePassUUID[email]) {
                throw new BadRequestError('Code is not correct');
            }

            const user = await UserModel.findOne({ email });
            if (!user) {
                throw new BadRequestError('Email not found');
            } else if (user.password !== password) {
                throw new BadRequestError('Password is not correct');
            } else {
                const userUd = await UserModel.findOneAndUpdate({ email }, { password: newPassword });
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);
                return res.status(200).json({ message: 'Login success', accessToken, refreshToken });
            }
        } catch (error) {
            next(error);
        }
    },

    verifyChangePass: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const pass = getUUID().toString();

            const { authorization } = req.headers;
            const user = getUserFromToken(authorization!);

            changePassUUID[user.email] = pass;

            /// gui mail
            sendMailChangePass(user.email, pass);

            return res.status(200).json({ status: true });
        } catch (error) {
            next(error);
        }
    },
    refreshToken: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                throw new BadRequestError('Refresh token is required');
            }

            const payload = verifyRefreshToken(refreshToken);
            if (!payload || payload == '') {
                throw new UnauthorizedError('Invalid refresh token');
            }

            const user = await UserModel.findById(payload.userId);
            if (!user) {
                throw new NotFoundError('User not found');
            }

            const accessToken = generateAccessToken(user);
            return res.status(200).json({ message: 'Refresh token success', accessToken });
        } catch (error) {
            next(error);
        }
    },
    verifyToken: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { accessToken } = req.body;
            if (!accessToken) {
                throw new BadRequestError('Access token is required');
            }
            const payload = verifyAccessToken(accessToken);
            if (!payload || payload == '') {
                throw new UnauthorizedError('Invalid access token');
            }

            /// more case here
            return res.status(200).json({ ok: true, message: 'Access token success' });
        } catch (error) {
            next(error);
        }
    },
};
