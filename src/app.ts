import express from 'express';
import cors from 'cors';
import routes from './routes';

import './database/connection';

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors());

export default app;
