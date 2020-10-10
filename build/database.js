"use strict";
// import mongoose from 'mongoose';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// class Database{
//   connect(): void{
//     mongoose.connect('mongodb://localhost/control_rg',{
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     })
//     .then(db => console.log('Database is conected'))
//     .catch(err => console.log(err.message));
//   }
// }
// const database = new Database();
// export default database.connect();
const mysql_1 = __importDefault(require("mysql"));
const keys_1 = __importDefault(require("./keys"));
const pool = mysql_1.default.createPool(keys_1.default.database);
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('DATABASE CONNECTION WAS CLOSE');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log('DATABASE HAS TO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.log('DATABASE CONNECTION WAS REFUSED');
        }
        if (err.code === 'ER_DBACCESS_DENIED_ERROR') {
            console.log('Error: ', err.code, ' -> acceso denegado');
        }
    }
    if (connection) {
        connection.release();
        console.log('DB is connected');
    }
});
exports.default = pool;
