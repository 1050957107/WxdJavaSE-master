<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="search_name" placeholder="请输入设备ID" class="handle-input mr10" width="100dp"
                  @keyup.enter.native="doFilter"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="doFilter">按照ID搜索</el-button>
      </div>
      <el-table :data="(tableData|| '').slice((currentPage-1)*pageSize,currentPage*pageSize)" border>
        <el-table-column prop="device_id" label="设备ID" class="el-table" width="180" align="center"></el-table-column>
        <el-table-column prop="location_of_the_device" label="设备所在的位置" class="el-table" width="180"
                         align="center"></el-table-column>
        <el-table-column prop="number_of_abnormal_interruptions_day" label="异常中断的次数(日) " class="el-table" width="180"
                         align="center"></el-table-column>
        <el-table-column prop="number_of_abnormal_interruptions_week" label="异常中断的次数(周)" class="el-table" width="180"
                         align="center"></el-table-column>
        <el-table-column prop="number_of_abnormal_interruptions_month" label="异常中断的次数(月)" class="el-table" width="180"
                         align="center"></el-table-column>
        <el-table-column prop="number_of_abnormal_interruptions_year" label="异常中断的次数(年)" class="el-table" width="180"
                         align="center"></el-table-column>
        <el-table-column prop="abnormal_exit_times_day" label="异常退出次数(日)" class="el-table" width="180"
                         align="center"></el-table-column>
        <el-table-column prop="abnormal_exit_times_week" label="异常退出次数(周)" class="el-table" width="180"
                         align="center"></el-table-column>
        <el-table-column prop="abnormal_exit_times_month" label="异常退出次数(月)" class="el-table" width="180"
                         align="center"></el-table-column>
        <el-table-column prop="abnormal_exit_times_year" label="异常退出次数(年)" class="el-table" width="180"
                         align="center"></el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: "ExceptionInformationTable",
  data() {
    return {
      total:0,
      tableData: [],
      // 当前页
      currentPage: 1,
      // 每页多少条
      pageSize: 10,
      search_name: ''
    };
  },
  created() {
    this.getData();
  },
  methods: {
    doFilter: function () {
      var fd = new FormData()
      const rLoading=this.openLoading()
      fd.append("mydevice_id", this.search_name)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      if (this.search_name === "") {
        axios.get("http://47.94.80.231:8080/SLKJ/data/get_Abnormal_Information_Statistics_Infos").then(v => {
          rLoading.close()
          this.tableData = v.data.data
          this.total=this.tableData.length
        })
      } else {
        axios.post('http://47.94.80.231:8080/SLKJ/data/search_get_Abnormal_Information_Statistics_Infos', fd, config).then(v => {
          rLoading.close()
          this.tableData = v.data.data
          if (v.data.code==201){
            this.total=0
            this.currentPage=1
          }else {
            this.total=this.tableData.length
          }
        })
      }
    },
    getData: function () {
      axios.get("http://47.94.80.231:8080/SLKJ/data/get_Abnormal_Information_Statistics_Infos").then(v => {
        this.tableData = v.data.data
        this.total=this.tableData.length
      })
    },
    // 每页多少条
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.mr10 {
  margin-right: 10px;
}

</style>



