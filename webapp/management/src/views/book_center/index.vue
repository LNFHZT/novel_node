<template>
  <div>
    <list-search />
    <div class="list">
      <div class="item">
        <book-item />
      </div>
      <div class="item">
        <book-item />
      </div>
      <div class="item">
        <book-item />
      </div>
    </div>
  </div>
</template>

<script>
import listSearch from "./module/list_search";
import bookItem from "./module/book_item";
export default {
  components: {
    bookItem,
    listSearch,
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  .item {
    margin-right: 15px;
  }
}
</style>            