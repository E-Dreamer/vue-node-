<style lang="less" scoped>
.header {
  width: 100%;
  padding: 0;
  height: 40px !important;
  line-height: 40px;
  display: flex;
}
.logo {
  // transition: width 0.5s;
  img {
    width: 40px;
    height: 40px;
  }
  .title {
    color: white;
    display: inline-block;
    height: 100%;
    vertical-align: text-bottom;
    line-height: 35px;

    // background: linear-gradient(to right, red, blue);
    // -webkit-background-clip: text;
    // color: transparent;
    // -webkit-text-fill-color: transparent;
    // text-fill-color: transparent;
    // filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr='#FF0000',endColorStr='#F9F900',gradientType='0');
  }
}
.iconbtn {
  width: 32px;
  font-size: 32px;
  cursor: pointer;
  color: white;
}
.options {
  flex: 1;
  text-align: right;
}
.icon {
  display: inline-block;
  margin-right: 20px;
  color: white;
  font-size: 20px;
}
.drop {
  float: right;
  margin-right: 30px;
  color: white;
  height: 100%;
  line-height: 40px;
  display: inline-block;
}
</style>

<template>
  <el-header class="header" :style="{background}">
    <div class="logo" :style="{width:$store.state.isCollapse ? '64px' : '200px'}">
      <img src="@/assets/logo.png" alt />
      <span class="title">后台管理系统</span>
    </div>
    <div class="iconbtn">
      <i class="el-icon-s-fold" @click="closeSlider" v-if="!$store.state.isCollapse"></i>
      <i class="el-icon-s-unfold" @click="openSlider" v-else></i>
    </div>
    <div class="options">
      <div class="icon">
        <el-dropdown class="drop" @command="dropdownclick">
          <span class="el-dropdown-link">
            <i class="el-icon-bell"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item,index) in belldrop"
              :key="index"
              :command="item"
            >{{item.title}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-dropdown class="drop">
        <span class="el-dropdown-link">
          {{loginName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item,index) in droparr"
            :key="index"
            :command="item"
          >{{item.title}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>


<script>
export default {
  data() {
    return {
      background: "#545c64",
      loginName: sessionStorage.getItem("username"),
      droparr: [
        {
          title: "个人资料"
        },
        {
          title: "修改资料"
        },
        {
          title: "退出登录"
        }
      ],
      belldrop: [
        {
          title: "消息通知",
          path: "/msg"
        }
      ]
    };
  },
  methods: {
    closeSlider() {
      this.$store.commit("setCollapse", true);
    },
    openSlider() {
      this.$store.commit("setCollapse", false);
    },
    dropdownclick(value) {
      if (value.path) {
        this.$router.push(value.path);
      }
    }
  },
  created() {},
  mounted() {}
};
</script>