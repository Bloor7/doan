const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const path = require('path')
const bodyParser = require('body-parser')

const errorMiddleware = require('./middlewares/errors')


app.use(function(req, res, next) {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
})

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())


// import router here

const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');

app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', order)

app.use(errorMiddleware);

module.exports = app