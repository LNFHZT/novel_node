let dbcConfig = require('../config');
let mysql = require('mysql');

class DBC {
    static connection() {};
    constructor(config) {
        DBC.connection = mysql.createConnection(config)
        DBC.connection.connect();
    }
    query(sql) {
        return new Promise((resolve, reject) => {
            DBC.connection.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    }
}
conn = new DBC({
    host: 'localhost',
    user: 'root',
    password: 'qx123456',
    database: 'test'
});
module.exports = conn;