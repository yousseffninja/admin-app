const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(cors())
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.headers);
    next();
});

module.exports = app;