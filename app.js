const express = require('express');
const path = require('path');
const app = express();
const Code = require('./util/code')
let config = require('./config')

// app.use(express.static("webapp"));
app.use(express.static(path.join(__dirname, 'webapp')));
// app.use('/', express.static(path.join(__dirname, '/webapp/app')));

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


// app.get('/webapp', (req, res) => {
//     // res.redirect('http://localhost:3000/webapp/admin');
//     res.send('hello word')
// })

config.routeConfig.forEach(item => {
    app.use(item.apititle, item.routeExample);
});
/**
 * 错误处理机制
 */
app.use((err, req, res, next) => {
    throw new Error(err);
    res.status(200)
    res.json(new Code({
        code: Code.codeMap().SERVER_ERROR,
    }).return)
})
app.listen(config.listen || 8000);