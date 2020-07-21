<style lang="less" scoped>
.btn {
  padding: 0 20px;
}
</style>

<template>
  <div class="staff c_div c_flex">
    <cform :FormData="FormData" :ruleForm="ruleForm" :Formname="Formname">
      <template slot="footer" slot-scope="scope">
        <el-form-item>
          <el-button type="primary" @click="submitForm(scope.Formname)" size="small">查询</el-button>
          <el-button @click="resetForm(scope.Formname)" size="small">重置</el-button>
        </el-form-item>
      </template>
    </cform>
    <div class="btn">
      <!-- plain -->
      <el-button
        v-for="(item,index) in btn"
        :key="index"
        :size="$store.state.screenWidth"
        :icon="item.icon"
        :round="item.round"
        :type="item.type"
      >{{item.title}}</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(item,index) in tableHeader"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import cform from "../../component/cForm/index";
export default {
  component: { cform },
  data() {
    return {
      FormData: [
        {
          style: "input",
          label: "用户名",
          prop: "userName",
          plac: "请输入用户名"
        }
      ],
      ruleForm: {
        userName: ""
      },
      Formname: "Formname",
      btn: [
        {
          title: "新增人员",
          icon: "el-icon-plus",
          type: "primary"
        },
        {
          title: "修改人员",
          icon: "el-icon-edit",
          type: "warning"
        },
        {
          title: "删除人员",
          icon: "el-icon-delete",
          type: "danger"
        }
      ],
      tableData: [],
      tableHeader: [
        {
          prop: "userName",
          label: "用户名"
        },
        {
          prop: "email",
          label: "邮箱"
        }
      ]
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.getTableData();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reset(formname) {
      console.log(this.$refs[formname]);
      this.$refs[formname].resetFields();
      this.getTableData();
    },
    getTableData() {
      this.$ajax
        .post(this.$api.userlist, { userName: this.ruleForm.userName })
        .then(res => {
          this.tableData = res.result;
        });
    }
  },
  created() {
    this.getTableData();

    this.$ajax.get("/noSomeDBSelect").then(res => {
      console.log(res);
    });
  },
  mounted() {}
};
</script>