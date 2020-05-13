<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-tags></v-tags>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
        <!-- <el-backtop target=".content"></el-backtop> -->
      </div>
    </div>
  </div>
</template>

<script>
import bus from "./module/bus"
import vHead from "./module/Header";
import vSidebar from "./module/Sidebar";
import vTags from "./module/Tags";
export default {
  components: {
    vHead,
    vSidebar,
    vTags
  },
  data() {
    return {
      tagsList: [],
      collapse: false
    };
  },
  created() {
    bus.$on("collapse-content", msg => {
      this.collapse = msg;
    });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on("tags", msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  }
};
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  .main-l {
    width: 180px;
    background: #ffffff;
  }
  .main-r {
    flex: 1;
    overflow: auto;
    .main-content {
      flex: 1;
      flex-shrink: 0;
    }
  }
  .content-collapse {
    left: 65px;
  }
}
</style>