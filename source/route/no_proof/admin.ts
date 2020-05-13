import express from 'express';
import { singleCheckUser } from '../../dao/userIMP';
import Token from '../../util/token';

const router = express.Router();


router.post('/login', async (req: any, res: any, next: any) => {
    let { account, passwd } = req.body;
    let list = await singleCheckUser({ account, passwd })
    if (list.length) {
        try {
            let token = await Token.getToken(JSON.parse(JSON.stringify(list[0])));
            res.json({
                data: {
                    token: token
                }
            })
        } catch (error) {
            throw error;
        }
    } else {
        res.json({
            tip: "账号或密码错误"
        })
    }
})
export default router