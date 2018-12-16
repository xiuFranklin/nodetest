<template>

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
                    width="250">
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
                </el-table-column>
                <el-table-column
                    prop="expend"
                    label="支出"
                    align='center'
                    width="170">
                </el-table-column>

                <el-table-column
                    prop="cash"
                    label="账户现金"
                    align='center'
                    width="170">
                </el-table-column>
                 <el-table-column
                    prop="remark"
                    label="备注"
                    align='center'
                    width="220">
                </el-table-column>

    </el-table>
    
</template>

<script>
export default {
    name: "fundlist",
    data() {
    return {
      tableData: []
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
      }
  }
}
</script>


<style scoped>

</style>
