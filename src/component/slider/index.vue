<style lang="less" scoped>
.slider {
  height: 100% !important;
  // transition: width 0.5s;
}

.el-menu-vertical-demo {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
<style lang="less">
.el-menu-item-group__title {
  padding: 0 !important;
}

.el-menu-item,
.el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
  text-align: left;
}
.lastmenuitem {
  padding-left: 40px !important;
  text-align: center;
}
</style>

<template>
  <el-side class="slider" :style="{width:$store.state.isCollapse ? '64px' : '200px'}">
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      :collapse="$store.state.isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse-transition="false"
      popper-append-to-body
      unique-opened
    >
      <div v-for="item in menuData" :key="item.id">
        <el-menu-item :index="item.id" v-if="item.children.length==0">
          <i :class="item.icon" v-if="item.icon!=''"></i>
          <i v-if="item.icon == 'e' || item.icon == null" class="el-icon-menu"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <el-submenu :index="item.id" v-else>
          <template slot="title">
            <i :class="item.icon" v-if="item.icon!=''"></i>
            <span slot="title" v-if="!$store.state.isCollapse">{{item.title}}</span>
          </template>
          <div v-for="citem in item.children" :key="citem.id">
            <el-menu-item-group>
              <el-menu-item :index="citem.id" v-if="citem.children.length == 0">{{citem.title}}</el-menu-item>
            </el-menu-item-group>
            <el-submenu :index="citem.id" v-if="citem.children.length != 0">
              <span slot="title">{{citem.title}}</span>
              <div v-for="ccitem in citem.children" :key="ccitem.id">
                <el-menu-item :index="ccitem.id" class="lastmenuitem">{{ccitem.title}}</el-menu-item>
              </div>
            </el-submenu>
          </div>
        </el-submenu>
      </div>
    </el-menu>
  </el-side>
</template>


<script>
export default {
  data() {
    return {
      menuData: this.$store.state.submenu,
    };
  },
  watch: {
    // menuData: {
    //   handle(newv, oldv) {
    //     console.log(newv,oldv, "进来");
    //   }
    // }
  },
  computed: {
    active() {
      return this.$store.getters.getactive;
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      this.showselect(this.menuData, key);
    },
    showselect(menu, key) {
      menu.forEach((item) => {
        if (item.id == key) {
          this.active = item.id;
          this.toRouter(item.path);
          this.$store.commit("setTag", item);
        } else if (item.children.length > 0) {
          this.showselect(item.children, key);
        }
      });
    },
    toRouter(path) {
      this.$router.push({ name: path });
    },
  },
  created() {},
  mounted() {},
};
</script>