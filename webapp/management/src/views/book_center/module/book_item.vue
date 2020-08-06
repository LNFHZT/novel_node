<template>
  <div class="book-item__warp a-link">
    <el-image class="book-img" lazy fit="cover"></el-image>
    <p class="title">遮天</p>
    <p>创建时间：</p>
    <p>作者：</p>
    <div class="brief ellipsis-2">
      <span>简介：</span>由于每一列的数目都是固定的，因此，我们可以计算出不同个数列表应当多大的margin值才能保证完全左对齐。
      例如，假设每行4个元素，结果最后一行只有3个元素，则最后一个元素的margin-right大小是“列表宽度+间隙大小”的话，那最后3个元素也是可以完美左对齐的。
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.book-item__warp {
  border-radius: 10px;
  width: 220px;
  padding: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
  text-align: left;
  font-size: 14px;
  line-height: 18px;
  .book-img {
    width: 200px;
    height: 200px;
    border-radius: 10px;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 5px 0px;
    box-sizing: border-box;
  }
  .brief {
    max-height: 36px;
    overflow: hidden;
  }
}
</style>