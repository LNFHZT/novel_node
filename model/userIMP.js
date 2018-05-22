// const Code = require('../util/code');
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
        })
    }
    /**
     * 
     * @param {Array} obj 
     * @param {String} -account <String> 账号
     * @param {String} -password <String> 密码
     * @param {String} -nicName <String> 账号
     */
    regist(obj) {
        // VALUES 
        let sql = '',
            s1 = '',
            s2 = '';
        for (let item in obj) {
            s1 += (item + ',');
            if (typeof obj[item] == 'string') {
                s2 += ('"' + obj[item] + '"' + ',');
            } else {
                s2 += (obj[item] + ',');
            }
        }
        s1 = s1.substr(0, s1.length - 1);
        s2 = s2.substr(0, s2.length - 1);
        sql = 'insert into user (' + s1 + ') values (' + s2 + ')'
        return Mode.query({
            sql: sql,
        })
    }
}

module.exports = new UserIMP();