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
}
</style>

<template>
  <div class="home">
    <cHeader></cHeader>
    <div class="content">
      <cSlider></cSlider>
      <el-main class="main">
        <keep-alive :include="keep">
          <router-view :key="$route.name"></router-view>
        </keep-alive>
      </el-main>
    </div>
    <cDarwer></cDarwer>
  </div>
</template>

<script>
import cSlider from "../component/slider/index";
import cHeader from "../component/header/index";
import cDarwer from "../component/drawer/index.vue";
export default {
  components: { cHeader, cSlider, cDarwer },
  data() {
    return {};
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
  methods: {},
  created() {},
  mounted() {},
};
</script>