const crypto = require('crypto');
//  
const key = "12345678" //秘钥必须为：8/16/32位
const hmac = crypto.createHmac('sha1', 'secret-key'); // Hmac算法

class Util {
    constructor(option) {
        // this.code = option.code;
    }
    encrypt(data) {
        //加密 可逆
        const cipher = crypto.createCipher('aes192', key);
        var crypted = cipher.update(data, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    }
    deciphering(data) {
        //解密 可逆
        const decipher = crypto.createDecipher('aes192', key);
        var decrypted = decipher.update(data, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    // 不可逆加密
    hmac(data) {
        hmac.update(data);
        return hmac.digest('hex');
    }
}

module.exports = new Util();