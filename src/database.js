const mysql = require("mysql");
const {promisify} = require("util");
const {database} = require("./keys");

const pool = mysql.createPool(database);
pool.getConnection((err, connection) => {
    if(err){
        if (err.code === "POTOCOL_CONNECTION_LOST"){
            console.error("DATABASE CONNECTION WAS CLOSED");
        }
        if (err.code === "ER_CON_COUNT_ERROR"){
            console.error("DATABASE HAS TO MANY CONNECTIONS");
        }
        if (err.code === "POTOCOL_CONNECTION_LOST"){
            console.error("DATABASE CONNECTION WAS REFUSED");
        }
    }

    if (connection){
        connection.release();
    }

    console.log("DATABASE IS CONNECTED")
    return;
});

//promisify pool query
pool.query = promisify(pool.query)

module.exports = pool;