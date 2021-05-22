<template>
  <div>
    <div class="el-container">
      <el-table :data="tableData" border>
        <el-table-column type="selection" class="el-table" width="90"></el-table-column>
        <el-table-column prop="game_name" label="设备ID" class="el-table" width="180"></el-table-column>
        <el-table-column prop="equipment_number" label="客户联系人" class="el-table" width="180"></el-table-column>
        <el-table-column prop="format_time" label="客户联系电话" class="el-table" width="180"></el-table-column>
        <el-table-column prop="location_of_equipment" label="设备维修人员" class="el-table" width="180"></el-table-column>
        <el-table-column prop="location_of_equipment" label="设备维修人员电话" class="el-table" width="180"></el-table-column>
        <el-table-column prop="location_of_equipment" label="故障是否维修状态（是/否）" class="el-table" width="200"></el-table-column>
        <el-table-column prop="location_of_equipment" label="故障发生描述（故障说明）" class="el-table" width="200"></el-table-column>
        <el-table-column prop="location_of_equipment" label="维修类型（客户自己/人工上门）" class="el-table" width="220"></el-table-column>
        <el-table-column prop="location_of_equipment" label="客户自己维修发送配件时间（年月日）" class="el-table" width="260"></el-table-column>
        <el-table-column prop="location_of_equipment" label="客户自己维修配件到达时间（年月日）" class="el-table" width="260"></el-table-column>
        <el-table-column prop="location_of_equipment" label="人工上门领取任务时间（年月日，精确到分）" class="el-table" width="300"></el-table-column>
        <el-table-column prop="location_of_equipment" label="人工上门结束时间（年月日，精确到分）" class="el-table" width="280"></el-table-column>
        <el-table-column prop="location_of_equipment" label="人工维修状态（完成/未完成）" class="el-table" width="210"></el-table-column>
        <el-table-column prop="location_of_equipment" label="维修的经费" class="el-table" width="180"></el-table-column>
        <el-table-column prop="location_of_equipment" label="有无保修期" class="el-table" width="180"></el-table-column>
        <el-table-column prop="location_of_equipment" label="维修后客户评价（满意/一般/不满意）" class="el-table" width="260"></el-table-column>
      </el-table>
    </div>
    <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000">
    </el-pagination>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "MaintenanceInformationSheet",
  data() {
    return {
      tableData:[]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData: function () {
      axios.get("http://192.168.3.119:8090/data/getInfo").then(v => {
        let data = v.data;
        this.tableData = data.data
      })
    }
  }
};
</script>

<style scoped>

</style>











