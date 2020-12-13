import {NextFunction, Request, Response} from "express";
import { injectable, container } from "tsyringe";
import validationHandler from '../../data/validators/validationHandler';
import Post from '../../domain/model/post-schema';

@injectable()
class TestController {

    public async index(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const posts = await Post.find().sort({ createdAt: -1 });
            res.send(posts);
        } catch (e) {
            next(e);
        }
    }

    public async show(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const post = await Post.findOne({
                _id: req.params.id
            });
            res.send(post);
        } catch (e) {
            next(e);
        }
    }

    public async store(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            validationHandler(req);

            let post = new Post();
            post.set('description', req.body.description);
            post.set('image', req.file.originalname);

            post = await post.save();
            res.send(post);
        } catch (e) {
            next(e);
        }
    }

    public async update(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            let post = await Post.findById(req.params.id);

            if (post === null || post === undefined) {
                res
                    .status(404)
                    .send({message: 'Post not found!'});
                return;
            }

            post.set('description', req.body.description);
            post = await post.save();

            res.status(200).send(post);
        } catch (e) {
            next(e);
        }
    }

    public async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const post = await Post.findById(req.params.id);

            if (post === null || post === undefined) {
                res
                    .status(404)
                    .send({ message: 'Post not found!' });
                return;
            }

            await post.delete();
            res.send({ message: 'Your post was deleted!' });
        } catch (e) {
            next(e);
        }
    }
}

export default container.resolve(TestController);
