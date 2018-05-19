const express = require('express');
const userIMP = require('../model/userIMP');
const Code = require('../util/code');
const AueryData = require('../util/aueryData');
let router = express.Router();
//  /api/user

/**
 * 
 * @url /a
 */
router.get('/a', (req, res, next) => {
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
    let param = AueryData.getParam({
        account: {
            type: 'String',
            must: true,
        },
        password: {
            type: 'String',
            must: true,
        },
    }, req, res);
    userIMP.loginCheck(account, password)
        .then( data =>{
            
        })
        
});
module.exports = router;