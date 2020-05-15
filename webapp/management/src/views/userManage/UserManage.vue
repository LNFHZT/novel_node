<template>
  <div id="userManage">
    <el-table
      ref="multipleTable"
      :data="data"
      height="100%"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="nicName" label="昵称" width="100"></el-table-column>
      <el-table-column label="账号" width="120">
        <template slot-scope="scope">
          <p>{{ scope.row.account }}</p>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="100">
        <template slot-scope="scope">
          <p>{{ scope.row.sex === 0 ? '女' : '男' }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="passwd" label="密码"></el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">
          <p>{{ scope.row.phone}}</p>
        </template>
      </el-table-column>
      <el-table-column label="出生年月" width="160">
        <template slot-scope="scope">
          <p>{{scope.row.birthday}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="bookMoney" label="书币"></el-table-column>
      <el-table-column prop="bookBean" label="书豆" show-overflow-tooltip></el-table-column>
      <el-table-column label="等级">
        <template slot-scope="scope">
          <p>{{ scope.row.lv }}</p>
        </template>
      </el-table-column>
      <el-table-column label="用户类型">
        <template slot-scope="scope">
          <p>{{ scope.row.idType === 0 ? '普通用户' : '会员' }}</p>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <p>{{ scope.row.state ? '正常' : '停用' }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作">
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
      data: []
    };
  },
  mounted() {
    this.target("init");
  },
  methods: {
    target(key, data) {
      switch (key) {
        case "init":
          this.getData();
          break;
        default:
          break;
      }
    },
    async getData() {
      let data = await this.$fetch.get("/admin/check/user/get/info/list", {
        page: {
          pageSize: 10,
          pageNo: 0
        }
      });
      this.data = data.data.result;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>