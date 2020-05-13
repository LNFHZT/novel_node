## 小说管理系统

### 项目结构
```
novel_node
 ┣ doc              文档目录 里面放置了sql 文件和 表设计
 ┃ ┣ novel.sql
 ┃ ┗ table.md
 ┣ source           源码文件 开发的代码
 ┃ ┣ config         配置目录 配置路由
 ┃ ┃ ┗ config.ts
 ┃ ┣ dao            实现数据的dao
 ┃ ┃ ┗ userIMP.ts
 ┃ ┣ dbc            连接数据库
 ┃ ┃ ┗ index.ts
 ┃ ┣ model          model 层
 ┃ ┃ ┗ user.ts
 ┃ ┣ route          路由文件夹
 ┃ ┃ ┣ admin
 ┃ ┃ ┃ ┗ user.ts
 ┃ ┃ ┣ common
 ┃ ┃ ┃ ┗ common.ts
 ┃ ┃ ┣ no_proof
 ┃ ┃ ┃ ┗ admin.ts
 ┃ ┃ ┗ test
 ┃ ┃ ┃ ┗ test.js
 ┃ ┣ util           工具类
 ┃ ┃ ┣ code.ts
 ┃ ┃ ┣ codeMap.ts
 ┃ ┃ ┣ token.ts
 ┃ ┃ ┗ util.ts
 ┃ ┗ app.ts         主入口文件
 ┣ webapp           静态资源目录
 ┃ ┗ index.html
 ┣ .gitignore       git配置文件
 ┣ ormconfig.json   typeorm 配置文件
 ┣ package.json     依赖
 ┣ README.md
 ┗ tsconfig.json    ts配置文件
```

### 项目运行
```
<!-- 安装依赖 -->
npm i 
<!-- 或者 -->
cnpm i

<!-- 项目运行 -->
npm run serve 

```

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
