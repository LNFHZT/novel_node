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
     * @param {Boolean} -obj [需要获取的参数名].must true/false, 是否是必须获取的
     * @param {Object} req request
     * @param {Object} res response
     * @example getParam({name:{type:'String',must:true}},req,res) 
     * @returns 正确的参数列表
     */
    getParam(obj, req, res) {
        let R = {};
        for (const item in obj) {
            if (object.hasOwnProperty(item)) {
                let element = obj[item];
                let v = undefined;
                try {
                    if (!element.type) {
                        element.type = 'String';
                    }
                    if (element.type == 'String' || element.type == 'Object' || element.type == 'Number' || element.type == 'Boolean' || element.type == 'Array') {
                        element.type = element.type.toLowerCase();
                    } else {
                        throw new Error('getParam方法' + item + '传递参数类型错误传递类型为' + element.type);
                        return;
                    }
                    //  获取参数
                    if (req.body[item]) {
                        v = req.body[item];
                    } else if (req.query[item]) {
                        v = req.query[item];
                    } else if (req.params[item]) {
                        v = req.params[item];
                    }
                    // 判断参数是否有误，有误则返回错误信息，无误则将信息返回
                    if (v != undefined && v != '' && v != null && v != "undefined" && v != "null") {
                        if (typeof v == element.type) {
                            r[item] = v;
                        } else {
                            res.json(new Code({
                                code: 1001,
                                data: {
                                    resultset: result,
                                },
                                msg: '参数有误,' + item + ',数据格式：' + element.type,
                            }).return);
                            return;
                        }
                    } else if (element.must) {
                        res.json(new Code({
                            code: 1001,
                            data: {
                                resultset: result,
                            },
                            msg: '参数有误,' + item + ',数据格式：' + element.type,
                        }).return);
                        return;
                    } else {
                        v = undefined;
                        r[item] = v;
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }

        return R;
    }
}

module.exports = new AueryData();