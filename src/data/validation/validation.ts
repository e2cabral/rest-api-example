import {body} from "express-validator";

export const hasDescription = body('description')
        .isLength({ min: 5 })
        .withMessage('Description is required. Minimum length is 5 characters.');

export const isEmail = body('email')
    .isEmail()
    .withMessage('Email field must contain a correct email.');

export const hasPassword = body('password')
    .exists()
    .withMessage('Password can\'t be empty.');

export const hasName = body('name')
    .isLength({ min: 5 })
    .withMessage('Name is required. Minimum length 5 characters.');

