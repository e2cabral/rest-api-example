import { Request, Response, NextFunction } from "express";
import { injectable, container } from "tsyringe";
import jwt from 'jwt-simple';
import config from '../../main/config/auth';
import User from '../../domain/model/user.schema';
import {HttpError} from "../../infra/http-error";
import validationHandler from "../../data/validators/validationHandler";

@injectable()
class AuthController {
    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await User
                .findOne({ email })
                .select('+password');

            if (!user) {
                throw new HttpError(
                    'Credential Error',
                    'Wrong credentials',
                    401,
                    []
                );
            }

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const validPassword = await user.validPassword(password);
            if (!validPassword) {
                throw new HttpError(
                    'Invalid Password',
                    'Password not match.',
                    401,
                    []
                );
            }

            const token = jwt.encode({ id: user.id }, config.jwtSecret);
            res.send({ user, token });
        } catch (e) {
            res
                .status(e.status)
                .send(e);
        }
    }

    async signup(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<{ user: Document, token: string }> | undefined> {
        try {
            validationHandler(req);

            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                throw new HttpError(
                    'Existing User Error',
                    'There is an user already registred with this email.',
                    403,
                    []
                );
            }

            let user = new User();
            user
                .set('email', req.body.email)
                .set(
                    'password',
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    await user.encryptPassword(req.body.password))
                .set('name', req.body.name);

            user = await user.save();
            const token = jwt.encode({ id: user.id }, config.jwtSecret);

            return res.send({ user, token });
        } catch (e) {
            res
                .status(e.status)
                .send(e);
        }
    }

    async me(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const user = await User.findById(req.user);
            return res.send(user);
        } catch (e) {
            next(e);
        }
    }
}

export default container.resolve(AuthController);
