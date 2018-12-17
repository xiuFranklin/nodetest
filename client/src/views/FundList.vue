<template>
<div class="fillcontain">

    <div>
        <el-form :inline="true" ref="add_data">
            <el-form-item class="btnRight">
                    <el-button type="primary" size ="small" icon="view" @click='handlAdd()'>添加</el-button>
            </el-form-item>
        </el-form> 
    </div>
    <div class="table_container">

         <el-table
                v-if="tableData.length > 0"
                :data='tableData'
                max-height="450"
                border
                style="width: 100%">

         <el-table-column
                    type="index"
                    label="序号"
                    align='center'
                    width="70">
         </el-table-column>

         <el-table-column
                    prop="date"
                    label="创建时间"
                    align='center'
                    width="250"
                    sortable>
                    <template slot-scope="scope">
                        <el-icon name="time"></el-icon>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
         </el-table-column>

            <el-table-column
                prop="type"
                label="收支类型"
                align='center'
                width="150">
            </el-table-column>
            <el-table-column
                prop="describe"
                label="收支描述"
                align='center'
                width="180">
            </el-table-column>
            <el-table-column
                prop="income"
                label="收入"
                align='center'
                width="170">
                <template slot-scope="scope">  
                        <span style="color:#00d053">+ {{ scope.row.income }}</span>
                </template> 
            </el-table-column>
            <el-table-column
                prop="expend"
                label="支出"
                align='center'
                width="170">
                <template slot-scope="scope">  
                        <span style="color:#f56767">- {{ scope.row.expend }}</span>
                </template>
            </el-table-column>

            <el-table-column
                prop="cash"
                label="账户现金"
                align='center'
                width="170">
                <template slot-scope="scope">  
                        <span style="color:#4db3ff">{{ scope.row.cash }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注"
                align='center'
                width="220">
            </el-table-column>

            <el-table-column
                    prop="operation"
                    align='center'
                    label="操作"
                    fixed="right"
                    width="320">
                     <template slot-scope='scope'>
                         <el-button 
                            type="warning" 
                            icon='edit' 
                            size="small"
                            @click='onEditMoney(scope.$index,scope.row)'
                        >编辑</el-button>

                        <el-button 
                            type="danger" 
                            icon='delete' 
                            size="small"
                            @click='onDeleteMoney(scope.$index,scope.row)'
                        >删除</el-button>
                     </template>
            </el-table-column>

    </el-table>
    </div>
    <!-- 传递dialog值 -->
   <Dialog :dialog='dialog' ></Dialog>
</div>
</template>

<script>

import Dialog from "../components/Dialog";

export default {
    name: "fundlist",
    data() {
    return {
      tableData: [],
      //传递dialog属性对象
      dialog:{
        show:false
      }
     }
    },
    created() {
    this.getProfile();
  },

  methods: {
      getProfile() {
      // 获取表格数据
      this.$axios("/api/profile").then(res => {
         this.tableData = res.data
      }).catch(err => console.log(err));
      },
       onEditMoney(index,row) {
           console.log("编辑流水")
       },

       onDeleteMoney(index,row) {
           console.log("删除流水")
       },
       handlAdd(){
          this.dialog.show = true
       },
       //注册组件
       components:{
           Dialog
       }
  }
}
</script>


<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}

.btnRight {
  float: right;
}

</style>
