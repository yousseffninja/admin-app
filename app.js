// const express = require('express');
// const morgan = require('morgan');
// const cors = require('cors')
//
// const productRoute = require('./routes/productRoute')
//
// const app = express();
//
// if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
// app.use(cors())
// app.use(express.json({ limit: '10kb' }));
// app.use(express.urlencoded({ extended: false }));
//
// app.use((req, res, next) => {
//     req.requestTime = new Date().toISOString();
//     console.log(req.headers);
//     next();
// });
//
// app.use('/api/v1/product', productRoute);
//
// module.exports = app;