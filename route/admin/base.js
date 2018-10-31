const express = require('express');
const userIMP = require('../../model/userIMP');
const Code = require('../../util/code');
const QueryData = require('../../util/queryData');
const Util = require('../../util/util');
const router = express.Router();

// /admin/base
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
            req.session.sign = true;
            req.session.user = {
                userId: data.userId,
            }
            if (data.userId) {
                data.userId = Util.encrypt(data.userId);
            }
            res.json(new Code({
                code: Code.codeMap().OK,
                data: {
                    data: data,
                },
            }).return)
        })
        .catch(data => {
            console.error(data);
            if (!data.code) {
                data = new Code({
                    code: 1000
                }).return
            }
            if (JSON.stringify(data) == '[]') {
                data = new Code({
                    code: 2000
                }).return
            } else {
                data = new Code({
                    code: 1000
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