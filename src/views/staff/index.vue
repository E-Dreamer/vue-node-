<style lang="less" scoped>
/deep/.el-table th > .cell {
  padding-left: 14px;
}
</style>

<template>
  <div class="staff c_div c_flex">
    <cForm :FormData="FormData" :ruleForm="ruleForm" :Formname="Formname" ref="cform" :self="this">
      <template slot="footer" slot-scope="scope">
        <el-button type="primary" @click="submit(scope.Formname)" size="small">查询</el-button>
        <el-button @click="reset(scope.Formname)" size="small">重置</el-button>
      </template>
    </cForm>
    <cbtn :btn="btn" @btnclick="handlebtnClick"></cbtn>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      ref="table"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column
        v-for="(item,index) in tableHeader"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        align='center'
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import cForm from "../../component/cForm/index";
import cbtn from "../../component/cbtn/index";
export default {
  components: { cForm, cbtn },
  data() {
    return {
      FormData: [
        {
          style: "input",
          label: "用户名",
          prop: "userName",
          plac: "请输入用户名",
        },
      ],
      ruleForm: {
        userName: "",
      },
      Formname: "Formname",
      btn: [
        {
          title: "新增人员",
          icon: "el-icon-plus",
          type: "primary",
          call: () => {
            this.add();
          },
        },
        {
          title: "修改人员",
          icon: "el-icon-edit",
          type: "warning",
          disabled: true,
          call: () => {
            this.edit();
          },
        },
        {
          title: "删除人员",
          icon: "el-icon-delete",
          type: "danger",
          disabled: true,
          call: () => {
            this.deleteuser();
          },
        },
      ],
      tableData: [],
      tableHeader: [
        {
          prop: "id",
          label: "userID",
        },
        {
          prop: "userName",
          label: "用户名",
        },
        {
          prop: "email",
          label: "邮箱",
        },
      ],
      loading: false,
      options: {
        FormData: [
          {
            style: "input",
            label: "用户名:",
            prop: "userName",
            plac: "请输入用户名",
          },
          {
            style: "input",
            label: "密码:",
            prop: "passWord",
            plac: "请输入密码",
          },
        ],
        ruleForm: {
          userName: "",
          passWord: "",
        },
        Formname: "Formname",
        ref: "cfrom",
      },
      selectArr: [],
    };
  },
  methods: {
    submit(formName) {
      this.$refs["cform"].$refs[formName].validate((valid) => {
        if (valid) {
          this.getTableData();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reset(formName) {
      this.$refs["cform"].$refs[formName].resetFields();
      this.getTableData();
    },
    handlebtnClick(item) {
      item.call();
    },
    handleSelectionChange(val) {
      this.selectArr = val;
      if (val.length) {
        this.btn[1].disabled = false;
        this.btn[2].disabled = false;
      } else {
        this.btn[1].disabled = true;
        this.btn[2].disabled = true;
      }
    },
    add() {
      this.$bus.emit(
        "opendarwer",
        this.options,
        "新增人员页面",
        this.$api.adduser
      );
    },
    edit() {
      let options = JSON.parse(JSON.stringify(this.options));
      options.ruleForm = this.selectArr[0];
      this.$bus.emit("opendarwer", options, "修改人员页面", this.$api.adduser);
    },
    deleteuser() {
      this.$ajax
        .delete(this.$api.delectUser, { params: { id: this.selectArr[0].id } })
        .then((res) => {
          if (res.success) {
            this.getTableData();
          }
        });
    },
    getTableData() {
      this.loading = true;
      this.$ajax
        .post(this.$api.userlist, { userName: this.ruleForm.userName })
        .then((res) => {
          this.tableData = res.result;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
  },
  created() {
    this.getTableData();

    this.$ajax
      .post("/noSomeDBSelect", { pageNo: 1, pageSize: 10 })
      .then((res) => {
        console.log(res);
      });
  },
  mounted() {},
};
</script>