import {Request, Response} from "express";
import {HttpError} from "../../../infra/http-error";

export default (error: HttpError, req: Request, res: Response): void => {
    const name = error.name;
    const status: number = error.status ? error.status : 500;
    const message: string = error.message;
    const validations = error.validations;

    res
        .status(status)
        .json({
            name,
            message,
            status,
            validations
        });
}
