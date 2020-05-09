import { getConnection, getRepository } from "typeorm";
import user from "../model/user";

export function UsersListAction() {
    return getRepository(user).find();
}