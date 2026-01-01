import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import orderRoute from './routes/orderRoute.js'

dotenv.config();


connectDB()


const app = express();


app.use(cors({
    origin: [ 'http://localhost:3000'], 
    credentials: true, 
  }));
app.use(cookieParser());
app.use(express.json());



app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/order', orderRoute);


app.get('/', (req, res) => {
    res.send('API is running');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

})