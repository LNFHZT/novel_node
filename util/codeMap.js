const codeMap = {
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
            code: 1001,
            msg: "参数错误",
            success: false,
        },

        // 业务错误
        2000: {
            code: 2000,
            msg: "登入失败，账号或密码为空",
            success: false,
        }
    }
}
module.exports = codeMap