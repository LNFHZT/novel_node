const config = require('./config/config');
const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const Code = require('./util/code');
const bodyParser = require('body-parser');
// app.use(express.static("webapp"));
app.use(express.static(path.join(__dirname, 'webapp')));
//  解析前端穿过来的数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 30, // 设置 session 的有效时间，单位毫秒
    },
}));

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*')
    res.header("Access-Control-Allow-Credentials", true) // 携带cookie
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    if (req.method == "OPTIONS") {
        res.send(200) // 让options请求快速返回
    } else {
        next()
    }
})

// 所有带
app.all(/\/check\//, (req, res, next) => {
    console.log('检查是否登入');
    if (!req.session.user) {
        return res.json(new Code({
            code: 2001
        }).return)
    }
    next()
})

config.routeConfig.forEach(item => {
    app.use(item.apititle, item.routeExample);
});

/**
 * 错误处理机制
 */
app.use((err, req, res, next) => {
    res.status(200)
    res.json(new Code({
        code: Code.codeMap().SERVER_ERROR,
    }).return)
    throw new Error(err);
})
app.listen(config.listen || 8000);