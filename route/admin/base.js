const express = require('express');
const userIMP = require('../../model/userIMP');
const Code = require('../../util/code');
const QueryData = require('../../util/queryData');
const Util = require('../../util/util');
let router = express.Router();

// /api/admin/base
router.post('/login', (req, res, next) => {
    QueryData.getParam({
            account: {
                type: 'String',
                must: true,
            },
            passwd: {
                type: 'String',
                must: true,
            },
        }, req, res)
        .then((data) => {
            return userIMP.adminLoginCheck(data.account, data.passwd)
        })
        .then(data => {
            // if (data.userId) {
            //     data.userId = Util.encryptId(data.userId);
            // }
            req.session.sign = true;
            req.session.user = {
                userId: data.userId,
            }
            res.json(new Code({
                code: Code.codeMap().OK,
                data: {
                    data: data,
                },
            }).return)
        })
        .catch(data => {
            if (JSON.stringify(data) == '[]') {
                data = new Code({
                    code: 2000
                }).return
            }
            res.json(data);
        })
})

router.post('/regist', (req, res, next) => {
    QueryData.getParam({
            account: {
                type: 'String',
                must: true,
            },
            passwd: {
                type: 'String',
                must: true,
            },
            nicName: {
                type: 'String',
                must: false,
            }
        }, req, res)
        .then((data) => {
            let arr = [];
            if (!data.nicName) {
                data.nicName = 'ADMIN'
            }
            let timer = new Date().getTime();
            data.createTime = timer;
            data.updateTime = timer;
            return userIMP.regist(data)
        })
        .then(data => {
            console.log(data);
            if (!data.insertId) {
                res.json(new Code({
                    code: Code.codeMap().OK,
                }).return)
            } else {
                res.json(new Code({
                    code: 1001,
                    msg: '数据库插入失败'
                }).return)
            }
        })
        .catch(data => {
            res.json(data);
        })
})

module.exports = router;