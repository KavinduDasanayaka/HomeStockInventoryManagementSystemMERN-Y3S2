import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import itemRouter from './routes/itemborrowingandlending.route.js';
import createPostRouter from './routes/post.route.js'
import groceryRouter from './routes/grocerylist.route.js';
import inventoryRouter from './routes/inventory.route.js'; // Added Inventory Routes
import aiRoutes from './routes/ai.route.js'; // Import AI Routes

import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MongoDB💖👌');
})
.catch((err) => {
    console.log('error is : ',err);
});  

const __dirname = path.resolve();

app.use(express.json());

app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use('/api/item', itemRouter);
app.use('/api/grocery', groceryRouter);
app.use('/api/create', createPostRouter);
app.use('/api/inventory', inventoryRouter); // Added Inventory Management Route

app.use("/api/ai", aiRoutes);

app.use(express.static(path.join(__dirname, '/Frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'));
})

//middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}
);