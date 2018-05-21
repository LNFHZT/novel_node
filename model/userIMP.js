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
     * @param {String} account <String> 账号
     * @param {String} password <String> 密码
     */
    loginCheck(account, password) {
        return Mode.query({
            sql: "SELECT * from `user` WHERE account= '" + account + "' and passwd= '" + password + "' ",
            // params: [account, password],
            isFill: true,
            nullData(data) {
                data = new Code({
                    code: 2000
                }).return
                return data;
            }
        })
    }
    /**
     * 
     * @param {Array} obj 
     */
    regist(obj) {
        // VALUES 
        return Mode.query({
            sql: 'insert into user (account,passwd,nicName) values (?,?,?)',
            params: obj,
        })
    }
}

module.exports = new UserIMP();