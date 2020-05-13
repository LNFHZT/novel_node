import config from './config/config';
import express from 'express';
import session from 'express-session';
import path from 'path';
import Code from './util/code';
import { json, urlencoded } from 'body-parser';
import util from './util/util';
import Token from './util/token';
import conn from './dbc';


// 接口请求数据库，要在建立连接后  建立连接 和启动项目都是异步进行的
conn.init();
const app = express();
app.use(express.static(path.join(`${__dirname}/..`, 'webapp')));
//  解析前端穿过来的数据
app.use(json());
app.use(urlencoded({
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



app.all('*', (req: any, res: any, next: any) => {
    res.header("Access-Control-Allow-Origisn", '*')
    res.header("Access-Control-Allow-Credentials", true) // 携带cookie
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    if (req.method == "OPTIONS") {
        res.status(200); // 让options请求快速返回
    }
    next();
    //  404 处理
    // let t = true;
    // config.routeConfig.forEach(item => {
    //     item.routeExample.stack.forEach(items => {
    //         let route = `${item.apititle}${items.route.path}`;
    //         if (route.includes(':')) {
    //         } else if (req.path == route) {
    //             t = false;
    //             next();
    //         }
    //     })
    // });
    // if (t) {
    //     res.status(200);
    //     return res.json(new Code({
    //         code: 1003,
    //         data: {
    //             errApi: req.path
    //         }
    //     }).return)
    // }
})



// 所有带
app.all(/\/check\//, async (req: any, res: any, next: any) => {
    console.log('*------------------');
    try {
        await Token.check(req.token);
        next();
    } catch (error) {
        res.json({
            tip: "登录态已失效，请重新登录"
        })
        return;
    }
})


config.routers.forEach(item => {
    app.use(item.api, item.route);
});

/**
 * 错误处理机制
 */
app.use((err: any, req: any, res: any, next: any) => {
    console.log('错误处理机制触发');
    res.status(200)
    res.json(new Code({
        code: Code.codeMap().SERVER_ERROR,
    }).return)
    throw new Error(err);
})



const LOCAL_IP = util.getIPAddress();
console.log('-----------------start---------------');
console.log(`http://${LOCAL_IP}:${config.listen || 8000}`);
console.log(`http://localhost:${config.listen || 8000}`);
app.listen(config.listen || 8000);
