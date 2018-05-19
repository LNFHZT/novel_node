const Code = require('../util/code');
const Mode = require('../util/model');
const conn = require('../dbc/dbc');
class UserIMP {
    constructor(obj) {

    }
    /**
     * 查询所有用户表
     */
    queryUserAll() {
        return Mode.getData('select * from user')
    }
    /**
     * 
     * @param {String} account 账号
     * @param {String} password 密码
     */
    loginCheck(account, password) {
        return Mode.getData({
            sql: "SELECT * from `user` WHERE account='" + account + "' and passwd='" + password + "' ",
            isFill: true,
            nullData(data) {
                data = new Code({
                    code: 2000
                }).return
                return data;
            }
        })
        return conn.query()
    }
}

module.exports = new UserIMP();