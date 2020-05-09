// let mysql = require('mysql');
// import config from '../config/dbcConfig';
// let conn = mysql.createConnection(config.dbcConfig);
// conn.connect();

// module.exports = conn;
import { createConnection, Connection } from "typeorm";
export default new class Conn {
    constructor() {

    }
    async init() {
        await createConnection()
        console.log('数据库连接成功');
        return Promise.resolve();
    }
}
