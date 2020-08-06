<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.children&&item.children.length">
          <el-submenu :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </template>
            <template v-for="subItem in item.children">
              <el-submenu
                v-if="subItem.children&&subItem.children.length"
                :index="subItem.path"
                :key="subItem.path"
              >
                <template slot="title">{{ subItem.meta.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.children"
                  :key="i"
                  :index="`${threeItem.path}`"
                >{{ threeItem.meta.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item
                v-else
                :index="`${subItem.path}`"
                :key="subItem.path"
              >{{ subItem.meta.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" :key="item.path">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "./bus";
import router from "@/router/router";
export default {
  data() {
    return {
      collapse: false
      // items: router
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path;
    },
    items() {
      let arr = [],
        data = JSON.parse(JSON.stringify(router));
      arr = this.format(data);
      return arr;
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
      bus.$emit("collapse-content", msg);
    });
  },
  methods: {
    format(router) {
      return router.filter(item => {
        if (!item.meta.nav) {
          return false;
        }
        if (item.children && item.children.length) {
          item.children = this.format(item.children);
        }
        return item.meta.nav;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.el-submenu {
  text-align: left;
}
.el-menu-item {
  text-align: left;
}
.sidebar > ul {
  height: 100%;
}
</style>