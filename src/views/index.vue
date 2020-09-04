<template>
    <div>
        <!-- <v-recruitment></v-recruitment> -->

        <h1 class="title">社会招聘<span>SOCIAL RECRUITMENT</span></h1>
        
        <div class="table">
            <template>
                <el-table
                :row-style="{height:'50px'}"
                :data="tableData"
                :stripe="true"
                style="width: 100%">
                <!-- <el-table-column width='200px'>
                </el-table-column> -->
                <el-table-column
                    align="right"
                    prop="date"
                    label="日期"
                    width='400px'>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="address"
                    label="地址">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="address"
                    label="地址">
                </el-table-column>
                </el-table>
            </template>
        </div>

        

    </div>
</template>

<script>
    //  import recruitment from '@/components/indexPc/common/recruitment'
    export default {
        components:{
            // 'v-recruitment':recruitment
        },
        data(){
            return{
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        }
    }
</script>

<style>

.title{
    margin: 60px 0;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
}
.title span{
    font-size: 24px;
    color: #ccc;
    vertical-align: bottom;
    margin-left: 30px;
}
.table{
    width: 100%;
    text-align: center;
    margin-bottom: 100px;
}
.table >>> .el-table{
    font-size: 14px;
    color: #313131;
}
.table >>> .el-table th, .el-table tr{
    background-color: #fafafa;
    padding: 25px 0;
    font-size: 16px;
    color: #353535;
    font-weight: 500;
}
.table >>> .el-table__row>td{
  /* 去除表格线 */
  border: none;
}
.table >>> .el-table th.is-leaf {
  /* 上边框 */
    border-top: 1px solid #EBEEF5;
}
.table >>> .el-table::before{
  /* 去除下边框 */
  height: 0;
}
.table /deep/.el-table__body tr:hover > td{
    background-color:yellow !important;
}
</style>