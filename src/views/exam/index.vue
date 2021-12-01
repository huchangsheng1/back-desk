<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px" type="primary" icon="el-icon-circle-plus-outline" @click="input">
        创建考试
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px" type="primary" icon="el-icon-document-checked" @click="review">
        批阅试卷  
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="考试名称" width="200" prop="test_name"></el-table-column>
      <el-table-column align="center" label="所属班级" width="200" prop="gname"></el-table-column>
      <el-table-column align="center" label="所属科目" prop="course_name"></el-table-column>
      <el-table-column align="center" label="创建人" width="150" prop="nickname"></el-table-column>
      <el-table-column align="center" label="创建时间" width="200" prop="release_time"></el-table-column>
      <el-table-column align="center" label="状态信息">
        <template slot-scope="scopeState">
          <span v-if="scopeState.row.state == 1">已发布</span>
          <span v-else-if="scopeState.row.state == 0">未发布</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="280">
        <template slot-scope="scopeKey">
          <!-- 修改按钮 -->
          <el-button class="filter-item" style="margin-left: 4px" type="primary" icon="el-icon-edit"
            @click="revise(scopeKey.row.test_key)"
          ></el-button>
          
          <!-- 查看按钮 -->
          <!-- <el-button
            class="filter-item"
            style="margin-left: 2px"
            type="primary"
            icon="el-icon-view"
            @click="handleCreate(scopeKey.row.test_key)"
          ></el-button> -->
          
          <!-- 发布按钮 -->
          <el-button class="filter-item" style="margin-left: 4px" type="primary" icon="el-icon-plus"
            @click="relexam(scopeKey.row.test_key, scopeKey.row.stat_time)"
          ></el-button>
          
          <!-- 删除按钮 -->
          <el-button class="filter-item" style="margin-left: 4px" type="danger" icon="el-icon-delete"
            @click="delexam(scopeKey.row.test_key)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 翻页 -->
    <el-pagination background layout="prev, pager, next" class="flip" :current-page.sync="pager" :total="totalpage"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <el-dialog title="提示: 删除考试" :visible.sync="dialogDelete" width="30%">
      <span>确定删除此场考试？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false">取 消</el-button>
        <el-button type="primary" @click="deletexam">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="提示: 发布考试" :visible.sync="dialogRelease" width="30%">
      <span>确定发布此场考试？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRelease = false">取 消</el-button>
        <el-button type="primary" @click="releasexam">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { showexam, personal, issueexam, strikeexam, alterexam } from "@/api/exam";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: [],
      listLoading: true,
      dialogRelease: false,
      dialogDelete: false,
      userinfo: {},
      pager: 1,
      totalpage: 1,
      test_key: 1,
      start_time: "",
    };
  },
  created() {
    this.listLoading = false;
  },
  methods: {
    // 翻页
    handleCurrentChange() {
      this.listLoading = true;
      showexam({ page: this.pager }).then((res) => {
        let examArr = [];
        res.testinfo.forEach((val) => {
          let examObj = {
            test_key: val["test_key"],
            test_name: val["test_name"],
            gname: val["gname"],
            nickname: val["nickname"],
            course_name: val["course_name"],
            release_time: this.datetime(val["release_time"]),
            state: val["release_state"],
          };
          examArr.push(examObj);
        });
        this.list = examArr;
        this.listLoading = false;
      });
    },

    // 跳转到手动录入题目界面
    input() {
      this.$router.push("/examtopic");
    },

    // 跳转待批阅界面
    review() {
      this.$router.push("/stayexam");
    },

    // 修改考试
    revise(test_key) {
      alterexam({test_key: test_key}).then(
        res => {
          if (res.code == 412 || res.code == 413) {
            this.$notify.error({
              title: "Error",
              message: `${res.msg}`,
            });
          } else {
            let id = res.data['test_key']
            this.$router.push({
              path: `/altertopic/${id}`
            });
          }
        }
      )
      // 
    },

    // 发布考试
    relexam(test_key, stime) {
      this.dialogRelease = true;
      this.test_key = test_key;
      this.start_time = this.datetime(stime);
    },
    releasexam() {
      this.dialogRelease = false;
      issueexam({ test_key: this.test_key, stat_time: this.start_time }).then(
        (res) => {
          if (res.code == 208) {
            this.$notify({
              title: "OK",
              message: `${res.msg}`,
              type: 'success'
            });
          } else {
            this.$notify.error({
              title: "Error",
              message: `${res.msg}`,
            });
          }
        }
      );
    },

    // 删除考试
    delexam(test_key) {
      this.dialogDelete = true;
      this.test_key = test_key;
    },
    deletexam() {
      strikeexam({ test_key: this.test_key }).then((res) => {
        if (res.code == 213) {
          this.$notify({
            title: "OK",
            message: `${res.msg}`,
            type: 'success'
          });
          this.handleCurrentChange()
        } else {
          this.$notify.error({
            title: "Error",
            message: `${res.msg}`,
          });
        }
      });
      this.dialogDelete = false;
    },

    // 日期转换
    datetime(stime) {
      let strtime = new Date(stime);
      strtime =
        strtime.getFullYear() +
        "-" +
        this.timAdd(strtime.getMonth() + 1) +
        "-" +
        this.timAdd(strtime.getDate()) +
        " " +
        this.timAdd(strtime.getHours()) +
        ":" +
        this.timAdd(strtime.getMinutes()) +
        ":" +
        this.timAdd(strtime.getSeconds());
      return strtime;
    },
    timAdd(ro) {
      if (ro < 10) {
        ro = "0" + ro;
      }
      return ro;
    },
  },
  mounted() {
    this.listLoading = true;
    personal().then((res) => {  // 返回个人信息
      this.userinfo = res;
      
    });
    showexam({ page: this.pager }).then((res) => {  // 返回所有考试
      let examArr = [];
      res.testinfo.forEach((val) => {
        let examObj = {
          test_key: val["test_key"],
          test_name: val["test_name"],
          gname: val["gname"],
          nickname: val["nickname"],
          course_name: val["course_name"],
          stat_time: val["stat_time"],
          release_time: this.datetime(val["release_time"]),
          state: val["release_state"],
        };
        examArr.push(examObj);
      });
      this.list = examArr;
      this.totalpage = res.item * 10;
      this.listLoading = false;
    });
  },
};
</script>

<style scoped>
.filter-container {
  margin-bottom: 10px;
}
.flip {
  
  margin: 6px auto;
}
</style>
