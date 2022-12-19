// const DbService = require('../db/dbServices')
//
// exports.insertData = (req, res, next) => {
//     const { name, desc, category_id, price, discount_id} = req.body
//     const db = DbService.getDbServiceInstance()
//
//     const result = db.insert(name, desc, category_id, price, discount_id)
//
//     result.then(data => res.status(201).json({
//         status: 'success',
//         data
//     })).catch(err => console.log(err))
// }
//
// exports.getAll = (req, res, next) => {
//     const db = DbService.getDbServiceInstance();
//
//     const result = db.getAllData();
//     result.then(data => res.status(200).json({
//         status: 'success',
//         data
//     })).catch(err => console.log(err))
// }