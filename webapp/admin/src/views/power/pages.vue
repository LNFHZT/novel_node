<template>
  <section ref="powerUser">
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form >
				<el-form-item>
					<el-button type="primary" @click="addPower=true">新增</el-button>
				</el-form-item>
			</el-form>
		    
	  </el-col>
    <el-col>
      <el-tree
        id="el-tree"
        :data="powerList"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        draggable
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <el-row>
              <span class="" >{{ node.label+'   '+ node.pageUrl }}</span>
              <el-button type="primary" icon="el-icon-edit" @click="edit(node,data)" circle></el-button>
              <el-button type="primary" icon="el-icon-plus"  circle></el-button>
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </el-row>
          </span>
      </el-tree>
    </el-col>
    <!-- 添加 -->
    <el-dialog
      title="添加页面"
      :visible.sync="addPower"
      width="30%"
     >
      <el-form ref="form1" :model="form1" :inline="true" :rules="form1Rules" >
				  <el-form-item label="页面名称" prop="name">
            <el-input v-model="form1.name"></el-input>
          </el-form-item>
          <el-form-item label="页面路径" prop="pageUrl">
            <el-select v-model="form1.pageUrl" placeholder="请选择">
              <el-option
                v-for="item in pageUrl"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="页面级别" prop="level">
             <el-select v-model="form1.level" placeholder="请选择">
              <el-option
                v-for="item in level"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form1.level==1" label="是否有二级二级目录" prop="leaf">
             <el-switch
              v-model="form1.leaf"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item v-if="form1.level==2" label="父级页面" prop="fPageId">
             <el-select v-model="form1.fPageId" placeholder="请选择">
              <el-option
                v-for="item in powerList"
                :key="item.id"
                :label="item.label" 
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          
			</el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPower = false">取 消</el-button>
        <el-button type="primary" @click="form1Submit()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改 -->
  </section>
  
 
</template>

<script>
import routes from "../../routes";
export default {
  data() {
    return {
      form1: {},
      form1Rules: {
        name: [{ required: true, message: "请输入页面名称", trigger: "blur" }],
        pageUrl: [
          {
            required: true,
            message: "请选择页面路径",
            trigger: "blur"
          }
        ],
        level: [{ required: true, message: "请选择页面级别", trigger: "blur" }],
        fPageId: [
          { required: true, message: "请选择二级页面", trigger: "blur" }
        ]
      },
      powerList: [
        {
          id: 1,
          label: "用户管理",
          pageUrl: "/",
          children: [
            {
              id: 4,
              label: "用户列表"
            }
          ]
        },
        {
          id: 2,
          label: "用户管理1",
          children: [
            {
              id: 5,
              label: "用户列表"
            }
          ]
        },
        {
          id: 3,
          label: "用户管理2",
          children: [
            {
              id: 6,
              label: "用户列表"
            }
          ]
        }
      ],
      level: [
        {
          value: "1",
          label: "一级"
        },
        {
          value: "2",
          label: "二级"
        }
      ],
      pageUrl: [],
      addPower: false
    };
  },
  methods: {
    form1Submit() {
      this.$refs.form1.validate(valid => {
        if (valid) {
          console.log(valid);
          return false;
        } else {
        }
      });
    },
    edit(obj, data) {
      console.log(obj);
      console.log(data);
    },
    resetFrom(str) {
      this.$refs[str].resetFields();
    }
  },
  watch: {
    addPower(newValue, oldValue) {
      if (!newValue) {
        this.resetFrom("form1");
      }
    }
  },
  created() {
    let page = [],
      p = false;
    routes.forEach(item => {
      if (!item.hidden) {
        p = true;
        page.forEach(pitem => {
          if (item.path == pitem) {
            p = false;
          }
        });
        if (p) {
          page.push(item.path);
        }
        item.children.forEach(citem => {
          p = true;
          page.forEach(pitem => {
            if (citem.path == pitem) {
              p = false;
            }
          });
          if (p) {
            page.push(citem.path);
          }
        });
      }
    });
    this.pageUrl = page;
  }
};
</script>

<style   lang="less">
#el-tree {
  // background-color: red;
  > .el-tree-node {
    height: auto !important;
    // margin-bottom: 10px;
    .el-tree-node__content {
      height: auto !important;
    }
  }
  .custom-tree-node {
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
    .el-row {
      display: flex;
      > span {
        flex: 1;
      }
    }
  }
}
</style>