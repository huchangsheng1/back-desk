<template>
    <div class="createTest">
        <el-steps :active="active" finish-status="success" class="step" space="35%">
            <el-step title="修改考试信息"></el-step>
            <el-step title="修改考题"></el-step>
            <el-step title="完成修改"></el-step>
        </el-steps>
        <el-button style="margin-top: 1 0px;" @click="prev" v-if="active==1 || active==2" >上一步</el-button>
        <el-button style="margin-top: 10px;" @click="next" v-if="active < 2">下一步</el-button>


        <div class="title" v-if="active == 0">
            <ul>
                <li class="test-info">考试名称:
                    <el-input
                        class="testName"
                        v-model="testData.examName"
                        placeholder="请输入内容">
                    </el-input>
                </li>
                <li class="test-info">考试开始时间: 
                    <el-date-picker
                        v-model="testtime.start_time"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </li>
                <li class="test-info">考试结束时间: 
                    <el-date-picker
                        v-model="testtime.end_time"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </li>
                <li class="test-info">所属班级:
                    <el-select v-model="grades.level" placeholder="---请选择---" @change="selectFirm(grades.level)">
                        <el-option
                            v-for="item in gradelist"
                            :key="item.gid"
                            :value="item.gid"
                            :label="item.gname"
                        ></el-option>
                    </el-select>
                </li>
                <li class="test-info">所属科目:
                    <el-select v-model="subject.level" placeholder="---请选择---" @change="selectsbu(subject.level)">
                        <el-option
                            v-for="once in subjectArr"
                            :key="once.course_id"
                            :value="once.course_id"
                            :label="once.course_name"
                        ></el-option>
                    </el-select>
                </li>
                <li class="test-info">总分:
                    <el-input
                        class="input1"
                        placeholder="输入总分"
                        v-model="testData.fullscore"
                        clearable>
                    </el-input>
                </li>
            </ul>
        </div>

        <div class="topics"  v-if="active == 1">
                <!-- 单选 -->
                <h4>一、单选题（
                        <!-- <el-input-number v-model="single[0].t_score" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="1" :max="20"></el-input-number>     -->
                        分）
                    </h4>
                <div class="single"  v-for="(item) in single" :key="item.tid">
                    
                    <el-form :model="item" class="form">
                    <el-form-item label="题目" :label-width="formLabelWidth">
                        <el-input v-model="item.t_stem" class="topicInput" type="textarea" :rows="1" autocomplete="off" placeholder="请输入题目"></el-input>
                    </el-form-item>
                    <el-form-item label="答案" :label-width="formLabelWidth">
                        <ul class="topicUl">
                            <li class="topicLi">
                                <el-radio v-model="item.t_answer" label="A">A</el-radio>
                                <el-input placeholder="请输入选项" class="topicInput3" v-model="item.A" clearable></el-input>
                            </li>
                            <li>
                                <el-radio v-model="item.t_answer" label="B">B</el-radio>
                                <el-input placeholder="请输入选项" class="topicInput3" v-model="item.B" clearable></el-input>
                            </li>
                            <li>
                                <el-radio v-model="item.t_answer" label="C">C</el-radio>
                                <el-input placeholder="请输入选项" class="topicInput3" v-model="item.C" clearable></el-input>
                            </li>
                            <li>
                                <el-radio v-model="item.t_answer" label="D">D</el-radio>
                                <el-input placeholder="请输入选项" class="topicInput3" v-model="item.D" clearable></el-input>
                            </li>
                        </ul>
                    </el-form-item>
                    </el-form>

                </div>

                <!-- 多选 -->
                <h4>二、多选题
                    <!-- <el-input-number v-model="mulit[0].t_score" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="2" :max="20"></el-input-number>     -->
                    分
                </h4>
                <div class="multi" v-for="(item) in mulit" :key="item.tid">
                    <el-form :model="item" class="form">
                        <el-form-item label="题目" :label-width="formLabelWidth">
                            <el-input v-model="item.t_stem" class="topicInput" type="textarea" :rows="1" autocomplete="off" placeholder="请输入题目"></el-input>
                        </el-form-item>
                        <el-form-item label="答案" :label-width="formLabelWidth">
                            <ul class="topicUl">
                                <li class="topicLi">
                                    <el-checkbox v-model="item.ttobj[item.tid+'A']" label="A">A</el-checkbox>
                                    <el-input placeholder="请输入选项" class="topicInput1" v-model="item.A" clearable></el-input>
                                </li>
                                <li>
                                    <el-checkbox v-model="item.ttobj[item.tid+'B']" label="B">B</el-checkbox>
                                    <el-input placeholder="请输入选项" class="topicInput1" v-model="item.B" clearable></el-input>
                                </li>
                                <li>
                                    <el-checkbox v-model="item.ttobj[item.tid+'C']" label="C">C</el-checkbox>
                                    <el-input placeholder="请输入选项" class="topicInput1" v-model="item.C" clearable></el-input>
                                </li>
                                <li>
                                    <el-checkbox v-model="item.ttobj[item.tid+'D']" label="D">D</el-checkbox>
                                    <el-input placeholder="请输入选项" class="topicInput1" v-model="item.D" clearable></el-input>
                                </li>
                            </ul>
                        </el-form-item>
                    </el-form>
                </div>

                <!-- 填空 -->
                <h4>三、填空题（
                        <!-- <el-input-number v-model="pack[0].t_score" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="3" :max="20"></el-input-number>     -->
                    分
                    </h4>
                <div class="pack" v-for="(item) in pack" :key="item.tid">
                    
                    
                    <el-form :model="item" class="form">
                        <el-form-item label="题目" :label-width="formLabelWidth">
                        <el-input v-model="item.t_names" class="topicInput" type="textarea" :rows="1" autocomplete="off" placeholder="请输入题目"></el-input>
                        </el-form-item>

                        <el-form-item label="答案" :label-width="formLabelWidth">
                            <el-input placeholder="请输入选项" class="topicInput" type="textarea" v-model="item.t_answer" :rows="1" clearable></el-input>
                        </el-form-item>
                    </el-form>
                    
                </div>

                <!-- 描述 -->
                <h4>四、描述题（
                        <!-- <el-input-number v-model="describe[0].t_score" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="4" :max="20"></el-input-number>     -->
                    分）
                    </h4>
                <div class="describe" v-for="(item) in describe" :key="item.tid">
                    <el-form :model="item" class="form">
                        <el-form-item label="题目" :label-width="formLabelWidth">
                        <el-input v-model="item.t_names" class="topicInput" type="textarea" :rows="1" autocomplete="off" placeholder="请输入题目"></el-input>
                        </el-form-item>

                        <el-form-item label="答案" :label-width="formLabelWidth">
                            <el-input placeholder="请输入选项" class="topicInput" type="textarea" v-model="item.t_answer" :rows="1" clearable></el-input>
                        </el-form-item>
                    </el-form>

                </div>

                <!-- 简答 -->
                <h4>五、简答题（
                        <!-- <el-input-number v-model="short[0].t_score" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="5" :max="20"></el-input-number>     -->
                    分）
                    </h4>
                <div class="short" v-for="(item) in short" :key="item.tid">
                    
                    <el-form :model="item" class="form">
                        <el-form-item label="题目" :label-width="formLabelWidth">
                        <el-input v-model="item.t_names" class="topicInput" type="textarea" :rows="1" autocomplete="off" placeholder="请输入题目"></el-input>
                        </el-form-item>

                        <el-form-item label="答案" :label-width="formLabelWidth">
                            <el-input placeholder="请输入选项" class="topicInput" type="textarea" v-model="item.t_answer" :rows="1" clearable></el-input>
                        </el-form-item>
                    </el-form>

                </div>
        </div>

        <!-- 确认修改 -->
        <div class="alterBtn" v-if="active == 2">
            <el-button class="filter-item btn" style="margin-left: 2px;" type="primary" icon="el-icon-refresh-plus" @click="altexam">确认修改</el-button>
            <el-button class="filter-item btn" style="margin-left: 10px;" type="info" icon="el-icon-refresh-plus" @click="cancel">取消修改</el-button>
        </div>

        
    </div>

    
</template>

<script>
import { alterexam, confirm, findgrade, findcourse} from "@/api/exam";

export default {
  name: "AlterExam",
  data() {
    return {
        active: 0,
        formLabelWidth: '60px',
        // 单选择题
        topicLi: {
            radio1: '1',
        },
        // 考试信息
        testData: {
            uid: "",
            examName: "",
            fullscore: "",
        },
        testtime: {
            start_time: "",
            end_time: "",
        },
        // 课程
        gradelist: [],
        grades: { level: "" },
        // 班级
        subjectArr: [],
        subject: { level: "" },
        courseid: '',
        
        mulitLi: {
            check: ['1', '2', '3', '4'],
            A : false,
            B : false,
            C : false,
            D : false
        },

      single: [], // 单选
      mulit: [], // 多选
      pack: [], // 填空
      describe: [], // 描述
      short: [], // 简答

    // 单选(提交数据)
    singletopics: {examtype: 1, topics: []},
    // 多选(提交数据)
    mulittopics: {examtype: 2, topics: []}, 
    // 填空(提交数据)
    packtopics: {examtype: 3, topics: []},
    // 描述(提交数据)
    describetopics: {examtype: 4, topics: []},
    // 简答(提交数据)
    shorttopics: {examtype: 5, topics: []},
    };
  },
  methods: {
    // 导航条
    prev() {
      if (this.active-- < 0) this.active = 0;
    },
    next() {
        console.log(this.single[0]);
      if (this.active++ > 2) this.active = 0;
    },

    // 查班级对应课程
    selectFirm(gid) {
        findcourse({gid: gid}).then(
            res => {
                this.subject.level = res.data.course_id
                // console.log(this.subject.level);
                this.subjectArr = res.data
            }
        )
    },
    selectsbu(cid) {
        this.courseid = cid
    },


    handleChange(value) {
    },

    // 确认修改
    altexam() {
        // 单选
        for (let x = 0; x < this.single.length; x ++) {
            let contents = (('A' + '.' + this.single[x]['A']) + ',' + ('B' + '.' + this.single[x]['B']) + ',' + ('C' + '.' + this.single[x]['C']) + ',' + ('D' + '.' + this.single[x]['D']))

            let singleObj = {
                tid: this.single[x]['tid'],
                stem: this.single[x]['t_stem'],
                content: contents,
                answer: this.single[x]['t_answer'],
                score: this.single[x]['t_score']
            }
            this.singletopics['topics'].push(singleObj)
        };

        // 多选
        for (let s = 0; s < this.mulit.length; s ++) {
            let contents = (('A' + '.' + this.mulit[s]['A']) + ',' + ('B' + '.' + this.mulit[s]['B']) + ',' + ('C' + '.' + this.mulit[s]['C']) + ',' + ('D' + '.' + this.mulit[s]['D']))
            let multi_answer = this.mulitLi.check.splice(4, this.mulitLi.check.length);
            let manswer = multi_answer.join('');
            let singleObj = {
                tid: this.mulit[s]['tid'],
                stem: this.mulit[s]['t_stem'],
                content: contents,
                answer: manswer,
                score: this.mulit[s]['t_score']
            }
            this.mulittopics['topics'].push(singleObj)
        }

        // 填空
        for (let y = 0; y < this.pack.length; y ++) {
            let singleObj = {
                tid: this.pack[y]['tid'],
                stem: this.pack[y]['t_names'],
                answer: this.pack[y]['t_answer'],
                score: this.pack[y]['t_score']
            }
            this.packtopics['topics'].push(singleObj)
        }

        // 描述
        for (let n = 0; n < this.describe.length; n ++) {
            let singleObj = {
                tid: this.describe[n]['tid'],
                stem: this.describe[n]['t_names'],
                answer: this.describe[n]['t_answer'],
                score: this.describe[n]['t_score']
            }
            this.describetopics['topics'].push(singleObj)
        }

        // 简答
        for (let k = 0; k < this.short.length; k ++) {
            let singleObj = {
                tid: this.short[k]['tid'],
                stem: this.short[k]['t_names'],
                answer: this.short[k]['t_answer'],
                score: this.short[k]['t_score']
            }
            this.shorttopics['topics'].push(singleObj)
        }

        let questions = []
        questions.push(this.singletopics, this.mulittopics, this.packtopics, this.describetopics, this.shorttopics)
        // console.log(this.subjectArr);
        let cid = '';
        if (!this.courseid) {
            cid = this.subject.level;
        } else {
            cid = this.courseid
        }
        let examinfo = {
            test_key: this.$route.params.id,
            courseid: cid,
            gid: this.grades.level,
            questions: questions,
            statime: this.datetime(this.testtime.start_time),
            endtime: this.datetime(this.testtime.end_time),
            fullscore: this.testData.fullscore,
            testname: this.testData.examName
        }
        confirm(examinfo).then(
            res => {
                if (res.code == 206) {
                    this.$notify({
                        title: "success",
                        message: `${res.msg}`,
                        type: "success",
                    });
                    this.active = 3;
                    this.$router.replace('/testmanager');
                } else {
                    this.$notify.error({
                        title: "Error",
                        message: `${res.msg}`,
                    });
                    this.active = 0;
                }
            }
        )

    },
    cancel() {
       this.$router.replace('/testmanager'); 
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
    document.querySelector("body").setAttribute("style", "background-color:#64a9e3");
    let test_key = this.$route.params.id;

    
    // 数据回显
    alterexam({ test_key: test_key }).then((res) => {
        // console.log(res);
        this.grades.level = res.data.gid;
        this.subject.level = res.data.course_id;
        let testjson = res.data.test_json;
        this.testData.examName = res.data.test_name;
        this.testData.fullscore = res.data.full_score;
        this.testtime.start_time = this.datetime(res.data.stat_time);
        this.testtime.end_time = this.datetime(res.data.end_time);

        let singleArr = [],
            mulitArr = [];
        for (let x = 0; x < testjson.length; x++) {
        singleArr = testjson[x]["1"];
        mulitArr = testjson[x]["2"];
        this.pack = (testjson[x]["3"]);
        this.describe = (testjson[x]["4"]);
        this.short = (testjson[x]["5"]);
        }
        for (let y = 0; y < singleArr.length; y++) {
        let t_content = singleArr[y]["t_names"].substr(singleArr[y]["t_names"].indexOf("|") + 1);
        let A1 = t_content.split(',')[0],
                B1 = t_content.split(',')[1],
                C1 = t_content.split(',')[2],
                D1 = t_content.split(',')[3];
            let A = A1.substr(A1.indexOf('.') +1),
                B = B1.substr(B1.indexOf('.') +1),
                C = C1.substr(C1.indexOf('.') +1),
                D = D1.substr(D1.indexOf('.') +1);
        let t_stem = singleArr[y]["t_names"].substr(0,singleArr[y]["t_names"].indexOf("|"));
        let singleObj = {
          tid: singleArr[y]["tid"],
          A: A,
          B: B,
          C: C,
          D: D,
          t_stem: t_stem,
          t_answer: singleArr[y]["t_answer"],
          t_score: singleArr[y]["t_score"],
        };
        // console.log(singleObj);
        this.single.push(singleObj);
        }
        for (let s = 0; s < mulitArr.length; s++) {
            let t_content = mulitArr[s]["t_names"].substr(mulitArr[s]["t_names"].indexOf("|") + 1);
           
            let A1 = t_content.split(',')[0],
                B1 = t_content.split(',')[1],
                C1 = t_content.split(',')[2],
                D1 = t_content.split(',')[3];
            let A = A1.substr(A1.indexOf('.') +1),
                B = B1.substr(B1.indexOf('.') +1),
                C = C1.substr(C1.indexOf('.') +1),
                D = D1.substr(D1.indexOf('.') +1);

            let t_stem = mulitArr[s]["t_names"].substr(0, mulitArr[s]["t_names"].indexOf("|"));
          
            let manswer =  mulitArr[s]["t_answer"].split('')
            // console.log(manswer);
            let ttobj = {}
            for(let i =0; i< manswer.length; i++ ) {
                // console.log(mulitArr[s]["tid"]);
                // console.log(mulitArr[s]["tid"]+`${manswer[i]}`);
                ttobj[mulitArr[s]["tid"]+`${manswer[i]}`] = true;
                
            }
            
            
            this.mulitLi.check.push(...manswer);
            let mulitObj = {
                    tid: mulitArr[s]["tid"],
                    ttobj,
                    A: A,
                    B: B,
                    C: C,
                    D: D,
                    t_stem: t_stem,
                    t_answer: mulitArr[s]["t_answer"],
                    t_score: mulitArr[s]["t_score"],
            };
            this.mulit.push(mulitObj);
            // console.log(this.mulit);
        }

    });
    
    // 查找班级
    findgrade().then(
        res => {
            this.gradelist = res.data;
        }
    )

    
    
  },
  destroyed() {
    document.querySelector('body').setAttribute('style','background-color:#fff');
  },


};
</script>


<style scoped>
li {
  list-style: none;
  margin-top: 10px;
}

li input {
    height: 30px;
}

.createTest {
  width: 800px;
  height: 730px;
  margin: 0 auto;
  background: #fff;
  padding-left: 10px;
  overflow-y: scroll;
}

.test-info {
  width: 500px;
  height: 48px;
  line-height: 48px;
  margin-top: 10px;
}

.input1 {
  width: 200px;
  height: 38px;
}

.testName {
  width: 200px;
  height: 38px;
}

.title {
  margin-top: 50px;
}

.topicInput2 {
    width: 80px;
}

.topicInput1 {
    height: 30px;
    width: 150px;
    margin-left: 12px;
}

.topicInput3 {
    height: 30px;
    width: 150px;
    margin-left: -14px;
}

.topicInput {
    width: 300px;
}

.alterBtn {
    margin-top: 20px;
}

.form {
    width: 760px;
    background: #f5f5f5;
}

.topicInput {
    width: 500px;
}
</style>