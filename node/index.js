import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import categoryRouter from './routes/category.router.js'
import recipeRouter from './routes/recipe.router.js';
import userRouter from './routes/user.router.js';
import { errorHandler, notFound } from './middlewares/errorHandling.middleware.js';

config();
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use('/categories', categoryRouter);
app.use('/recipes', recipeRouter);
app.use('/users', userRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
});