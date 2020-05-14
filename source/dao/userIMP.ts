import { getConnection, getRepository } from "typeorm";
import User from "../entity/user";

/**
 * @description 获取所有普通用户
 */
export const getOrdinaryUserList = (page = { pageSize: 10, pageNo: 0 }) => {
    console.log(page);
    return getRepository(User).find({
        select: ["userId", "account", "nicName", "headerImg",
            "sex", "phone", "birthday", "createTime",
            "bookMoney", "bookBean", "lv", "idType",
            "state"],
        where: { idType: 0 },
        skip: page.pageNo,
        take: page.pageSize
    });
}

/**
 * @description 单查用户
 */
export const singleCheckUser = (where: object) => {
    return getRepository(User).find({
        where: where
    });
}

/**
 * @description 创建管理人员账号 
 * @param data User 类型对象 
 * 
 */
export const registerAdminUser = async (data: User) => {
    let userRepository = getRepository(User);
    let user = userRepository.create();
    user = data;
    return userRepository.save(user)
}  