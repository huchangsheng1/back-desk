<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input class="secah" placeholder="请输入题名" v-model="keyword" clearable></el-input>
      <el-button class="filter-item btn-secah" style="margin-left: 2px" type="primary" icon="el-icon-search" @click="search"></el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="创建人" width="210" prop="nickname"></el-table-column>
      <el-table-column label="所属课程" prop="course_name" align="center"></el-table-column>
      <el-table-column label="题目" prop="t_names" width="210" align="center"></el-table-column>
      <el-table-column class-name="status-col" label="答案" prop="t_answer" width="200" align="center"></el-table-column>
      <el-table-column class-name="status-col" label="题型" prop="" width="200" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type_id == 1">单选题</span>
          <span v-else-if="scope.row.type_id == 2">多选题</span>
          <span v-else-if="scope.row.type_id == 3">填空题</span>
          <span v-else-if="scope.row.type_id == 4">描述题</span>
          <span v-else>简答题</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="210">
        <template slot-scope="scope">
          <el-button style="margin-left: 2px" type="primary" icon="el-icon-edit"
          @click="alttopic({tid: scope.row.tid, t_names:scope.row.t_names, t_content: scope.row.t_content, t_answer: scope.row.t_answer, type_id: scope.row.type_id})">
          </el-button>
          <el-button style="margin-left: 2px" type="danger" icon="el-icon-delete" @click="deltopic(scope.row.tid)" ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination background layout="prev, pager, next" class="flip" :current-page.sync="page" :total="totalpage" @current-change="handleCurrentChange"></el-pagination>

    <el-dialog title="题目" :visible.sync="dialogFormVisible" v-if="topicinfo.type_id == 1">
      <el-form :model="topicinfo" class="form">
        <el-form-item label="题目" :label-width="formLabelWidth">
          <el-input v-model="topicinfo.t_names" class="topicInput" type="textarea" :rows="1" autocomplete="off" placeholder="请输入题目"></el-input>
        </el-form-item>
        <el-form-item label="答案" :label-width="formLabelWidth">
          <ul class="topicUl">
            <li class="topicLi">
              <el-radio v-model="topicinfo.t_answer" label="A">A</el-radio>
              <el-input placeholder="请输入选项" class="topicInput1" v-model="topicinfo.A" clearable></el-input>
            </li>
            <li>
              <el-radio v-model="topicinfo.t_answer" label="B">B</el-radio>
              <el-input placeholder="请输入选项" class="topicInput1" v-model="topicinfo.B" clearable></el-input>
            </li>
            <li>
              <el-radio v-model="topicinfo.t_answer" label="C">C</el-radio>
              <el-input placeholder="请输入选项" class="topicInput1" v-model="topicinfo.C" clearable></el-input>
            </li>
            <li>
              <el-radio v-model="topicinfo.t_answer" label="D">D</el-radio>
              <el-input placeholder="请输入选项" class="topicInput1" v-model="topicinfo.D" clearable></el-input>
            </li>
          </ul>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="singleTopic">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="题目" :visible.sync="dialogFormVisible" v-if="topicinfo.type_id == 2">
      <el-form :model="topicinfo" class="form">
        <el-form-item label="题目" :label-width="formLabelWidth">
          <el-input v-model="topicinfo.t_names" class="topicInput" type="textarea" :rows="1" autocomplete="off" placeholder="请输入题目"></el-input>
        </el-form-item>
        <el-form-item label="答案" :label-width="formLabelWidth">
          <ul class="topicUl">
            <li class="topicLi">
              <el-checkbox v-model="mulitLi.check" label="A">A</el-checkbox>
              <el-input placeholder="请输入选项" class="topicInput1" v-model="topicinfo.A" clearable></el-input>
            </li>
            <li>
              <el-checkbox v-model="mulitLi.check" label="B">B</el-checkbox>
              <el-input placeholder="请输入选项" class="topicInput1" v-model="topicinfo.B" clearable></el-input>
            </li>
            <li>
              <el-checkbox v-model="mulitLi.check" label="C">C</el-checkbox>
              <el-input placeholder="请输入选项" class="topicInput1" v-model="topicinfo.C" clearable></el-input>
            </li>
            <li>
              <el-checkbox v-model="mulitLi.check" label="D">D</el-checkbox>
              <el-input placeholder="请输入选项" class="topicInput1" v-model="topicinfo.D" clearable></el-input>
            </li>
          </ul>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="singleTopic">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="填空题" :visible.sync="dialogpack" v-if="topicinfo.type_id == 3 || topicinfo.type_id == 4 || topicinfo.type_id == 5">
      <el-form :model="topicinfo" class="form">
        <el-form-item label="题目" :label-width="formLabelWidth">
          <el-input v-model="topicinfo.t_names" class="topicInput" type="textarea" :rows="1" autocomplete="off" placeholder="请输入题目"></el-input>
        </el-form-item>

        <el-form-item label="答案" :label-width="formLabelWidth">
          <el-input placeholder="请输入选项" class="topicInput" type="textarea" v-model="topicinfo.t_answer" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogpack = false">取 消</el-button>
        <el-button type="primary" @click="singleTopic">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定删除该题目？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="detopic">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {
  getPersonal,
  showquestions,
  delquestions,
  alterquestions,
} from "@/api/question";

export default {
  data() {
    return {
      list: [],
      listLoading: true,
      page: 1,
      totalpage: 1,
      keyword: "",
      uid: null,
      tid: null,
      topicinfo: '',
      dialogFormVisible: false,
      dialogmulit: false,
      dialogpack: false,
      dialogVisible: false,
      formLabelWidth: '60px',
      topicLi: {
        radio1: '1',
      },
      mulitLi: {
        check: ['1', '2', '3', '4'],
      },
    };
  },
  created() {
    this.listLoading = false;
  },
  methods: {
    // 翻页
    handleCurrentChange() {
      this.listLoading = true;
      showquestions({page: this.page, keyword: this.keyword}).then((res) => {
        this.list.length = 0;
        if (res.topicsinfo[0]["1"]) {
          for (let x = 0; x < res.topicsinfo[0]["1"].length; x++) {
            let t_names = res.topicsinfo[0]["1"][x]["t_names"].substr(0,res.topicsinfo[0]["1"][x]["t_names"].indexOf("|"));
            let t_content = res.topicsinfo[0]["1"][x]["t_names"].substr(res.topicsinfo[0]["1"][x]["t_names"].indexOf("|") + 1);
            let topicObj = {
              course_id: res.topicsinfo[0]["1"][x]["course_id"],
              course_name: res.topicsinfo[0]["1"][x]["course_name"],
              create_time: res.topicsinfo[0]["1"][x]["create_time"],
              nickname: res.topicsinfo[0]["1"][x]["nickname"],
              t_names: t_names,
              t_content: t_content,
              t_answer: res.topicsinfo[0]["1"][x]["t_answer"],
              tid: res.topicsinfo[0]["1"][x]["tid"],
              type_id: res.topicsinfo[0]["1"][x]["type_id"],
              uid: res.topicsinfo[0]["1"][x]["uid"],
            };
            this.list.push(topicObj);
          }
        }
        if (res.topicsinfo[0]["2"]) {
          for (let x = 0; x < res.topicsinfo[0]["2"].length; x++) {
            // console.log(res.topicsinfo[0]["2"]);
            let t_names = res.topicsinfo[0]["2"][x]["t_names"].substr(0,res.topicsinfo[0]["2"][x]["t_names"].indexOf("|"));
            let t_content = res.topicsinfo[0]["2"][x]["t_names"].substr(res.topicsinfo[0]["2"][x]["t_names"].indexOf("|") + 1);
            let topicObj = {
              course_id: res.topicsinfo[0]["2"][x]["course_id"],
              course_name: res.topicsinfo[0]["2"][x]["course_name"],
              create_time: res.topicsinfo[0]["2"][x]["create_time"],
              nickname: res.topicsinfo[0]["2"][x]["nickname"],
              t_names: t_names,
              t_content: t_content,
              t_answer: res.topicsinfo[0]["2"][x]["t_answer"],
              tid: res.topicsinfo[0]["2"][x]["tid"],
              type_id: res.topicsinfo[0]["2"][x]["type_id"],
              uid: res.topicsinfo[0]["2"][x]["uid"],
            };
            this.list.push(topicObj);
          }
        }
        if (res.topicsinfo[0]["3"]) {
          for (let x = 0; x < res.topicsinfo[0]["3"].length; x++) {
            this.list.push(res.topicsinfo[0]["3"][x]);
          }
        }
        if (res.topicsinfo[0]["4"]) {
          for (let x = 0; x < res.topicsinfo[0]["4"].length; x++) {
            this.list.push(res.topicsinfo[0]["4"][x]);
          }
        }
        if (res.topicsinfo[0]["5"]) {
          for (let x = 0; x < res.topicsinfo[0]["5"].length; x++) {
            this.list.push(res.topicsinfo[0]["5"][x]);
          }
        }
        this.listLoading = false;
      });
    },

    // 模糊查询
    search() {
      let keypage = {page: this.page, keyword: this.keyword};
      this.quinfo(keypage)
    },

    quinfo(keypage) {
        showquestions(keypage).then((res) => {
            this.list.length = 0;
            // this.listLoading = true;
            if (res.topicsinfo[0]["1"]) {
                for (let x = 0; x < res.topicsinfo[0]["1"].length; x++) {
                    let t_names = res.topicsinfo[0]["1"][x]["t_names"].substr(0,res.topicsinfo[0]["1"][x]["t_names"].indexOf("|"));
                    let t_content = res.topicsinfo[0]["1"][x]["t_names"].substr(res.topicsinfo[0]["1"][x]["t_names"].indexOf("|") + 1);
                    let topicObj = {
                        course_id: res.topicsinfo[0]["1"][x]["course_id"],
                        course_name: res.topicsinfo[0]["1"][x]["course_name"],
                        create_time: res.topicsinfo[0]["1"][x]["create_time"],
                        nickname: res.topicsinfo[0]["1"][x]["nickname"],
                        t_names: t_names,
                        t_content: t_content,
                        t_answer: res.topicsinfo[0]["1"][x]["t_answer"],
                        tid: res.topicsinfo[0]["1"][x]["tid"],
                        type_id: res.topicsinfo[0]["1"][x]["type_id"],
                        uid: res.topicsinfo[0]["1"][x]["uid"],
                    };
                    this.list.push(topicObj);
                }
            }
            if (res.topicsinfo[0]["2"]) {
                for (let x = 0; x < res.topicsinfo[0]["2"].length; x++) {
                    let t_names = res.topicsinfo[0]["2"][x]["t_names"].substr(0,res.topicsinfo[0]["2"][x]["t_names"].indexOf("|"));
                    let t_content = res.topicsinfo[0]["2"][x]["t_names"].substr(res.topicsinfo[0]["2"][x]["t_names"].indexOf("|") + 1);
                    let topicObj = {
                        course_id: res.topicsinfo[0]["2"][x]["course_id"],
                        course_name: res.topicsinfo[0]["2"][x]["course_name"],
                        create_time: res.topicsinfo[0]["2"][x]["create_time"],
                        nickname: res.topicsinfo[0]["2"][x]["nickname"],
                        t_names: t_names,
                        t_content: t_content,
                        t_answer: res.topicsinfo[0]["2"][x]["t_answer"],
                        tid: res.topicsinfo[0]["2"][x]["tid"],
                        type_id: res.topicsinfo[0]["2"][x]["type_id"],
                        uid: res.topicsinfo[0]["2"][x]["uid"],
                    };
                    this.list.push(topicObj);
                }
            }
            if (res.topicsinfo[0]["3"]) {
                for (let x = 0; x < res.topicsinfo[0]["3"].length; x++) {
                    this.list.push(res.topicsinfo[0]["3"][x]);
                }
            }
            if (res.topicsinfo[0]["4"]) {
                for (let x = 0; x < res.topicsinfo[0]["4"].length; x++) {
                    this.list.push(res.topicsinfo[0]["4"][x]);
                }
            }
            if (res.topicsinfo[0]["5"]) {
                    for (let x = 0; x < res.topicsinfo[0]["5"].length; x++) {
                    this.list.push(res.topicsinfo[0]["5"][x]);
                }
            }
            this.totalpage = res.item * 10;
            this.listLoading = false;
        });
    },

    // 修改
    alttopic(topic) {
      this.dialogFormVisible = true;
      this.dialogpack = true;
      if (topic.type_id == 1) {
        let A = topic.t_content.substr(topic.t_content.indexOf('.')+ 1, 1),
            D = topic.t_content.substr(topic.t_content.lastIndexOf('.') +1),
            B = topic.t_content.substr(topic.t_content.indexOf(',')+ 3, 1),
            C = topic.t_content.substr(topic.t_content.lastIndexOf(',')- 1, 1);
        let option = {A: A, B: B, C: C, D: D};
        this.topicinfo = Object.assign(topic, option)
      } else if (topic.type_id == 2){
        let A = topic.t_content.substr(topic.t_content.indexOf('.')+ 1, 1),
            D = topic.t_content.substr(topic.t_content.lastIndexOf('.') +1),
            B = topic.t_content.substr(topic.t_content.indexOf(',')+ 3, 1),
            C = topic.t_content.substr(topic.t_content.lastIndexOf(',')- 1, 1);
        let option = {A: A, B: B, C: C, D: D};
        this.topicinfo = Object.assign(topic, option)
        let manswer =  topic.t_answer.split('')
        this.mulitLi.check.push(...manswer);
        
      } else {
        this.topicinfo = topic;
      }
    },
    singleTopic() {
      if (this.topicinfo.type_id == 1 || this.topicinfo.type_id == 2) {
        let contents = (('A' + '.' + this.topicinfo.A) + ',' + ('B' + '.' + this.topicinfo.B) + ',' + ('C' + '.' + this.topicinfo.C) + ',' + ('D' + '.' + this.topicinfo.D))
        let tnames = this.topicinfo.t_names + '|' + contents
        let topicObj = {
          tid: this.topicinfo.tid,
          uid: this.uid,
          t_names: tnames,
          t_answer: this.topicinfo.t_answer,
          type_id: this.topicinfo.type_id
        }
        
        alterquestions(topicObj).then(
          res => {
            if (res.code == 232) {
              this.$notify({
                title: "success",
                message: `${res.msg}`,
                type: "success",
              });
            }
            this.dialogFormVisible = false;
            this.dialogpack = false;
            this.handleCurrentChange();
          }
        )
      } else {
        let topicObj = {
          tid: this.topicinfo.tid,
          uid: this.uid,
          t_names: this.topicinfo.t_names,
          t_answer: this.topicinfo.t_answer,
          type_id: this.topicinfo.type_id
        }
        alterquestions(topicObj).then(
          res => {
            if (res.code == 232) {
              this.$notify({
                title: "success",
                message: `${res.msg}`,
                type: "success",
              });
            }
            this.dialogFormVisible = false;
            this.dialogpack = false;
            this.handleCurrentChange();
          }
        )
      }
    },

    // 删除
    deltopic(tid) {
      this.dialogVisible = true; 
      this.tid = tid;
    },
    detopic() {
      delquestions({tid: this.tid}).then(
        res => {
          if (res.code == 231) {
            this.$notify({
              title: "success",
              message: `${res.msg}`,
              type: "success",
            });
          }
          this.dialogVisible = false;
          this.handleCurrentChange();
        }
      )
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
    getPersonal().then((res) => {
      this.uid = res.uid;
    });
    this.listLoading = true;
    showquestions({page: this.page, keyword: this.keyword}).then((res) => {
      
      if (res.topicsinfo[0]["1"]) {
        for (let x = 0; x < res.topicsinfo[0]["1"].length; x++) {
          let t_names = res.topicsinfo[0]["1"][x]["t_names"].substr(0,res.topicsinfo[0]["1"][x]["t_names"].indexOf("|"));
          let t_content = res.topicsinfo[0]["1"][x]["t_names"].substr(res.topicsinfo[0]["1"][x]["t_names"].indexOf("|") + 1);
          let topicObj = {
            course_id: res.topicsinfo[0]["1"][x]["course_id"],
            course_name: res.topicsinfo[0]["1"][x]["course_name"],
            create_time: res.topicsinfo[0]["1"][x]["create_time"],
            nickname: res.topicsinfo[0]["1"][x]["nickname"],
            t_names: t_names,
            t_content: t_content,
            t_answer: res.topicsinfo[0]["1"][x]["t_answer"],
            tid: res.topicsinfo[0]["1"][x]["tid"],
            type_id: res.topicsinfo[0]["1"][x]["type_id"],
            uid: res.topicsinfo[0]["1"][x]["uid"],
          };
          this.list.push(topicObj);
        }
      }
      if (res.topicsinfo[0]["2"]) {
        for (let x = 0; x < res.topicsinfo[0]["2"].length; x++) {
          let t_names = res.topicsinfo[0]["2"][x]["t_names"].substr(0,res.topicsinfo[0]["2"][x]["t_names"].indexOf("|"));
          let t_content = res.topicsinfo[0]["2"][x]["t_names"].substr(res.topicsinfo[0]["2"][x]["t_names"].indexOf("|") + 1);
          let topicObj = {
            course_id: res.topicsinfo[0]["2"][x]["course_id"],
            course_name: res.topicsinfo[0]["2"][x]["course_name"],
            create_time: res.topicsinfo[0]["2"][x]["create_time"],
            nickname: res.topicsinfo[0]["2"][x]["nickname"],
            t_names: t_names,
            t_content: t_content,
            t_answer: res.topicsinfo[0]["2"][x]["t_answer"],
            tid: res.topicsinfo[0]["2"][x]["tid"],
            type_id: res.topicsinfo[0]["2"][x]["type_id"],
            uid: res.topicsinfo[0]["2"][x]["uid"],
          };
          this.list.push(topicObj);
        }
      }
      if (res.topicsinfo[0]["3"]) {
        for (let x = 0; x < res.topicsinfo[0]["3"].length; x++) {
          this.list.push(res.topicsinfo[0]["3"][x]);
        }
      }
      if (res.topicsinfo[0]["4"]) {
        for (let x = 0; x < res.topicsinfo[0]["4"].length; x++) {
          this.list.push(res.topicsinfo[0]["4"][x]);
        }
      }
      if (res.topicsinfo[0]["5"]) {
        for (let x = 0; x < res.topicsinfo[0]["5"].length; x++) {
          this.list.push(res.topicsinfo[0]["5"][x]);
        }
      }

      this.totalpage = res.item * 10;
      this.listLoading = false;
    });
  },
};
</script>

<style scoped>
.secah {
  width: 200px;
}
.filter-container {
  margin-bottom: 10px;
}
.flip {
  margin: 0px auto;
  margin-top: 10px;
  /* margin-left: 400px;  */
}

li {
  list-style: none;
  margin-top: 10px;
}

li input {
    height: 30px;
}

.topicInput1 {
    height: 30px;
    width: 150px;
    margin-left: 12px;
}
</style>
