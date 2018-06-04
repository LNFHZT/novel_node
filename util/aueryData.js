const Code = require('./code');
class AueryData {
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
     * @param {Array} -obj [需要获取的参数名].typeList 获取参数类型 默认String  可选"String"/'Object'/'Number'/'Boolean'/'Array'
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
            R = AueryData.loopParam(obj, req, res);
            if (t) {
                resolve(R);
            }
        })
    }

    static loopParam(obj, req, res) {
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
                        throw new Error('getParam方法：' + item + '传递参数类型错误传递类型为' + element.type);
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
                        if (typeof v == element.type) {
                            R[item] = v;
                            // 这里判断传递值可以是多种数据类型
                        } else if (element.typeList && typeof element.typeList == 'array' && element.typeList.length) {
                            let et = false;
                            element.typeList.forEach(i => {
                                if (typeof v == i) {
                                    et = true;
                                }
                            });
                            if (et) {
                                R[item] = v;
                            } else {
                                let str = element.typeList.join("，");
                                str = str.substring(0, str.length - 1);
                                return res.json(new Code({
                                    code: 1001,
                                    msg: '参数有误,' + item + ',数据格式：' + element.type + ',同时支持数据格式有：' + str,
                                }).return);
                            }
                        } else if (typeof element.typeList != 'array') {
                            throw new Error('getParam方法：' + item + '对象参数typeList有误，不是一个Array类型的值');
                            return res.json(new Code({
                                code: Code.codeMap().SERVER_ERROR,
                            }).return);
                        } else {
                            return res.json(new Code({
                                code: 1001,
                                msg: '参数有误,' + item + '传递值为' + v + ',后端接收数据格式：' + element.type,
                            }).return);
                            t = false;
                            break;
                        }
                    } else if (element.must) {
                        return res.json(new Code({
                            code: 1001,
                            msg: '缺少参数,' + item + ',数据格式：' + element.type,
                        }).return);
                        t = false;
                        break;
                    } else {
                        v = undefined;
                        R[item] = v;
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
    }
}

module.exports = new AueryData();