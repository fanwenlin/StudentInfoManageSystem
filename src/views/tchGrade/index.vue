<template>
  <div class="app-container">
    <div id="header">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="软件工程导论" name="SE" size="small" />
        <el-tab-pane label="计算机操作系统" name="OS" />
        <el-tab-pane label="计算机网络" name="NW" />
        <el-tab-pane label="数据库原理" name="DB" />
      </el-tabs>
    </div>
    <el-row>
      <div id="course" style="display:inline">课程号：45032</div>
      <div id="course" style="display:inline">课程名称：软件工程导论</div>
      <div id="course" style="display:inline">学分：2.5</div>
      <div id="course" style="display:inline">课程类型：必修课程</div>
      <div id="course" style="display:inline">课程状态：已结课</div>
    </el-row>
    <el-row><br></el-row>
    <el-row :gutter="30" type="flex" justify="center">
      <el-col :span="1"><el-tag>学期</el-tag></el-col>
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
      <el-col :span="1"><el-tag>班级</el-tag></el-col>
      <el-col :span="4">
        <el-select v-model="classVal" size="small" placeholder="请选择">
          <el-option
            v-for="item in classOpt"
            :key="item.classVal"
            :label="item.label"
            :value="item.classVal"
            :disabled="item.disabled"
          />
        </el-select>
      </el-col>
      <el-col :span="1"><el-tag>学号</el-tag></el-col>
      <el-col :span="4">
        <el-input
          v-model="courseName"
          size="small"
          placeholder="请输入内容"
          clearable
        />
      </el-col>
      <el-col :span="1"><el-tag>姓名</el-tag></el-col>
      <el-col :span="4">
        <el-input
          v-model="stuId"
          size="small"
          placeholder="请输入内容"
          clearable
        />
      </el-col>
      <el-col :span="2"><el-button size="small" type="primary">查询</el-button></el-col>
      <div id="edit"><el-col :span="2"><el-button size="small" type="danger" icon="el-icon-edit">编辑模式</el-button></el-col></div>
    </el-row>
    <el-row><el-col><br></el-col></el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      :default-sort="{prop: 'tmpId', order: 'ascending'}"
      element-loading-text="Loading"
      border
      fit
      height="460"
      stripe
      highlight-current-row
    >
      <el-table-column prop="tmpId" label="学号" width="120" align="center" sortable>
        <template slot-scope="scope">
          {{ scope.row.tmpId }}
        </template>
      </el-table-column>
      <el-table-column prop="tmpName" label="姓名" align="center" sortable>
        <template slot-scope="scope">
          {{ scope.row.tmpName }}
        </template>
      </el-table-column>
      <el-table-column prop="semester" label="所属学期" width="170" align="center" sortable>
        <template slot-scope="scope">
          {{ scope.row.semester == 1 ? "19-20年春季学期": scope.row.courseType == 2 ? "19-20年秋季学期" : "18-19年春季学期" }}
        </template>
      </el-table-column>
      <el-table-column prop="class" label="班级" width="170" align="center" sortable>
        <template slot-scope="scope">
          {{ scope.row.class == 1 ? "计算机2018-1" : scope.row.class == 2 ? "计算机2018-2" : "电气工程2018-1" }}
        </template>
      </el-table-column>
      <el-table-column prop="score" label="成绩" width="120" align="center" sortable>
        <template slot-scope="scope">
          {{ scope.row.score }}
        </template>
      </el-table-column>
      <el-table-column label="编辑" width="120" align="center">
        <el-button size="small">编辑</el-button>
      </el-table-column>
    </el-table>

    <el-row><el-col><br></el-col></el-row>
    <el-row :gutter="40" type="flex" justify="end">
      <el-col :span="4">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="warning">从文件导入</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
          <div slot="tip" class="el-upload__tip">请上传.xlsx/.xls文件</div>
        </el-upload>
      </el-col>
      <el-col :span="2"><el-button type="primary" size="small" disabled>保存</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
import { getCourseInfo } from '@/api/table'

export default {
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
      list: null,
      listLoading: true,
      activeName: 'SE',
      semOpt: [
        { semVal: '19-20-2', label: '19-20年春季学期' },
        { semVal: '19-20-1', label: '19-20年秋季学期' },
        { semVal: '18-19-2', label: '18-19年春季学期' },
        { semVal: '18-19-1', label: '18-19年秋季学期' },
        { semVal: '17-18-2', label: '17-18年春季学期' },
        { semVal: '17-18-1', label: '17-18年秋季学期' },
        { semVal: '16-17-2', label: '16-17年春季学期' },
        { semVal: '16-17-1', label: '16-17年秋季学期' }
      ],
      semVal: '',
      classOpt: [
        { classVal: 'CS2018-1', label: '计算机2018-1' },
        { classVal: 'CS2018-2', label: '计算机2018-2' },
        { classVal: 'EE2018-1', label: '电气工程2018-1' },
        { classVal: 'EE2018-2', label: '电气工程2018-2' },
        { classVal: 'EE2018-3', label: '电气工程2018-3' }
      ],
      classVal: '',
      courseName: ''
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
#header { margin:-10px 0 0; }
#course { color:gray; font-size:13px; padding: 0 50px 0 0; }
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
