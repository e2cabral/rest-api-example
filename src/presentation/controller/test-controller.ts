import {NextFunction, Request, Response} from "express";
import { injectable, container } from "tsyringe";
import validationHandler from '../../data/validators/validationHandler';
import Post from '../../domain/model/post-schema';
import {HttpError} from "../../infra/http-error";

@injectable()
class TestController {

    public async index(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const posts = await Post
                .find()
                .populate('user')
                .sort({ createdAt: -1 });
            res.send(posts);
        } catch (e) {
            res
                .status(e.status)
                .send(e);
        }
    }

    public async show(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            const post = await Post.findOne({
                _id: req.params.id
            }).populate('user');
            res.send(post);
        } catch (e) {
            res
                .status(e.status)
                .send(e);
        }
    }

    public async store(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            validationHandler(req);

            let post = new Post();
            post.set('description', req.body.description);
            post.set('image', req.file.originalname);
            post.set('user', req.user);

            post = await post.save();
            res.send(post);
        } catch (e) {
            res
                .status(e.status)
                .send(e);
        }
    }

    public async update(
        req: Request,
        res: Response
    ): Promise<void> {
        try {
            validationHandler(req);

            let post = await Post.findById(req.params.id);

            if (!post) {
                throw new HttpError(
                    'Post Not Found',
                    'The post which you\'re trying to update doesn\'t exist.',
                    404,
                    []
                );
            }

            const userAreEqual = req.user === undefined || post.get('user') !== req.user.id;

            if (!userAreEqual) {
                throw new HttpError(
                    'You\'re not authorized',
                    'You\'re not authorized to update this post',
                    401,
                    []
                );
            }

            post.set('description', req.body.description);
            post = await post.save();

            res.status(200).send(post);
        } catch (e) {
            res
                .status(e.status)
                .send(e);
        }
    }

    public async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const post = await Post.findById(req.params.id);

            if (!post) {
                throw new HttpError(
                    'Post Not Found',
                    'The post which you\'re trying to update doesn\'t exist.',
                    404,
                    []
                );
            }

            const userAreEqual = req.user === undefined || post.get('user') !== req.user.id;

            if (!userAreEqual) {
                throw new HttpError(
                    'You\'re not authorized',
                    'You\'re not authorized to update this post',
                    401,
                    []
                );
            }

            await post.delete();
            res.send({ message: 'Your post was deleted!' });
        } catch (e) {
            res
                .status(e.status)
                .send(e);
        }
    }
}

export default container.resolve(TestController);
