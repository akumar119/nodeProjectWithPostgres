import express from 'express';
import dotenv from 'dotenv';
import userRouter from './Router/userRouter';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(userRouter);
// Create a catch-all route for testing the installation.
app.get('*', (req, res) => res.status(200).send({
  message: 'Hello World!',
}));
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server is running at port>>>${PORT}`);
});
