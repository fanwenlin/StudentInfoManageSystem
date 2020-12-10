<template>
  <div class="dashboard-container">
    <el-row><el-col><br></el-col></el-row>
    <el-row>
      <div id="info" style="display:inline">姓名：张三</div>
      <div id="info" style="display:inline">用户类型：学生</div>
      <div id="info" style="display:inline">学号：1810010001</div>
      <div id="info" style="display:inline" />
      <div id="info" style="display:inline" />
    </el-row>
    <br>
    <el-row>
      <el-col>
        <el-button size="small" type="danger" icon="el-icon-edit">编辑个人信息</el-button>
      </el-col>
    </el-row>
  </div></template>

<script>
import { getCourseInfo } from '@/api/table'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getCourseInfo().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>

<style>
#info { color:gray; font-size:13px; margin:0 30px 0 30px; }
#edit { margin:0 0 0 -30px; }

</style>
