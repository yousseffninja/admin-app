const mysql = require('mysql')
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

dotenv.config({
    path: './config.env',
});
const productRoute = require('./routes/productRoute')
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const DbService = require("./db/dbServices");

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(cors())
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.headers);
    next();
});

// app.use('/api/v1/product', productRoute);

app.get('/api/v1/product/getAllProducts', (req, res, next) => {
    const db = DbService.getDbServiceInstance();

    const result = db.getAllData();
    result.then(data => res.status(200).json({
        status: 'success',
        data
    })).catch(err => console.log(err))
});

app.post('/api/v1/product/insert', (req, res, next) => {
    const { name, desc, category_id, price, discount_id} = req.body
    const db = DbService.getDbServiceInstance()

    const result = db.insert(name, desc, category_id, price, discount_id)

    result.then(data => res.status(201).json({
        status: 'success',
        data
    })).catch(err => console.log(err))
})

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message)
    }
    console.log('db ' + connection.state)
})

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

let instance = null
class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {

            const res = await  new Promise((res, rej) => {
                const query = "SELECT * FROM product";

                connection.query(query, (err, result) => {
                    if (err) {
                        rej(new Error(err.message))
                    }
                    res(result)
                })
            });
            return res
        } catch (err) {
            console.log(err)
        }
    }

    async insert(name, desc, category_id, price, discount_id) {
        try {
            const created_at = new Date();
            const insertID = await  new Promise((res, rej) => {
                const query = "INSERT INTO product (name) VALUES (?)";
                const values = [name]
                connection.query(query, values, (err, result) => {
                    if (err) {
                        rej(new Error(err.message))
                    }
                    res(result)
                })
            });
            return insertID
        } catch (err) {
            console.log(err.message)
        }
    }
}

module.exports = connection