<template>
  <div class="container">
    <div class="container_item">
      <div class="pic_404">
        <img src="../assets/404.png" alt="加载失败" />
      </div>
      <div class="bullshit">
        <div class="b_oops">怎么就出错了呢？</div>
        <div class="b_headerline">可能是您没有权限，或者地址不对，请检查后在试试吧...</div>
        <el-button  :size="$store.state.screenWidth || 'small'" type="primary"  @click="back">返回到首页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
      back (){
          this.$router.replace('/home')
      }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 40%;
  left: 50%;
  overflow: hidden;

  .container_item {
    position: relative;
    width: 1000px;
    padding: 0 50px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;

    .pic_404 {
      position: relative;
      float: left;
      width: 600px;
      overflow: hidden;
    }

    img {
      width: 100%;
    }
  }

  .bullshit {
    position: relative;
    float: left;
    width: 300px;
    padding: 30px 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .b_oops {
      font-size: 28px;
      line-height: 40px;
      color: #1482f0;
      margin-bottom: 20px;
    }

    .b_info {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      margin-bottom: 10px;
    }
  }
}
</style>