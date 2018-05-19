let conn = require('../dbc/dbc')

class UserIMP {
    constructor(obj) {

    }
    /**
     * 查询所有用户表
     */
    queryUserAll() {
        return conn.query('select * from user')
    }
    /**
     * 
     * @param {String} account 账号
     * @param {String} password 密码
     */
    loginCheck(account, password) {
        return conn.query("SELECT * from `user` WHERE account='" + account + "' and passwd='" + password + "' ")
    }
}

module.exports = new UserIMP();