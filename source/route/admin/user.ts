import express from 'express';
import { getOrdinaryUserList, registerAdminUser, singleCheckUser, deleteUser, updateUser } from '../../dao/userIMP';
import User from '../../entity/user';
import Code from '../../util/code';
import Page from '../../util/page';
const router = express.Router();


/**
 * @description /admin/check/user/get/info/list
 * 获取所有普通用户
 */
router.get('/get/info/list', async (req: any, res: any) => {
    let { page } = req.body;
    let data = await getOrdinaryUserList(page);
    res.json(new Code({
        data: new Page({
            ...page,
            data
        }),
    }))
})

/**
 * @description 删除用户
 */
router.delete('/delete/user/:userId', async (req: any, res: any) => {
    let { userId } = req.body;
    let data = await deleteUser(userId);
    res.json(new Code({
        data: data,
    }))
})

/**
 * @description 更新用户数据 / 修改
 */
router.put('/update/:userId', async (req: any, res: any) => {
    let { userId, update } = req.body;
    update.updateTime = new Date().getTime();
    let data = await updateUser(userId, update)
    res.json(new Code({
        data,
    }))
})

/**
 * @description /admin/check/user/get/info/:userId 单查用户 
 * 
 */
router.get('/get/info/:userId', async (req: any, res: any) => {
    let { userId } = req.body;
    let data = await singleCheckUser({ userId: userId })
    res.json(new Code({
        data,
    }))
})

/**
 * @description /admin/check/user/register
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
        res.json(new Code({
            code: 2002
        }))
        return;
    }
    try {
        await registerAdminUser(user);
    } catch (error) {
        throw error;
    }
    res.json(new Code({}))
})


export default router