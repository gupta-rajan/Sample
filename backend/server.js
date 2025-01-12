import express from 'express';
import productRoutes from './routes/productRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

import path from 'path';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
const port = process.env.PORT || 5000;

const __dirname = path.resolve();

connectDB(); // Connect to the MongoDB database

const app = express();

// app.get('/api/products', (req, res) => {
//     res.json(products);
// });

// app.get('/api/products/:id', (req, res) => {
//     const product = products.find(p => p._id === req.params.id);
//     res.json(product);
// });

app.use('/api/products',productRoutes);
app.use(notFound);
app.use(errorHandler);

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, 'frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}else{
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

app.listen(port, () => console.log(`Server running on port ${port}`));