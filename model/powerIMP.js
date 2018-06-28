// const Code = require('../util/code');
const Mode = require('../util/model');
const conn = require('../dbc/dbc');
class PowerIMP {
    constructor(obj) {

    }
    /**
     * 查询所有用户表
     */
    queryUserAll() {
        return Mode.getData('select * from user')
    }
    
}

module.exports = new PowerIMP();