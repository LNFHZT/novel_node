const express = require('express');
let router = express.Router();
//  /test/route/test
router.post('/check/test', (req, res, next) => {
    res.json({
        code: 0,
    })
})

module.exports = router;