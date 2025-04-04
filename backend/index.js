import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/UserRoute.js';


dotenv.config();


const app = express();

//middleware
app.use(express.json());
app.use(cors());

//connect to database
connectDB({ origin: 'http://localhost:5173', credentials: true });

//routes
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port 3000 !');
}
);