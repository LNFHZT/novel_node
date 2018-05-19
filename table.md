tables
===

user 用户表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| userId | int | true | 用户id  primary |
| account | varchar 20| true | 账号/手机号 |
| passwd | varchar 20| true | 密码 |
| nicName | varchar 22| true | 昵称 |
| headerImg| varchar 50 | true | 头像 |
| sex | int 1 | false | 性别 0 是女 1 是男 |
| phone| char 11 | true | 手机号 |
| birthday| int | false | 出生年月 |
| createTime| int | true | 创建时间 |
| bookMoney | double | true | 书币 |
| bookBean | double | true | 书豆 |
| lv | int | true | 等级 |
| state| int | true | 状态 |

book 书籍表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| bookId | int | true | 书本id primary |
| bookName | varchar 40 | true | 书名 |
| bookImg | varchar 50 | true | 书头像 |
| introduce | text | false | 书介绍 |
| bookCopyright | varchar 50 | false | 版权 |
| click | int | true | 人气/点击数 |
| authorId | int | true | 作者id |
| createTime | int | true | 创建时间 |
| state | int | true | 状态 0 审核 1 上架 2 是下架 |

article 文章表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| articleId | int | true | 章节ID primary |
| articleTitle | varchar 100 | true | 章节标题 |
| articleContent | text | true | 文章内容 |
| articleIndex | int | true | 第几章 |
| createTime | int | true | 创建时间 |
| bookId | int | true | 书id |
| state | int | true | 状态 0是和谐 1 正常 |

author 作者表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| authorId | int | true | 作者id  primary | 
| authorName | varchar 40 | true | 作者名 |
| state | int | true | 状态 0是正常 1 是 |

b_type 分类表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| bTypeId | int | true | 分类id  primary |
| typeName | varchar 20 | true | 分类名称 |
| fTypeId | int | false | 父级分类id |
| createTime | int | true | 创建时间 |
| lv | int | true | 分级 |
| state | int | true | 状态 0 是正常 1 是取消的分类 |

book_type 分类书籍中间表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| btId | int | true | 中间表id primary |
| bookId | int | true | 书id |
| bTypeId | int | true | 分类id |

rule 规则表 (待定)
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| hotBorder | int | false | 热门边界 |
| newBook | int | false | 多少天内算新书 |

b_comment 评论表
-
| 字段        | 类型    |  是否为空 |  注释  |
| --------   | -----:   | :----: |:----: |
| commentId | int | true | 评论id  primary|
| bookId | int | true | 书id |
| userId | int | true | 用户id |
| commentContent | text | true | 评论内容 |
| fcommentId | int | false | 父级评论id |
| lv | int | true | 评论级别 1级评论  2级评论|
| createTime | int | true | 创建时间 |
| state | int | true | 状态 0是正常 1是和谐 |

comment_record 评论记录
-
| 字段        | 类型    |  是否为空 |  注释  |
| --------   | -----:   | :----: |:----: |
| cRecordId | int | true | 记录id |
| userId | int | true | 用户id primary | 
| commentId | int | true | 评论id |
| recordType | int | true | 记录类型 0 是有用 1是没有用 3是点赞 4 |


book_shelf_records 书架书籍记录表
-
| 字段        | 类型    |  是否为空 |  注释  |
| --------   | -----:   | :----: |:----: |
| bsRecordsId| int | true | 中间表id  primary|
| userId | int | true | 用户id 书架就是用户id |
| bookId | int | true | 书本id |
| createTime | int | true | 创建时间 |
| state | int | true | 状态 0是正常 1是取消书架 |

read_book_records 看书浏览记录
-
| 字段        | 类型    |  是否为空 |  注释  |
| --------   | -----:   | :----: |:----: |
| rbrId | int | true | 浏览记录id  primary|
| bookId | int | true | 书本id |
| articleId | int | true | 文章id 历史浏览记录 |
| updateTime | int | true | 更新时间 |
| createTime | int | true | 创建时间 |
| state | int | true | 状态 |

vip  vip表
-
| 字段        | 类型    |  是否为空 |  注释  |
| --------   | -----:   | :----: |:----: |
| vipId | int | true | vipId primary|
| userId | int | true | 用户id |
| experience | int | true | 经验 |
| lv | int | true | 等级 默认0 vip1 vip2 |
| endTimer | int | true | 结束时间 |
| updataTime | int | 更新时间 |
| createTime | int | 创建时间 |
| state | int | true | 状态 默认0失效，1激活状态 | 

recharge_records 充值记录表
-
| 字段        | 类型    |  是否为空 |  注释  |
| --------   | -----:   | :----: |:----: |
| rechargeId | int | true | 充值记录id |
| userId | int | true | 用户id |
| money | double | ture | 金额 | 
| type | int | true | 充值类型 1 是书币 2 是书豆 3 是vip |
| describe | varchar(100) | false | 记录描述（失败描述） |
| createTime | int | true | 创建时间 |
| state | int | true | 状态 0 成功 1 是失败 3是退款 4退款失败 |

