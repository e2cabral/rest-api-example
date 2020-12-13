import { Router } from "express";
import authController from '../../presentation/controller/auth-controller';
import {
    isEmail,
    hasName,
    hasPassword
} from "../../data/validation/validation";
import passportJwt from "../middlewares/auth/passport.jwt";

export default (router: Router): void => {
    router
        .post('/login', authController.login)
        .post(
            '/signup',
            [isEmail, hasPassword, hasName],
            authController.signup)
        .get('/me', passportJwt().authenticate(), authController.me);
}
