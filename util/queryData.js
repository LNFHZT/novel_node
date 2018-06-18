const Code = require('./code');
class QueryData {
    constructor() {

    }
    /**
     * 公共获取参数 
     * 优先获取  req.body
     *          req.query
     *          req.params
     * @param {Object} obj 需要获取的参数
     * @param {Object} -obj [需要获取的参数名]
     * @param {String} -obj [需要获取的参数名].type 获取参数类型 默认String  可选"String"/'Object'/'Number'/'Boolean'/'Array'
     * @param {Array} -obj [需要获取的参数名].typeList 获取参数类型   可选"String"/'Object'/'Number'/'Boolean'/'Array'
     * @param {Boolean} -obj [需要获取的参数名].dataMust true/false, 对象和数组，能否为空对象或者空数组
     * @param {Boolean} -obj [需要获取的参数名].must true/false, 是否是必须获取的
     * @param {Object} -obj [需要获取的参数名].keyList 对象里面的key列表,就像外层一样。
     * @param {Object} req request
     * @param {Object} res response
     * @example getParam({name:{type:'String',must:true}},req,res) .then(data=>{}).catch(res=>{})
     * @returns 返回Promise对象
     */
    getParam(obj, req, res) {
        return new Promise((resolve, reject) => {
            let R = {},
                t = true;
            R = QueryData.loopParam(obj, req, res);
            if (t) {
                resolve(R);
            }
        })
    }

    static loopParam(obj, req, res ) {
        let R = {},
            t = true;
        for (const item in obj) {
            if (obj.hasOwnProperty(item)) {
                let element = obj[item];
                let v = undefined;
                try {
                    if (!element.type) {
                        element.type = 'String';
                    }
                    if (element.type == 'String' || element.type == 'Object' || element.type == 'Number' || element.type == 'Boolean' || element.type == 'Array') {
                        element.type = element.type.toLowerCase();
                    } else {
                        throw new Error('getParam方法：' + item + '传递参数type值错误传递值为' + element.type);
                        return res.json(new Code({
                            code: Code.codeMap().SERVER_ERROR,
                        }).return);
                        t = false;
                        break;
                    }
                    //  获取参数
                    if (req.body && req.body[item]) {
                        v = req.body[item];
                    } else if (req.query && req.query[item]) {
                        v = req.query[item];
                    } else if (req.params && req.params[item]) {
                        v = req.params[item];
                    }
                    // 判断参数是否有误，有误则返回错误信息，无误则将信息返回                    
                    if (v != undefined && v != '' && v != null && v != "undefined" && v != "null") {
                        if (typeof v == element.type || Array.isArray(v)) {
                            switch (element.type) {
                                case 'string':
                                    if (v == ' ') {
                                        return res.json(new Code({
                                            code: 1002,
                                            msg: '参数有误,' + item + ',传入参数为空字符串',
                                        }).return);
                                    }
                                    break;
                                case 'object':
                                    if (element.dataMust) {
                                        if (JSON.stringify(v) == '{}') {
                                            return res.json(new Code({
                                                code: 1002,
                                                msg: '参数有误,' + item + ',传入参数为空对象',
                                            }).return);
                                        }
                                    }
                                    break;
                                case 'array':
                                    if (element.dataMust) {
                                        if (JSON.stringify(v) == '[]') {
                                            return res.json(new Code({
                                                code: 1002,
                                                msg: '参数有误,' + item + ',传入参数为空数组',
                                            }).return);
                                        }
                                    }
                                    break;
                            }
                            R[item] = v;
                            // 这里判断传递值可以是多种数据类型
                        } else if (element.typeList && Array.isArray(element.typeList) && element.typeList.length) {
                            let et = false;
                            element.typeList.forEach(i => {
                                if (i == 'String' || i == 'Object' || i == 'Number' || i == 'Boolean' || i == 'Array') {
                                    i = i.toLowerCase();
                                }
                                if (typeof v == i) {
                                    et = true;
                                }
                            });
                            if (et) {
                                // 类型强制转换
                                let sv = '';
                                switch (element.type) {
                                    case 'string':
                                        if (String(v) == 'null' || String(v) == 'undefined') {
                                            // throw new Error('参数强制转换string类型转换失败，获取值为 null or undefined');
                                            return res.json(new Code({
                                                code: 1002,
                                                msg: '参数有误,' + item + ',参数强制转换string类型转换失败,获取值为 null or undefined ' + v,
                                            }).return);
                                        } else {
                                            sv = String(v);
                                        }
                                        break;
                                    case 'object':
                                        if (v == '{}') {
                                            if (!ement.dataMust) {
                                                sv = JSON.parse(v);
                                            } else {
                                                return res.json(new Code({
                                                    code: 1002,
                                                    msg: '参数有误,' + item + ',不能为空对象',
                                                }).return);
                                            }
                                        } else if (QueryData.isJSON(v)) {
                                            if (typeof JSON.parse(v) == 'object') {
                                                sv = JSON.parse(v);
                                            } else {
                                                return res.json(new Code({
                                                    code: 1002,
                                                    msg: '参数有误,' + item + ',转换json数据类型不为object，数据类型为 ' + (typeof v),
                                                }).return);
                                            }
                                        } else {
                                            return res.json(new Code({
                                                code: 1002,
                                                msg: '参数有误,' + item + ',json转换失败，获取值为 ' + v,
                                            }).return);
                                        }
                                        break;
                                    case 'number':
                                        if (!isNaN(Number(v))) {
                                            sv = Number(v);
                                        } else {
                                            return res.json(new Code({
                                                code: 1002,
                                                msg: '参数有误,' + item + ',参数强制转换number类型转换失败，获取值为 ' + v,
                                            }).return);
                                        }
                                        break;
                                    case 'boolean':
                                        sv = Boolean(v);
                                        break;
                                    case 'array':
                                        if (QueryData.isJSON(v)) {
                                            if (Array.isArray(JSON.parse(v))) {
                                                sv = JSON.parse(v);
                                            } else {
                                                return res.json(new Code({
                                                    code: 1002,
                                                    msg: '参数有误,' + item + ',转换json数据类型不为array，数据类型为 ' + (typeof v),
                                                }).return);
                                            }
                                        } else {
                                            return res.json(new Code({
                                                code: 1002,
                                                msg: '参数有误,' + item + ',json转换失败，获取值为 ' + v,
                                            }).return);
                                        }
                                        break;
                                }
                                R[item] = sv;
                            } else {
                                let str = element.typeList.join("，");
                                str = str.substring(0, str.length);
                                return res.json(new Code({
                                    code: 1002,
                                    msg: '参数有误,' + item + ',数据格式：' + element.type + ',同时支持数据格式有：' + str,
                                }).return);
                            }
                        } else if (element.typeList && !Array.isArray(element.typeList)) {
                            throw new Error('getParam方法：' + item + '对象参数typeList有误，不是一个Array类型的值');
                            // return res.json(new Code({
                            //     code: Code.codeMap().SERVER_ERROR,
                            // }).return);
                        } else {
                            return res.json(new Code({
                                code: 1002,
                                msg: '参数有误,' + item + '传递值为' + v + ',类型为:' + (typeof v) + ',后端接收数据格式：' + element.type,
                            }).return);
                            t = false;
                            break;
                        }
                    } else if (element.must) {
                        return res.json(new Code({
                            code: 1002,
                            msg: '缺少参数,' + item + ',数据格式：' + element.type,
                        }).return);
                        t = false;
                        break;
                    } else {
                        v = undefined;
                        R[item] = v;
                    }
                    // 
                    if (element.keyList) {
                        if (typeof element.keyList == 'string') {
                            if (element.keyList == 'String' || element.keyList == 'Object' || element.keyList == 'Number' || element.keyList == 'Boolean' || element.keyList == 'Array') {
                                element.keyList = element.keyList.toLowerCase();
                            }
                            let arr = [];
                            R[item].forEach(i => {
                                if (typeof i != element.keyList) {
                                    switch (element.keyList) {
                                        case 'string':
                                            if (String(i) == 'null' || String(i) == 'undefined') {
                                                // throw new Error('参数强制转换string类型转换失败，获取值为 null or undefined');
                                                return res.json(new Code({
                                                    code: 1002,
                                                    msg: '参数有误,' + item + ',参数强制转换string类型转换失败,获取值为 null or undefined ' + i,
                                                }).return);
                                            } else {
                                                arr.push(String(i));
                                                arr.push();
                                            }
                                            break;
                                        case 'object':
                                            if (!QueryData.isJSON(i)) {
                                                if (typeof JSON.parse(i) == 'object') {
                                                    i = JSON.parse(i);
                                                } else {
                                                    return res.json(new Code({
                                                        code: 1002,
                                                        msg: '参数有误,' + item + ',转换json数据类型不为object，数据类型为 ' + (typeof i),
                                                    }).return);
                                                }
                                            } else {
                                                return res.json(new Code({
                                                    code: 1002,
                                                    msg: '参数有误,' + item + ',json转换失败，获取值为 ' + i,
                                                }).return);
                                            }
                                            break;
                                        case 'number':
                                            if (!isNaN(Number(i))) {
                                                arr.push(Number(i));
                                            } else {
                                                return res.json(new Code({
                                                    code: 1002,
                                                    msg: '参数有误,' + item + ',参数强制转换number类型转换失败，获取值为 ' + i,
                                                }).return);
                                            }
                                            break;
                                        case 'boolean':
                                            arr.push(Boolean(i));
                                            break;
                                        case 'array':
                                            if (!QueryData.isJSON(i)) {
                                                if (Array.isArray(i)) {
                                                    arr.push(JSON.parse(i));
                                                } else {
                                                    return res.json(new Code({
                                                        code: 1002,
                                                        msg: '参数有误,' + item + ',转换json数据类型不为array，数据类型 ' + i,
                                                    }).return);
                                                }
                                            } else {
                                                return res.json(new Code({
                                                    code: 1002,
                                                    msg: '参数有误,' + item + ',json转换失败，获取值为 ' + i,
                                                }).return);
                                            }
                                            break;
                                    }
                                }
                            })
                            R[item] = arr;
                        }
                        if (typeof element.keyList == 'object') {
                            req.body = R[item];
                            R[item] = QueryData.loopParam(element.keyList, req, res);
                            // QueryData.loopParam()
                        }
                    }
                } catch (error) {
                    console.error(error);
                    return res.json(new Code({
                        code: Code.codeMap().SERVER_ERROR,
                    }).return);
                    t = false;
                    break;
                }
            }
        }
        return R;

    }

    static isJSON(str, pass_object) {
        if (pass_object && isObject(str)) return true;

        // if (!isString(str)) return false;

        str = str.replace(/\s/g, '').replace(/\n|\r/, '');

        if (/^\{(.*?)\}$/.test(str))
            return /"(.*?)":(.*?)/g.test(str);

        if (/^\[(.*?)\]$/.test(str)) {
            return str.replace(/^\[/, '')
                .replace(/\]$/, '')
                .replace(/},{/g, '}\n{')
                .split(/\n/)
                .map(function (s) {
                    return isJSON(s);
                })
                .reduce(function (prev, curr) {
                    return !!curr;
                });
        }

        return false;
    }
}

module.exports = new QueryData();