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
    <!-- 表格 -->
    <el-table :data="powerUserList" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="name" label="身份" width="180"  :formatter="formatRole" >
        </el-table-column>
        <el-table-column prop="account" label="账号">
        </el-table-column>
        <el-table-column  label="是否启用">
          <template slot-scope="scope">
            <el-switch
              @change='changeIsEnable(scope.row)'
              v-model="scope.row.isEnable">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column  label="操作" >
          <template slot-scope="scope">
            <div class="button-group">
              <el-row>
                <el-button type="primary" icon="el-icon-edit" circle @click="editUser=true"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="delectUser(scope)"  ></el-button>
              </el-row>
            </div>
          </template>
        </el-table-column>
    </el-table>
    <!-- 新增用户 -->
    <el-dialog title="新增权限用户" :visible.sync="addUser" >
        <el-form :model="form2"  ref="form2" label-width="100px" :rules="form2Rules"   >
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
          <el-button @click="addUser = false">取 消</el-button>
          <el-button type="primary" @click="form2Submit">确定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户权限 -->
    <el-dialog title="修改权限用户" :visible.sync="editUser" >
        <el-form :model="form3"  ref="form3" label-width="100px" :rules="form3Rules"   >
          <el-form-item label="用户名" prop="nicName" >
            <el-input v-model="form3.nicName" ></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="account"  >
            <el-input v-model="form3.passwd"  readonly disabled></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passwd" >
            <el-input v-model="form3.passwd" ></el-input>
          </el-form-item>
          <el-form-item label="身份选择" prop="role" >
            <el-select v-model="form3.role" placeholder="请选择身份">
              <el-option label="管理员" value="shanghai"></el-option>
              <el-option label="财务" value="beijing"></el-option>
              <el-option label="营销人员" value="beijing"></el-option>
              <el-option label="运维" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自定义权限">
            <el-row>
              <el-button type="primary" @click="customPower=true">自定义权限</el-button>
            </el-row>
          </el-form-item>
          <el-form-item label="权限展示"  ref="power" >
            <el-tree :data="form3.powerList"  default-expand-all></el-tree>
          </el-form-item>
        </el-form>
       <div slot="footer" class="dialog-footer">
          <el-button @click="editUser = false">取 消</el-button>
          <el-button type="primary" @click="form3Submit">确定</el-button>
      </div>
    </el-dialog>
     <!-- 自定义用户权限 -->
    <el-dialog title="修改权限用户" :visible.sync="customPower"  lock-scroll>
      <el-tree :data="powerAll"  node-key="id" :default-checked-keys="powerAllcheckedKeys" show-checkbox  default-expand-all  ></el-tree>
       <div slot="footer" class="dialog-footer">
          <el-button @click="customPower = false">取 消</el-button>
          <el-button type="primary" @click="customPowerSubmit">确定</el-button>
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
      form3: {
        powerList: [
          {
            id: 1,
            label: "用户管理",
            children: [
              {
                id: 4,
                label: "用户列表"
              }
            ]
          },
          {
            id: 1,
            label: "用户管理",
            children: [
              {
                id: 4,
                label: "用户列表"
              }
            ]
          },
          {
            id: 1,
            label: "用户管理",
            children: [
              {
                id: 4,
                label: "用户列表"
              }
            ]
          }
        ]
      },
      form2Rules: {
        nicName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        passwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        role: [{ required: true, message: "请选择身份", trigger: "blur" }]
      },
      form3Rules: {
        nicName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        passwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        role: [{ required: true, message: "请选择身份", trigger: "blur" }]
      },
      powerUserList: [
        {
          id: 1,
          name: "管理员一",
          role: 1,
          isEnable: true,
          account: "123456"
        }
      ],
      powerAll: [
        {
          id: 1,
          label: "用户管理",
          children: [
            {
              id: 4,
              label: "用户列表"
            }
          ]
        },
        {
          id: 2,
          label: "用户管理",
          children: [
            {
              id: 5,
              label: "用户列表"
            }
          ]
        },
        {
          id: 3,
          label: "用户管理",
          children: [
            {
              id: 6,
              label: "用户列表"
            }
          ]
        }
      ],
      powerAllcheckedKeys: [4, 5],
      powerLoading: "",
      dialogVisible: false,
      addUser: false,
      editUser: false,
      customPower: false
    };
  },
  methods: {
    //
    form2Submit() {
      this.$refs.form2.validate(valid => {
        if (valid) {
          this.$confirm("是否确认新增")
            .then(_ => {})
            .catch(_ => {});
        }
      });
    },
    //
    form3Submit() {
      this.$refs.form3.validate(valid => {
        if (valid) {
          this.$confirm("是否确认修改")
            .then(_ => {})
            .catch(_ => {});
        }
      });
    },
    customPowerSubmit() {
      this.$confirm("是否确认修改")
        .then(_ => {
          this.customPower = false;
          this.form3.powerList = [];
        })
        .catch(_ => {});
    },
    // 筛选搜索
    searchPowerUser() {},
    // 禁止/启用 
    changeIsEnable(obj) {
      this.$loading({
        target: this.$refs.powerUser,
        text: "修改中"
      });
      this.$message({
        message: "修改成功",
        type: "success"
      });
    },
    // 删除用户
    delectUser(scope){
      this.$confirm('是否确认删除')
      .then(_=>{

      })
      .catch(_=>{
        
      })
    },
    formatRole(row, column, cellValue, index) {
      return this.$store.state.role[row.role];
    },
    resetFrom(str) {
      this.$refs[str].resetFields();
    }
  },
  computed: {},
  watch: {
    addUser(newValue, oldValue) {
      if (!newValue) {
        this.resetFrom("form2");
      }
    },
    editUser(newValue, oldValue) {
      if (!newValue) {
        this.resetFrom("form3");
      }
    },
    "form3.powerList"(newValue, oldValue) {
      if (newValue != oldValue && this.editUser) {
        
      }
    }
  }
};
</script>

<style scoped>
</style>