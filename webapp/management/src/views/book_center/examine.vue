<template>
  <div>
    <examine-search />
    <div class="list">
      <div class="item">
        <book-item />
      </div>
    </div>
  </div>
</template>

<script>
import bookItem from "./module/book_item";
import examineSearch from "./module/examine_search";
export default {
  components: {
    bookItem,
    examineSearch,
  },
};
</script>

<style lang="scss" scoped>
</style>