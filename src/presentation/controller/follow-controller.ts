import {Request, Response} from "express";
import {HttpError} from "../../infra/http-error";
import {container, injectable} from "tsyringe";

@injectable()
class FollowController {
    async follow(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user) {
                throw new HttpError(
                    'You\'re Not Authorized',
                    'You must login to follow anyone.',
                    401,
                    []
                );
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            req.user.following.push(req.params.id);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            req.user.save();

            res
                .status(200)
                .send({ message: 'Thanks for follow!' });
        } catch (e) {
            res
                .status(e.status)
                .send(e);
        }
    }
}

export default container.resolve(FollowController);
