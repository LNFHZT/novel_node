import { getConnection, getRepository } from "typeorm";
import User from "../model/user";

/**
 * @description 获取所有普通用户
 */
export const getOrdinaryUserList = () => {
    return getRepository(User).find({
        select: ["userId", "account", "nicName", "headerImg",
            "sex", "phone", "birthday", "createTime",
            "bookMoney", "bookBean", "lv", "idType",
            "state"]
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