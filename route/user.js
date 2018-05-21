const express = require('express');
const userIMP = require('../model/userIMP');
const Code = require('../util/code');
const AueryData = require('../util/aueryData');
const Util = require('../util/util');
let router = express.Router();
//  /api/user

/**
 * 
 * @url /check/get/all/user
 */
router.get('/check/get/all/user', (req, res, next) => {
    userIMP.queryUserAll()
        .then((result) => {
            res.json(new Code({
                code: Code.codeMap().OK,
                data: {
                    resultset: result,
                }
            }).return)
        })
        .catch((err) => {

        });
});
/**
 * @param account <String> 账号
 * @param password <String> 账号 
 * @url /login
 */
router.post('/login', (req, res, next) => {
    AueryData.getParam({
            account: {
                type: 'String',
                must: true,
            },
            password: {
                type: 'String',
                must: true,
            },
        }, req, res)
        .then((data) => {
            return userIMP.loginCheck(data.account, data.password)
        })
        .then(data => {
            req.session.user = {
                userId: Util.encryptId(data.userId),
            }
            res.json(new Code({
                code: Code.codeMap().OK,
                data: {
                    data: data,
                },
                msg: '登入成功',
            }).return)
        })
        .catch(data => {
            res.json(data);
        })

});

router.post('/ordinary/regist', (req, res, next) => {
    AueryData.getParam({
        account: {
            type: 'String',
            must: true,
        },
        password: {
            type: 'String',
            must: true,
        },
    }, req, res)
})
module.exports = router;