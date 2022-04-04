const mysql = require('mysql2');

let sqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

sqlConnection.connect(function(err) {
    if(err) {
        console.log(err.message);
    }
    else {
        console.log('Conexión exitosa.');
    }
})

module.exports = sqlConnection;