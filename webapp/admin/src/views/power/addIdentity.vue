<template>
	<section>
	<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form >
			<el-form-item>
				<el-button type="primary" @click="addIdentity=true">新增</el-button>
			</el-form-item>
		</el-form>
	</el-col>
	<!-- 内容 -->
	<el-col>
		<el-table :data="identityList" stripe style="width: 100%">
			<el-table-column prop="name" label="身份名" width="180">
			</el-table-column>
			<el-table-column  label="默认权限" width="180">
				<template slot-scope="scope">
					<div>
						<el-popover placement="top-start" trigger="hover" >
							<el-tree :data="scope.row.pageList" default-expand-all></el-tree>
							<p slot="reference">移动此处查看详情</p>
						</el-popover>
					</div>
				</template>
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
	</el-col>
	<el-dialog
		title="添加身份"
		:visible.sync="addIdentity"
		width="30%"
		>
		 <el-form :model="form1"  ref="form1" label-width="100px" :rules="form1Rules"   >
          <el-form-item label="名称" prop="name" >
            <el-input v-model="form1.name" ></el-input>
          </el-form-item>
           <el-form-item label="密码" prop="isEnable" >
            	<el-switch
					v-model="form1.isEnable">
				</el-switch>
          </el-form-item>
          <el-form-item label="身份选择" prop="pageList" >
			  <el-tree
				:data="pageList"
				show-checkbox
				default-expand-all
				node-key="id"
				:default-checked-keys="form1.pageList"
				>
				</el-tree>
          </el-form-item>
        </el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="addIdentity = false">取 消</el-button>
			<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		</span>
	</el-dialog>

	</section>
</template>

<script>
export default {
  data() {
    return {
      form1: {},
      form1Rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pageList: [{ required: true, message: "请输入密码", trigger: "blur" }],
        role: [{ required: true, message: "请选择身份", trigger: "blur" }]
      },
      identityList: [
        {
          id: 1,
          name: "管理员",
          isEnable: true,
          pageList: [
            {
              label: "一级 1",
              children: [
                {
                  label: "二级 1-1",
                  children: [
                    {
                      label: "三级 1-1-1"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      pageList: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        }
      ],
      addIdentity: false
    };
  },
  methods: {
    changeIsEnable(obj) {},
    resetFrom(str) {
      this.$refs[str].resetFields();
    }
  },
  watch: {
    addIdentity(newValue, oldValue) {
      if (!newValue) {
        this.resetFrom("form1");
      }
    }
  }
};
</script>

<style scoped>
</style>