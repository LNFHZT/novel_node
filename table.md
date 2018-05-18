tables
===

user 用户表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| id   |
| userId |
| account |
| passwd |
| nicName |
| headerImg|
| sex |
| phone|
| birthday|
| createTime|
| bookMoney |
| bookBean |
| lv |
| state|

book 书籍表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| id |
| bookId |
| bookName |
| bookImg |
| introduce |
| bookCopyright |
| click |
| authorId |
| createTime |
| state |

article 文章表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| id |
| articleId |
| articleTitle |
| articleContent |
| articleIndex |
| createTime |
| bookId |
| state |

author 作者表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| id |
| authorId |
| authorName |
| state |

b_type 分类表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| id |
| bTypeId |
| typeName |
| fTypeId |
| createTime |
| lv |
| state |

book_type 分类书籍中间表
-
| 字段        | 类型    |  是否为空  |  注释  |
| --------   | -----:   | :----: |:----: |
| id |
| btId |
| bookId |
| bTypeId |

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
| id | 
| bookId |
| userId |
| commentId |
| comment |
| createTime |
| praise | ind | true | 点赞
| useful | int | true | 有用
| useless | int | true | 没有用
| fcommentId |
| lv |

comment_record 评论记录
-
| 字段        | 类型    |  是否为空 |  注释  |
| --------   | -----:   | :----: |:----: |
| id |
| userId |
| commentId |
| record_Type | int | true | 记录类型 0 是有用 1是没有用 3是点赞 4

book_shelf 书架
-
| 字段        | 类型    |  是否为空 |  注释  |
| --------   | -----:   | :----: |:----: |
| id |
| userId |
| bookShelfId |

book_shelf_book 书架书籍中间表
-
| 字段        | 类型    |  是否为空 |  注释  |
| --------   | -----:   | :----: |:----: |
| id |
| bbId|
| bookShelfId|
| bookId |
| createTimer |
| state |

read_book_records 看书浏览记录
-
| 字段        | 类型    |  是否为空 |  注释  |
| --------   | -----:   | :----: |:----: |
| id |
| rbrId |
| bookId |
| createTime |
| state |


