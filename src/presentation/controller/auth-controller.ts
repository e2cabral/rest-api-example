import { Request, Response, NextFunction } from "express";
import { injectable, container } from "tsyringe";
import jwt from 'jwt-simple';
import config from '../../main/config/auth';
import User from '../../domain/model/user.schema';
import {HttpError} from "../../infra/http-error";

@injectable()
class AuthController {
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).select('+password');

            if (!user) {
                const error = new HttpError(
                    'Credential Error',
                    'Wrong credentials',
                    401,
                    []
                );
                throw error;
            }

            const validPassword = await user.validPassword(password);
        } catch (error) {
            next(error);
        }
    }
}
