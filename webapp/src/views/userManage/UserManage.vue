<template>
  <div id="userManage">
    <el-table
      ref="multipleTable"
      :data="tableList"
      height="100%"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        type="selection" >
      </el-table-column>
      <el-table-column
        prop="nicName"
        label="昵称"
        width="100">
      </el-table-column>
      <el-table-column
        label="账号"
        width="120">
        <template slot-scope="scope">
          <p>{{ scope.row.account }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="性别"
        width="100">
        <template slot-scope="scope">
          <p>{{ scope.row.sex === 0 ? '女' : '男' }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="passwd"
        label="密码">
      </el-table-column>
      <el-table-column
        label="手机号">
        <template slot-scope="scope">
          <p>{{ scope.row.phone}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="出生年月"
        width="160">
        <template slot-scope="scope">
          <p>{{scope.row.birthday}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="bookMoney"
        label="书币">
      </el-table-column>
      <el-table-column
        prop="bookBean"
        label="书豆"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="等级">
        <template slot-scope="scope">
          <p>{{ scope.row.lv }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="用户类型">
        <template slot-scope="scope">
          <p>{{ scope.row.idType === 0 ? '普通用户' : '会员' }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <p>{{ scope.row.state ? '正常' : '停用' }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" style="color:#50A0FE;">修改</el-button>
          <el-button type="text" size="small" style="color:#50A0FE;">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableList: [
          {
            nicName: '张三', //昵称
            account: '1245', // 账号
            sex: 0, //性别
            passwd: '12222', //密码
            phone: '15179810786', //手机号
            birthday: '1989-12-20', //出生年月
            bookMoney: 1, //书币
            bookBean: 10, //书豆
            lv: 4, //等级
            idType: 0, //身份默认普通用户0 ，1是非普通用户
            state: true //状态
          }
        ]
        
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>