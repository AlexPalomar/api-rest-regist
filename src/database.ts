// import mongoose from 'mongoose';

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

import mysql from 'mysql';
import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('DATABASE CONNECTION WAS CLOSE');
        }

        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.log('DATABASE HAS TO MANY CONNECTIONS');
        }

        if(err.code === 'ECONNREFUSED'){
            console.log('DATABASE CONNECTION WAS REFUSED');
        }

        if(err.code === 'ER_DBACCESS_DENIED_ERROR'){
            console.log('Error: ',err.code,' -> acceso denegado');
        }
    }
    
     if(connection){ 
        connection.release();
        console.log('DB is connected');
     }
});

export default pool;