let mysql = require('mysql');
let config = require('../config/dbcConfig');
let conn = mysql.createConnection(config.dbcConfig);
conn.connect();

module.exports = conn;