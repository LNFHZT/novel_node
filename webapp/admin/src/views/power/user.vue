<template>
  <section ref="powerUser">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="searchPowerUser">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="addUser=true">新增</el-button>
				</el-form-item>
			</el-form>
	  </el-col>
    <el-table :data="powerUserList" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="account" label="账号">
        </el-table-column>
        <el-table-column  label="是否启用">
          <template slot-scope="scope">
            <el-switch
              @change='changeIsEnable(powerUserList[scope.$index])'
              v-model="powerUserList[scope.$index].isEnable"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column  label="操作" >
        </el-table-column>
    </el-table>
    <!-- 新增用户 -->
    <el-dialog title="新增权限用户" :visible.sync="addUser">
      <el-form :inline="true" :model="formDataAddUser">
        
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="pushDataAddUser">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filters: {},
      powerUserList: [
        {
          id: 1,
          name: "管理员一",
          isEnable: true,
          account: "123456"
        }
      ],
      dialogVisible: false,
      addUser: false
    };
  },
  methods: {
    pushDataAddUser() {
      this.$confirm("是否确认新增")
        .then(_ => {})
        .catch(_ => {});
    },
    searchPowerUser() {},
    changeIsEnable(obj) {
      this.$loading({
        target: this.$refs.powerUser,
        text: "修改中"
      });
      this.$message({
        message: "修改成功",
        type: "success"
      });
    }
  }
};
</script>

<style scoped>
</style>