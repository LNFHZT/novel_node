const crypto = require('crypto');
const key = "12345678" //秘钥必须为：8/16/32位
class Util {
    constructor() {

    }

    encryptId(id) {
        //加密
        let str;
        try {
            str = crypto.AES.encrypt(id, CryptoJS.enc.Utf8.parse(key), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
        } catch (error) {
            console.error(error);
            return id;
        }
        return str
    }
    decipheringId(id) {
        //解密
        let str;
        try {
            str = crypto.AES.decrypt(id, CryptoJS.enc.Utf8.parse(key), {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
        } catch (error) {
            console.error(error);
            return id;
        }
        return str
    }
}

module.exports = new Util();