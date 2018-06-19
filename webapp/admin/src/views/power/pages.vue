<template>
  <section ref="powerUser">
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<!-- <el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item> -->
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
  </section>
  
 
</template>

<script>
export default {
  data() {
    return {
      powerUserList: [
        {
          id: 1,
          name: "管理员一",
          isEnable: true,
          account: "123456"
        }
      ],
      dialogVisible: false
    };
  },
  methods: {
    handleClose() {
      this.$confirm("确认？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
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