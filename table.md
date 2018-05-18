tables
===

user 用户表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| id   | int | true | 编号 primary |
| userId | varchar 15| true | 用户id |
| account | varchar 20| true | 账号/手机号 |
| passwd | varchar 20| true | 密码 |
| nicName | varchar 22| true | 昵称 |
| headerImg| varchar 50 | true | 头像 |
| sex | bit | false | 性别 0 是女 1 是男 |
| phone| char 11 | true | 手机号 |
| birthday| time | false | 出生年月 |
| createTime| time | true | 创建时间 |
| bookMoney | int | true | 书币 |
| bookBean | int | true | 书豆 |
| lv | int | true | 等级 |
| vip | int | true | vip 默认0 vip1 vip2 |
| vipId | varchar 15 | false | vip id |
| state| int | true | 状态 |

book 书籍表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| id | int | true | 编号 primary |
| bookId | varchar 15 | true | 书本id |
| bookName | varchar 40 | true | 书名 |
| bookImg | varchar 50 | true | 书头像 |
| introduce | text | false | 书介绍 |
| bookCopyright | varchar 50 | false | 版权 |
| click | int | true | 人气/点击数 |
| authorId | varchar 15 | true | 作者id |
| createTime | time | true | 创建时间 |
| state | int | true | 状态 0 下架 1 上架 |

article 文章表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| id | int | true | 编号 primary |
| articleId | varchar 15 | true | 章节ID |
| articleTitle | varchar 100 | true | 章节标题 |
| articleContent | text | true | 文章内容 |
| articleIndex | int | true | 第几章 |
| createTime | time | true | 创建时间 |
| bookId | varchar 15 | true | 书id |
| state | int | true | 状态 0是和谐 1 正常 |

author 作者表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| id | int | true | 编号 primary |
| authorId | varchar 15 | true | 作者id |
| authorName | varchar 40 | true | 作者名 |
| state | int | true | 状态 0是正常 1 是

b_type 分类表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| id | int | true | 编号 primary |
| bTypeId | varchar 15 | true | 分类id |
| typeName | varchar 10 | true | 分类名称 |
| fTypeId | varchar 15 | false | 父级分类id |
| createTime | time | true | 创建时间 |
| lv | int | true | 分级 |
| state | int | true | 状态 0 是正常 1 是取消的分类 |

book_type 分类书籍中间表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| id | int | true | 编号 primary |
| btId | varchar 15 | true | 中间表id |
| bookId | varchar 15 | true | 书id |
| bTypeId | varchar 15 | true | 分类id |

rule 规则表 (待定)
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| hotBorder | int | false | 热门边界
| newBook | int | false | 多少天内算新书

comment 评论表
-
| 字段        | 类型    |  是否为空 |  注释  |
| --------   | -----:   | :----: |:----: |
| id | int | true | 编号 primary | 
| bookId | varchar 15 | true | 书id |
| userId | varchar 15 | true | 用户id |
| commentId | varchar 15 | true | 评论id |
| comment | text | true | 评论内容 |
| createTime | time | true | 创建时间 | 
| praise | ind | true | 点赞
| useful | int | true | 有用
| useless | int | true | 没有用
| fcommentId | varcahr 15 | false | 父级评论id |
| lv | int | true | 评论级别 1级评论  2级评论|
| state | int | true | 状态 0是正常 1是和谐 |

comment_record 评论记录
-
| 字段        | 类型    |  是否为空 |  注释  |
| --------   | -----:   | :----: |:----: |
| id | int | true | 编号 primary |
| userId | varchar 15 | true | 用户id | 
| commentId | varchar 15 | true | 
| record_Type | int | true | 记录类型 0 是有用 1是没有用 3是点赞 4

book_shelf 书架
-
| 字段        | 类型    |  是否为空 |  注释  |
| --------   | -----:   | :----: |:----: |
| id | int | true | 编号 primary |
| userId | varchar 15 | true | 用户id |
| bookShelfId | varchar 15 | true | 书架id |

book_shelf_book 书架书籍中间表
-
| 字段        | 类型    |  是否为空 |  注释  |
| --------   | -----:   | :----: |:----: |
| id | int | true | 编号 primary |
| bbId| varchar 15 | true | 中间表id |
| bookShelfId| varchar 15 | true | 书架id |
| bookId | varchar 15 | true | 书本id |
| createTimer | time | true | 创建时间 |
| state | int | true | 状态 0是正常 1是取消书架 |

read_book_records 看书浏览记录
-
| 字段        | 类型    |  是否为空 |  注释  |
| --------   | -----:   | :----: |:----: |
| id | int | true | 编号 primary |
| rbrId | varchar 15 | true | 浏览记录id |
| bookId | varchar 15 | true | 书本id |
| updateTime | varchar 15 | true | 更新时间 |
| createTime | varchar 15 | true | 创建时间 |
| state | int | true | 状态 |


