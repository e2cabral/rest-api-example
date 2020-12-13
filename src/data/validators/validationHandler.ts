import {validationResult} from 'express-validator';
import {Request} from "express";
import {HttpError} from "../../infra/http-error";

export default (req: Request): void => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        throw new HttpError(
            'Validation Error',
            'Validation Failed!',
            422,
            validationErrors.array()
        );
    }
}
