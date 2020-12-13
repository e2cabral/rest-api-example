import { Router } from 'express';
import TestController from '../../presentation/controller/test-controller';
import hasDescription from "../../data/validation/validation";
import uploadImage from '../middlewares/multer';

export default (router: Router): void => {
    router
        .get('/', TestController.index)
        .get('/:id', TestController.show)
        .post(
            '/',
            uploadImage('posts').single('image'),
            hasDescription,
            TestController.store
        )
        .patch('/:id', hasDescription, TestController.update)
        .delete('/:id', TestController.delete);
}
