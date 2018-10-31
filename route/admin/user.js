const express = require('express');
let router = express.Router();
//  /admin/user/

/**
 * 获取所有用户数据
 */
router.get('/check/get/user/list', (req, res, next) => {
    res.json({
        code: 0,
    })
})

/**
 * 查询单条用户数据
 */
router.get('/check/get/user/:userid', (req, res, next) => {
    res.json({
        code: 0,
    })
})


module.exports = router;