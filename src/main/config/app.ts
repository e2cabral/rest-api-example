import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

import setupRoutes from './routes';
import errorHandler from '../middlewares/errors/error-handler';
import mongoose from "mongoose";
import passportJwt from '../middlewares/auth/passport.jwt';

passportJwt();

const app = express();
app.disable('x-powered-by');
app.disable('etag');

mongoose.Promise = global.Promise;
mongoose.connect(
    '',
    { useUnifiedTopology: true }
);

app
    .use(bodyParser.json())
    .use(cors())
    .use(passportJwt().authenticate());

setupRoutes(app);
app.use(errorHandler);

export default app;
