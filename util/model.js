const Code = require('./code');
const conn = require('../dbc/dbc');

class Mode {
    constructor() {

    }
    /**
     * 拿数据库数据统一封装，预处理
     * @param {Object} obj  <Object/String>
     * @param {String} obj <Object/String>
     * @param {Array} params <Array> 替换sql语句中的问号
     * @param {Boolean} isFill <Boolean> 默认false obj.isFill将空数据变为运行在catch中
     * @param {Function} nullData <Function> obj.nullData 空数据处理
     * @param {Function} success <Function> obj.preprocessing 正常数据处理
     * @example nullData(obj) {return obj;}
     * @example success(obj) {return obj;}
     */
    query(obj) {
        let options = {
            isFill: false,
            params: [],
            nullData(obj) {
                return obj;
            },
            success(obj) {
                return obj;
            }
        };
        let sql = '';
        if (typeof obj === 'object') {
            obj = Object.assign(options, obj);
        }
        if (typeof obj === 'string') {
            options.sql = obj;
            obj = options;
        }
        sql = obj.sql;
        if (!sql) {
            throw new Error('sql 语句为空');
            return new Promise(() => {
                resolve([]);
            })
        }
        return new Promise((resolve, reject) => {
            conn.query(sql, obj.addSqlParams, (err, result) => {
                //  统一错误处理
                if (err) {
                    console.error(err);
                    reject(new Code({
                        code: Code.codeMap().DATABASE_ERROR,
                    }).return);
                    return;
                }
                result = obj.nullData(result);
                if (obj.isFill) {
                    if (!result.length) {
                        reject(result);
                        return;
                    }
                }
                result = obj.success(result);
                resolve(result);
            });
        })
    }
}

module.exports = new Mode();