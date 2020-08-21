<template>
  <div>
    <el-table ref="multipleTable" :data="data" height="100%" style="width: 100%">
      <el-table-column prop="nicName" label="排序" width="200"></el-table-column>
      <el-table-column prop="nicName" label="名称" width="200"></el-table-column>
      <el-table-column prop="passwd" label="创建时间"></el-table-column>
      <el-table-column prop="passwd" label="生效时长"></el-table-column>
      <el-table-column label="活动链接">
        <template slot-scope="scope">
          <p>www.xxx.com</p>
        </template>
      </el-table-column>
      <el-table-column prop="passwd" label="页面类型"></el-table-column>
      <el-table-column prop="passwd" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" style="color:#50A0FE;">上架</el-button>
          <el-button type="text" size="small" style="color:#50A0FE;">下架</el-button>
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
      data: [{}],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>