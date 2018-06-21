<template>
  <section ref="powerUser">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="form1">
				<el-form-item>
					<el-input v-model="form1.name" placeholder="姓名"></el-input>
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
        <el-form :model="form2"  ref="form2" label-width="100px" :rules="form2Rules"  >
          <el-form-item label="用户名" prop="nicName" >
            <el-input v-model="form2.nicName" ></el-input>
          </el-form-item>
           <el-form-item label="账号" prop="account">
            <el-input v-model="form2.account" ></el-input>
          </el-form-item>
           <el-form-item label="密码" prop="passwd" >
            <el-input v-model="form2.passwd" ></el-input>
          </el-form-item>
          <el-form-item label="身份选择" prop="role" >
            <el-select v-model="form2.role" placeholder="请选择身份">
              <el-option label="管理员" value="shanghai"></el-option>
              <el-option label="财务" value="beijing"></el-option>
              <el-option label="营销人员" value="beijing"></el-option>
              <el-option label="运维" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
       <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="pushDataAddUser">确定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form1: {},
      form2: {},
      form2Rules: {
        nicName:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        account:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        passwd:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        role:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        
      },
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
      this.$refs.form2.validate(valid => {
        console.log(valid);
        if (valid) {
          this.$confirm("是否确认新增")
            .then(_ => {})
            .catch(_ => {});
        }
      });
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