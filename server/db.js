const mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net',
    user: 'sql7296281',
    password: 'uzPFLtt98s',
    database: 'sql7296281'
});
module.exports = {

    setUp: (config) => {
        if (config) {
            connection = mysql.createConnection(config);
        }
    },

    connect: () => {
        connection.connect();
    },
    query: (query) => {

        return new Promise((resolve, reject) => {
            connection.query(query, function (error, rows, fields) {
                if (error) {
                    reject(error);
                }

                resolve({ rows, fields });
            });
        });
    },
    disconnect: () => {
        connection.end();
    }
};






//   INSERT INTO TEST (pk, name) VALUES (2, 'John');
//   connection.query('Create TABLE TEST (pk int,name varchar(255))', function (error, rows, fields) {


