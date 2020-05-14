import express from 'express';
import { getOrdinaryUserList, registerAdminUser, singleCheckUser } from '../../dao/userIMP';
import User from '../../entity/user';
const router = express.Router();


/**
 * @description /admin/user/get/info/list
 * 获取所有普通用户
 */
router.get('/get/info/list', async (req: any, res: any) => {
    let { page } = req.body;
    console.log(page);
    let data = await getOrdinaryUserList(page);
    res.json({
        data: data,
    })
})

/**
 * @description /admin/user/register
 * 注册管理系统用户
 */
router.post('/register', async (req: any, res: any, next: any) => {
    let { account, passwd, sex, birthday, phone, nicName } = req.body;
    let user = new User();
    user.account = account;
    user.passwd = passwd;
    user.sex = sex;
    user.birthday = parseInt(birthday);
    user.createTime = new Date().getTime();
    user.updateTime = new Date().getTime();
    user.phone = phone;
    user.nicName = nicName || 'test';
    let list = await singleCheckUser({ account: user.account });
    if (list.length) {
        res.json({
            tips: "用户名已被注册",
        })
        return;
    }
    try {
        await registerAdminUser(user);
    } catch (error) {
        throw error;
    }
    res.json({
        data: {},
    })
})
export default router