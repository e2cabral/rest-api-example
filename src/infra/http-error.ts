import {ValidationError} from "express-validator";

export class HttpError implements Error {
    constructor(public name: string, public message: string, public status: number, public validations: Array<ValidationError>) {
        this.name = name;
        this.message = message;
        this.status = status;
        this.validations = validations;
    }
}
