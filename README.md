## 小说管理系统

### 项目说明
因为项目连接数据是使用 typeORM 所以需要创建 连接数据的配置文件 ormconfig.json
```
{
    "type": "mysql",
    "host": "地址",
    "port": 3306,
    "username": "账号",
    "password": "密码",
    "database": "数据库",
    "logging": true,
    "entities": ["source/model/*.ts"]
}
``` 
