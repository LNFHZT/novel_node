const codeMap = {
    SERVER_ERROR: 1000,
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
            msg: "参数错误",
            success: false,
        }
    }
}
module.exports = codeMap