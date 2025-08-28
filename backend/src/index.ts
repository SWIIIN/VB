
import express from 'express';
import dotenv from 'dotenv';
import exampleRouter from './routes/example';
dotenv.config();

const app = express();
app.use(express.json());

import { Request, Response } from 'express';

app.get('/', (req: Request, res: Response) => {
  res.send('Backend is running!');
});

app.use('/api', exampleRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
