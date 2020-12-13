import {Request, Response, Router} from "express";

export default (router: Router): void => {
    router
        .post('/login', (req: Request, res: Response) => { res.send('Login route created.') });
}
