import { Router } from 'express';
import TestController from '../../presentation/controller/test-controller';
import { hasDescription } from "../../data/validation/validation";
import uploadImage from '../middlewares/multer';
import passportJwt from '../middlewares/auth/passport.jwt';

export default (router: Router): void => {
    router
        .get(
            '/',
            passportJwt().authenticate(),
            TestController.index
        )
        .get(
            '/:id',
            passportJwt().authenticate(),
            TestController.show
        )
        .post(
            '/',
            passportJwt().authenticate(),
            uploadImage('posts').single('image'),
            hasDescription,
            TestController.store
        )
        .patch(
            '/:id',
            passportJwt().authenticate(),
            hasDescription,
            TestController.update
        )
        .delete(
            '/:id',
            passportJwt().authenticate(),
            TestController.delete
        );
}
