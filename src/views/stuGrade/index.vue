<template>
  <div class="app-container">
    <el-row :gutter="40" type="flex" justify="center">
      <el-col :span="2"><el-tag>选择学期</el-tag></el-col>
      <el-col :span="4">
        <el-select v-model="semVal" size="small" placeholder="请选择">
          <el-option
            v-for="item in semOpt"
            :key="item.semVal"
            :label="item.label"
            :value="item.semVal"
            :disabled="item.disabled"
          />
        </el-select>
      </el-col>
      <el-col :span="2"><el-tag>课程类型</el-tag></el-col>
      <el-col :span="4">
        <el-select
          v-model="courseType"
          size="small"
          placeholder="请选择"
          @change="filter_list"
        >
          <el-option
            v-for="item in courseOpt"
            :key="item.courseType"
            :label="item.label"
            :value="item.courseType"
            :disabled="item.disabled"
          />
        </el-select>
      </el-col>
      <el-col :span="2"><el-tag>课程名称</el-tag></el-col>
      <el-col :span="4">
        <!-- <el-input
          v-model="courseName"
          size="small"
          placeholder="请输入内容"
          clearable
        /> -->
        <el-select
          v-model="courseId"
          size="small"
          placeholder="课程名称"
          filterable
          clearable
          @change="filter_list"
        >
          <el-option
            v-for="item in list"
            :key="item.courseId"
            :label="item.courseName"
            :value="item.courseId"
          />
        </el-select>
      </el-col>
      <el-col :span="2"><el-button size="small" type="primary">查询</el-button></el-col>
      <el-col :span="3"><div id="check"><el-checkbox v-model="checked">仅显示已结课课程</el-checkbox></div></el-col>
    </el-row>
    <el-row><el-col><br></el-col></el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      :default-sort="{prop: 'courseId', order: 'ascending'}"
      element-loading-text="Loading"
      height="600"
      stripe
      border
      fit
      highlight-current-row
    >
      <el-table-column prop="courseId" label="课程ID" align="center" width="120" sortable>
        <template slot-scope="scope">
          {{ scope.row.courseId }}
        </template>
      </el-table-column>
      <el-table-column prop="courseName" label="课程名称" sortable>
        <template slot-scope="scope">
          {{ scope.row.courseName }}
        </template>
      </el-table-column>
      <el-table-column prop="courseType" label="课程类型" width="120" align="center" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.courseType == 1 ? "必修课程": scope.row.courseType == 2 ? "选修课程" : "实践课程" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="credit" label="学分" width="120" align="center" sortable>
        <template slot-scope="scope">
          {{ scope.row.credit }}
        </template>
      </el-table-column>
      <el-table-column prop="courseStat" label="课程状态" width="120" align="center" sortable class-name="status-col">
        <template slot-scope="scope">
          <el-tag :type="scope.row.courseStat | statusFilter">{{ scope.row.courseStat ? "已结课" : "未结课" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="成绩" width="120" align="center" sortable :sort-method="compareScore">
        <template slot-scope="scope">
          {{ scope.row.courseStat==1 ? scope.row.score : "" }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCourseInfo } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'danger',
        0: 'success'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      rawlist: null,
      list: null,
      listLoading: true,
      semOpt: [
        { semVal: '1-1', label: '大一上学期' },
        { semVal: '1-2', label: '大一下学期' },
        { semVal: '2-1', label: '大二上学期' },
        { semVal: '2-2', label: '大二下学期' },
        { semVal: '3-1', label: '大三上学期' },
        { semVal: '3-2', label: '大三下学期', disabled: true },
        { semVal: '4-1', label: '大四上学期', disabled: true },
        { semVal: '4-2', label: '大四下学期', disabled: true }
      ],
      semVal: '',
      courseOpt: [
        { courseType: '0', label: '全部课程' },
        { courseType: '1', label: '必修课程' },
        { courseType: '2', label: '选修课程' },
        { courseType: '3', label: '实践课程' }
      ],
      courseType: '',
      courseId: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    get_filter() {
      let filter1 = x => true
      let filter2 = x => true
      if (this.courseType != null && Number(this.courseType > 0)) filter1 = item => Number(item.courseType) === Number(this.courseType)
      if (this.courseId !== null && this.courseId !== '') filter2 = item => item.courseId === this.courseId
      return item => (filter1(item) && filter2(item))
    },
    compareScore(a, b) {
      if (a.courseStat !== b.courseStat) return a.courseStat - b.courseStat
      return a.score - b.score
    },
    fetchData() {
      this.listLoading = true
      getCourseInfo().then(response => {
        this.rawlist = response.data.items
        this.list = this.rawlist
        this.listLoading = false
      })
    },
    filter_list() {
      // console.log(this.courseId)
      this.list = this.rawlist.filter(this.get_filter())
    }
  }
}
</script>

<style >
#check{ margin:7px 0 0 -20px; }
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 40px;
}
.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 40px;
}
</style>
