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
</style>

<template>
  <div class="home">
    <cHeader></cHeader>
    <div class="content">
      <cSlider></cSlider>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </div>
  </div>
</template>

<script>
import cSlider from "../component/slider/index";
import cHeader from "../component/header/index";
export default {
  components: { cHeader, cSlider },
  data() {
    return {};
  },
  methods: {},
  created() {
    this.$ajax.get(this.$api.userlist).then(res=>{
      console.log(res);
    })
  },
  mounted() {}
};
</script>