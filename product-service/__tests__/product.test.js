const express = require('express');
const supertest = require('supertest');
const productRoutes = require('../routes/productRoutes');
const { describe } = require('../models/Product');

const app = express();

app.use(express.json());
app.use('/products', productRoutes);

describe('Product CRUD check', () => {
    
    it('should create a product', async () => {
        const res = request(app)
            .post('/')
            .send({ itemname: 'Product Name 1', priceperkg: 500, sellerId: 'XXX1' });
        
        expect(res.statusCode).tobe(201);
        expect(res.body.product).toHaveProperty('productId');
    });
});