export default {
    SERVER_ERROR: 1000,
    DATABASE_ERROR: 1001,
    OK: 0,
    map: {
        0: {
            code: 0,
            msg: "OK",
            success: true,
        },
        1000: {
            code: 1000,
            msg: "服务器错误",
            success: false,
        },
        1001: {
            code: 1001,
            msg: "数据库错误",
            success: false,
        },
        1002: {
            code: 1002,
            msg: "参数错误",
            success: false,
        },
        1003: {
            code: 1003,
            msg: "404 未定义此接口",
            success: false,
        },
        // 业务错误
        2000: {
            code: 2000,
            msg: "登入失败，账号或密码错误",
            success: false,
        },
        2001: {
            code: 2001,
            msg: "session过期，请重新登入",
            success: false,
        },
        2002: {
            code: 2002,
            msg: "用户名已被注册",
            success: false,
        }
    }
}