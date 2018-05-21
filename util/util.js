const crypto = require('crypto');
const key = "12345678" //秘钥必须为：8/16/32位
class Util {
    constructor() {

    }

    encryptId(id) {
        //加密
        return CryptoJS.AES.encrypt(id, CryptoJS.enc.Utf8.parse(key), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
    }
    decipheringId(id) {
        //解密
        return CryptoJS.AES.decrypt(id, CryptoJS.enc.Utf8.parse(key), {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
    }
}

module.exports = new Util();