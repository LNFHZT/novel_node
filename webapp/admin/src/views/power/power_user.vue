<template>
  <div ref="powerUser">
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
  </div>
  
 
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
        target:this.$refs.powerUser,
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