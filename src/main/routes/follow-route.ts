import { Router } from "express";
import followController from '../../presentation/controller/follow-controller';

export default (router: Router): void => {
    router
        .post('follow/:id', followController.follow);
}
