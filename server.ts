import express, { Request, Response } from 'express'
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';

import { getPopulationData } from './api';

dotenv.config();
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
const port = process.env.PORT || 3005;

app.get('/', (req: Request, res: Response) => {
  res.send('Just a simple node server with typescript');
});

app.get('/population/usa', async (req: Request, res: Response) => {
  const populationData = await getPopulationData();
  res.status(200).json(populationData.data);
});

// user and blog routes
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");

app.use('/users', userRouter);
app.use('/blogs', blogRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});


