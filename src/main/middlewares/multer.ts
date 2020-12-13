import path from "path";
import multer, {FileFilterCallback, Multer} from "multer";
import {Request} from "express";
import {HttpError} from "../../infra/http-error";

export default (folderName: string): Multer => {
    return multer({
        fileFilter: (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
            const ext = path.extname(file.originalname);
            if (
                ext !== '.png' &&
                ext !== '.jpg' &&
                ext !== '.gif' &&
                ext !== '.jpeg'
            ) {
                return callback(new HttpError(
                    '',
                    'Only images are allowed',
                    422,
                    []
                ));
            }
            callback(null, true);
        },
        dest: `public/uploads/${folderName}/`
    })
}
