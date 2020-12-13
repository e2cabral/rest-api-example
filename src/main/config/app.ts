import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

import setupRoutes from './routes';
import errorHandler from '../middlewares/errors/error-handler';
import passportJwt from '../middlewares/auth/passport.jwt';
import {DbClient} from "../../data/db-client";

passportJwt();

const app = express();
app.disable('x-powered-by');
app.disable('etag');

app
    .use(bodyParser.json())
    .use(cors())
    .use(passportJwt().initialize());

setupRoutes(app);
app.use(errorHandler);

DbClient
    .connect()
    .then(() => console.log('Connection works fine!'))
    .catch((err) => console.log('Connection didn\'t work!', err));


export default app;
