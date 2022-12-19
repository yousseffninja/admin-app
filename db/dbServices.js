// const connection = require('../server')
// let instance = null
// class DbService {
//     static getDbServiceInstance() {
//         return instance ? instance : new DbService();
//     }
//
//     async getAllData() {
//         try {
//
//             const res = await  new Promise((res, rej) => {
//                 const query = "SELECT * FROM product";
//
//                 connection.query(query, (err, result) => {
//                     if (err) {
//                         rej(new Error(err.message))
//                     }
//                     res(result)
//                 })
//             });
//             return res
//         } catch (err) {
//             console.log(err)
//         }
//     }
//
//     async insert(name, desc, category_id, price, discount_id) {
//         try {
//             const created_at = new Date();
//             const insertID = await  new Promise((res, rej) => {
//                 const query = "INSERT INTO product (name, desc, category_id, price, discount_id, created_at) VALUES (?, ?, ?, ?, ?, ?)";
//
//                 connection.query(query, (err, result) => {
//                     if (err) {
//                         rej(new Error(err.message))
//                     }
//                     res(result)
//                 })
//             });
//             return insertID
//         } catch (err) {
//             console.log(err.message)
//         }
//     }
// }
//
// module.exports = DbService;