import {body} from "express-validator";

const hasDescription = body('description')
        .isLength({ min: 5 })
        .withMessage('Description is required. Minimum length is 5 characters.');

export default hasDescription;
