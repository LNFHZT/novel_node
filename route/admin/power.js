const express = require('express');
const Code = require('../../util/code');
const QueryData = require('../../util/queryData');
const Util = require('../../util/util');
let router = express.Router();


router.get('/check/getPage', (req, res, next) => {
    let userId = req.session.user.userId;
})

module.exports = router;