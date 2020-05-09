import { createHmac, createCipher, createDecipher } from 'crypto';
//  
const key = "12345678" //秘钥必须为：8/16/32位
const hmac = createHmac('sha1', 'secret-key'); // Hmac算法

class Util {
    constructor() {
        // this.code = option.code;
    }
    encrypt(data: any) {
        //加密 可逆
        const cipher = createCipher('aes192', key);
        var crypted = cipher.update(data, 'utf8', 'hex');
        try {
            typeof data == 'string' ? data : String(data);
            crypted += cipher.final('hex');
        } catch (error) {
            console.error(error);
            return data;
        }
        return crypted;
    }
    deciphering(data: any) {
        //解密 可逆
        const decipher = createDecipher('aes192', key);
        var decrypted = decipher.update(data, 'hex', 'utf8');
        try {
            typeof data == 'string' ? data : String(data);
            decrypted += decipher.final('utf8');
        } catch (error) {
            console.error(error);
            return data;
        }
        return decrypted;
    }
    // 不可逆加密
    hmac(data: any) {
        hmac.update(data);
        return hmac.digest('hex');
    }
    getIPAddress() {
        var interfaces = require('os').networkInterfaces();
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
    }
}

export default new Util();