import jsonwebtoken from 'jsonwebtoken';

/**
 * @class 用户标识类
 * @description 实现用户token 创建 和 校验
 */
class Token {
    sign: string
    constructor(sign: string) {
        this.sign = sign;
    }
    getToken(data: object) {
        return new Promise((resolve, reject) => {
            jsonwebtoken.sign(data, this.sign, { expiresIn: '1day' }, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            })
        });
    }
    check(token: any) {
        return new Promise((resolve, reject) => {
            jsonwebtoken.verify(token, this.sign, (err: any, authData: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

    }
}

export default new Token('token');