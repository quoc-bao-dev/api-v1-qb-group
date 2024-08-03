import jwt from 'jsonwebtoken';
import { UserDocument } from '../model/userModel';

export const generateAccessToken = (user: UserDocument): string => {
    return jwt.sign(
        {
            userId: user._id,
            username: user.username,
            email: user.email,
            image: user.avatar,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );
};

export const generateRefreshToken = (user: UserDocument): string => {
    return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    });
};

export const verifyAccessToken = (token: string): any => {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    } catch (error) {
        return '';
    }
};

export const verifyRefreshToken = (token: string): any => {
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string);
    } catch (error) {
        return '';
    }
};

export const decodeToken = (token: string): any => {
    return jwt.decode(token);
};

export const getUserFromToken = (authorization: string) => {
    const token = authorization!.split(' ')[1];
    const user = decodeToken(token as string);
    return user;
};
