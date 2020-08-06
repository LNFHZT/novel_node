<template>
  <el-form inline :model="form" class="search__warp" size="small">
    <el-form-item label="搜索">
      <el-input v-model="form.user" placeholder="名字/作者/描述"></el-input>
    </el-form-item>
    <el-form-item label="创建时间">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date"></el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {},
    };
  },
};
</script>

<style lang="scss" scoped>
.search__warp {
  background-color: #ffffff;
  font-size: 0;
  padding: 20px;
  padding-bottom: 0;
  margin-bottom: 10px;
  
}
</style>