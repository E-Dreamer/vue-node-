<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
}
.content {
  width: 100%;
  display: flex;
  height: calc(100vh - 40px) !important;
}
.main {
  padding: 0 !important;
  display: flex;
  flex-direction: column;
}
.rightcontent {
  flex: 1;
}
</style>

主页面
<template>
  <div class="home">
    <cHeader></cHeader>
    <div class="content">
      <cSlider></cSlider>
      <el-main class="main">
        <cTag></cTag>
        <div class="rightcontent">
          <keep-alive :include="keep">
            <router-view :key="$route.name"></router-view>
          </keep-alive>
        </div>
      </el-main>
    </div>
    <cDarwer></cDarwer>
  </div>
</template>

<script>
import cSlider from "../component/slider/index";
import cHeader from "../component/header/index";
import cDarwer from "../component/drawer/index";
import cTag from "../component/ctag/index";
export default {
  components: { cHeader, cSlider, cDarwer, cTag },
  data() {
    return {
      drawer:false
    };
  },
  computed: {
    keep() {
      return this.$store.state.keepRouters;
    },
  },
  watch: {
    $route: {
      handler(to, from) {
        this.$store.commit("setkeep", to.name);
      },
    },
  },
  methods: {
    findmenu(data) {
      data.forEach((item) => {
        if (this.$route.name === item.path) {
          this.$store.commit("setTag", item);
        } else if (item.children.length > 0) {
          this.findmenu(item.children);
        }
      });
    },
    showconfig (){
      this.drawer = true
    },
    handleClose(){
      this.drawer = false
    }
  },
  created() {
    //这是刷新时候 进入的页面让他加入到缓存中 keep-alive
    this.$store.commit("setkeep", this.$route.name);
    // 这都是刷新时候 当前的页面的tag要显示
    this.findmenu(menuData);
  },
  mounted() {},
};
</script>