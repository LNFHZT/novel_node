import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


/**
 * @class 用户实体
 * @param userId  用户id  primary
 * @param account  账号/手机号
 * @param passwd  密码
 * @param nicName  昵称
 * @param headerImg  头像
 * @param sex  性别 0 是女 1 是男
 * @param phone  手机号
 * @param birthday  出生年月
 * @param createTime  创建时间
 * @param updateTime  更新时间
 * @param bookMoney  书币
 * @param bookMoney  书豆
 * @param lv  等级
 * @param idType  身份默认普通用户0 ，1是非普通用户
 * @param state  状态
 * 
 */

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column()
  account: string;
  @Column()
  passwd: string;
  @Column()
  nicName: number;
  @Column()
  headerImg: string;
  @Column()
  sex: number;
  @Column()
  phone: string;
  @Column({ type: "bigint",  unique: true })
  birthday: number;
  @Column()
  createTime: number;
  @Column()
  updateTime: number;
  @Column()
  bookMoney: number;
  @Column()
  bookBean: number;
  @Column()
  lv: number;
  @Column()
  idType: number;
  @Column()
  state: number;
}