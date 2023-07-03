import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import dbConnection from './configs/mongodbConnection';
import blogRouter from './routes/blog';

dotenv.config();

const app: Express = express();

/*
 * Use middlewares
 */

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

/*
 * Use Routes
 */

app.use('/api/v1/blogs', blogRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(404).send('page not found');
});

/*
 * Connections
 */

dbConnection(process.env.MONGODB_URL);

const port: string = process.env.PORT || '9001';
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
