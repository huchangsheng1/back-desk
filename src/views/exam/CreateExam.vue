<template>
    <div class="createTest">
        <el-steps :active="active" finish-status="success" class="step" space="35%">
            <el-step title="考试信息填写"></el-step>
            <el-step title="创建考题"></el-step>
            <el-step title="完成创建"></el-step>
        </el-steps>
        <el-button style="margin-top: 1 0px;" @click="prev" v-if="active==1 || active==2">上一步</el-button>
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
                    <el-select v-model="subject.level" placeholder="---请选择---">
                        <el-option
                            v-for="once in subject"
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

        <div class="setTopic" v-if="active == 1">
            <input type="file" name="file" id="file" multiple @change="exceltopic">
            <el-button class="filter-item" style="margin-left: 2px;" type="primary" icon="el-icon-edit">Excel导题
            </el-button>
            <el-button class="filter-item" style="margin-left: 2px;" type="primary" icon="el-icon-refresh-right" @click="randoma">随机抽取</el-button>
            
            <div class="topics">
                <!-- 单选 -->
                <div class="single">
                    <h4>一、单选题（
                        <el-input-number v-model="topic_score.single_score" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="1" :max="20"></el-input-number>    
                        分）
                        <el-button class="filter-item" plain size="mini" icon="el-icon-plus" @click="single"></el-button>
                    </h4>
                    
                    <p class="span" v-show="singlearr.length != 0" v-for="(item, index) in singlearr" :key="index">{{ (index +1) + '、' + item }}
                        <el-button v-show="form.title != ''" class="filter-item delBtn" type="danger" plain size="mini" icon="el-icon-delete" @click="delsingle(index)"></el-button>
                    </p>
                    
                    
                </div>

                <!-- 多选 -->
                <div class="multi">
                    <h4>二、多选题（
                        <el-input-number v-model="topic_score.multi_score" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="2" :max="20"></el-input-number>    
                    分）
                        <el-button class="filter-item" plain size="mini" icon="el-icon-plus" @click="multi"></el-button>
                    </h4>
                    <p class="span" v-show="mulitarr.length != 0" v-for="(item, index) in mulitarr" :key="index">{{ (index +1) + '、' + item }}
                        <el-button v-show="form.title != ''" class="filter-item delBtn" type="danger" plain size="mini" icon="el-icon-delete" @click="delmulti(index)"></el-button>
                    </p>
                </div>

                <!-- 填空 -->
                <div class="pack">
                    <h4>三、填空题（
                        <el-input-number v-model="topic_score.pack_score" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="3" :max="20"></el-input-number>    
                    分）
                        <el-button class="filter-item" plain size="mini" icon="el-icon-plus" @click="pack"></el-button>
                    </h4>
                    <p class="span" v-show="packarr != ''" v-for="(item, index) in packarr" :key="index">{{ (index +1) + '、' + item }}
                        <el-button v-show="form.title != ''" class="filter-item delBtn" type="danger" plain size="mini" icon="el-icon-delete" @click="delpack(index)"></el-button>
                    </p>
                </div>

                <!-- 描述 -->
                <div class="describe">
                    <h4>四、描述题（
                        <el-input-number v-model="topic_score.describe_score" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="4" :max="20"></el-input-number>    
                    分）
                        <el-button class="filter-item" plain size="mini" icon="el-icon-plus" @click="describe"></el-button>
                    </h4>
                    <p class="span" v-show="describearr != ''" v-for="(item, index) in describearr" :key="index">{{ (index +1) + '、' + item }}
                        <el-button v-show="form.title != ''" class="filter-item delBtn" type="danger" plain size="mini" icon="el-icon-delete" @click="deldescribe(index)"></el-button>
                    </p>
                </div>

                <!-- 简答 -->
                <div class="short">
                    <h4>五、简答题（
                        <el-input-number v-model="topic_score.short_score" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="5" :max="20"></el-input-number>    
                    分）
                        <el-button class="filter-item" plain size="mini" icon="el-icon-plus" @click="short"></el-button>
                    </h4>
                     <p class="span" v-show="shortarr != ''" v-for="(item, index) in shortarr" :key="index">{{ (index +1) + '、' + item }}
                        <el-button v-show="form.title != ''" class="filter-item delBtn" type="danger" plain size="mini" icon="el-icon-delete" @click="delshort(index)"></el-button>
                    </p>
                </div>
            </div>

            <el-dialog title="随机抽题" :visible.sync="dialogeandom">
                <h4>一、单选题（
                    <el-input-number v-model="testnumber.tscore1" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="1" :max="20"></el-input-number>    
                    分）
                    数量<el-input-number v-model="testnumber.tnumber1" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="1" :max="20"></el-input-number>
                </h4>
                <h4>二、多选题（
                    <el-input-number v-model="testnumber.tscore2" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="1" :max="20"></el-input-number>    
                    分）
                    数量<el-input-number v-model="testnumber.tnumber2" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="1" :max="20"></el-input-number>
                </h4>
                <h4>三、填空题（
                    <el-input-number v-model="testnumber.tscore3" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="1" :max="20"></el-input-number>    
                    分）
                    数量<el-input-number v-model="testnumber.tnumber3" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="1" :max="20"></el-input-number>
                </h4>
                <h4>四、描述题（
                    <el-input-number v-model="testnumber.tscore4" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="1" :max="20"></el-input-number>    
                    分）
                    数量<el-input-number v-model="testnumber.tnumber4" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="1" :max="20"></el-input-number>
                </h4>
                <h4>五、简答题（
                    <el-input-number v-model="testnumber.tscore5" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="1" :max="20"></el-input-number>    
                    分）
                    数量<el-input-number v-model="testnumber.tnumber5" size="mini" class="topicInput2" label="1" controls-position="right" @change="handleChange" :min="1" :max="20"></el-input-number>
                </h4>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogeandom = false">取 消</el-button>
                    <el-button type="primary" @click="randomTopic">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="单项选择题" :visible.sync="dialogFormVisible">
                <el-form :model="form" class="form">
                    <el-form-item label="题目" :label-width="formLabelWidth">
                    <el-input v-model="form.title" class="topicInput" type="textarea" :rows="1" autocomplete="off" placeholder="请输入题目"></el-input>
                    </el-form-item>
                    <el-form-item label="答案" :label-width="formLabelWidth">
                    <ul class="topicUl">
                        <li>
                            <el-radio v-model="topicLi.radio1" label="A">A</el-radio>
                            <el-input placeholder="请输入选项" class="topicInput3" v-model="form.input1" clearable></el-input>
                        </li>
                        <li>
                            <el-radio v-model="topicLi.radio1" label="B">B</el-radio>
                            <el-input placeholder="请输入选项" class="topicInput3" v-model="form.input2" clearable></el-input>
                        </li>
                        <li>
                            <el-radio v-model="topicLi.radio1" label="C">C</el-radio>
                            <el-input placeholder="请输入选项" class="topicInput3" v-model="form.input3" clearable></el-input>
                        </li>
                        <li>
                            <el-radio v-model="topicLi.radio1" label="D">D</el-radio>
                            <el-input placeholder="请输入选项" class="topicInput3" v-model="form.input4" clearable></el-input>
                        </li>
                    </ul>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="singleTopic">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="多项选择题" :visible.sync="dialogmulit">
                <el-form :model="form" class="form">
                    <el-form-item label="题目" :label-width="formLabelWidth">
                    <el-input v-model="form.title" class="topicInput" type="textarea" :rows="1" autocomplete="off" placeholder="请输入题目"></el-input>
                    </el-form-item>
                    <el-form-item label="答案" :label-width="formLabelWidth">
                    <ul class="topicUl">
                        <li class="topicLi">
                            <el-checkbox v-model="mulitLi.chech1" label="A">A</el-checkbox>
                            <el-input placeholder="请输入选项" class="topicInput1" v-model="form.input1" clearable></el-input>
                        </li>
                        <li>
                            <el-checkbox v-model="mulitLi.chech1" label="B">B</el-checkbox>
                            <el-input placeholder="请输入选项" class="topicInput1" v-model="form.input2" clearable></el-input>
                        </li>
                        <li>
                            <el-checkbox v-model="mulitLi.chech1" label="C">C</el-checkbox>
                            <el-input placeholder="请输入选项" class="topicInput1" v-model="form.input3" clearable></el-input>
                        </li>
                        <li>
                            <el-checkbox v-model="mulitLi.chech1" label="D">D</el-checkbox>
                            <el-input placeholder="请输入选项" class="topicInput1" v-model="form.input4" clearable></el-input>
                        </li>
                    </ul>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogmulit = false">取 消</el-button>
                    <el-button type="primary" @click="mulitTopic">确 定</el-button>
                </div>
            </el-dialog>

             <el-dialog title="填空题" :visible.sync="dialogpack">
                <el-form :model="form" class="form">
                    <el-form-item label="提示：" :label-width="formLabelWidth">三个 _ 为空</el-form-item>
                    <el-form-item label="题目" :label-width="formLabelWidth">
                    <el-input v-model="form.title" class="topicInput" type="textarea" :rows="1" autocomplete="off" placeholder="请输入题目"></el-input>
                    </el-form-item>

                    <el-form-item label="答案" :label-width="formLabelWidth">
                        <el-input placeholder="请输入选项" class="topicInput" type="textarea" v-model="form.input1" clearable></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogpack = false">取 消</el-button>
                    <el-button type="primary" @click="packTopic">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="描述题" :visible.sync="dialogdescribe">
                <el-form :model="form" class="form">
                    <el-form-item label="题目" :label-width="formLabelWidth">
                    <el-input v-model="form.title" class="topicInput" type="textarea" :rows="1" autocomplete="off" placeholder="请输入题目"></el-input>
                    </el-form-item>

                    <el-form-item label="答案" :label-width="formLabelWidth">
                        <el-input placeholder="请输入选项" class="topicInput" type="textarea" v-model="form.input1" clearable></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogdescribe = false">取 消</el-button>
                    <el-button type="primary" @click="describeTopic">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="简答题" :visible.sync="dialogshort">
                <el-form :model="form" class="form">
                    <el-form-item label="题目" :label-width="formLabelWidth">
                    <el-input v-model="form.title" class="topicInput" type="textarea" :rows="1" autocomplete="off" placeholder="请输入题目"></el-input>
                    </el-form-item>

                    <el-form-item label="答案" :label-width="formLabelWidth">
                        <el-input placeholder="请输入选项" class="topicInput" type="textarea" v-model="form.input1" clearable></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogshort = false">取 消</el-button>
                    <el-button type="primary" @click="shortTopic">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <div class="finish" v-if="active == 2">
            <el-button class="filter-item" style="margin-left: 2px;" type="primary" icon="el-icon-refresh-plus" @click="finish">确认创建</el-button>
        </div>
        
    </div>
</template>

<script>
import {
  personal,
  createtopic,
  randomtopic,
  exltopic,
  pourintopic,
  findgrade,
  findcourse
} from "@/api/exam";

export default {
    name: "TestPaperTch",
    data() {
        return {
            active: 0,
            dialogFormVisible: false,
            dialogmulit: false,
            dialogpack: false,
            dialogdescribe: false,
            dialogshort: false,
            dialogeandom: false,

            fileList:[{
                name: '',
                url: ''
            }],

            // 单选择题
            topicLi: {
                radio1: '1',
            },
            // 多选择题
            mulitLi: {
                chech1: ['1', '2', '3', '4'],
            },

            form: {
                title: '',
                input1: '',
                input2: '',
                input3: '',
                input4: '',
            },
            formLabelWidth: '60px',

            // 考试信息
            testData: {
                uid: '',
                examName: '',
                fullscore: '',
            },
            testtime: {
                start_time: '',
                end_time: ''
            },
            // 课程
            gradelist: [],
            grades: { level: '' },
            // 班级
            subject: [],
            subject: { level: '' },
            
            // 题目分值
            topic_score: {
                single_score: 1,
                multi_score: 1,
                pack_score: 1,
                describe_score: 1,
                short_score: 1
            },
            
            // 题干显示
            singlearr: [],
            mulitarr: [],
            packarr: [],
            describearr: [],
            shortarr: [],

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
            
            // 状态
            state: 1,

            // 随机抽题
            testnumber: {
                tnumber1: 1,
                tscore1: 1,
                tnumber2: 1,
                tscore2: 2,
                tnumber3: 1,
                tscore3: 3,
                tnumber4: 1,
                tscore4: 4,
                tnumber5: 1,
                tscore5: 5,
            }
        }
    },
    methods: {
        // 导航条
        prev() {
            if (this.active-- < 0) this.active = 0;
        },
        next() {
            if (this.active++ > 2) this.active = 0;

        },
        handleChange(value) {
        },

        selectFirm(gid) {  //查课程
            findcourse({gid: gid}).then(
                res => {
                    this.subject = res.data
                }
            )
        },

        // 单选
        single() {
            this.dialogFormVisible = true;
        },
        singleTopic() {
            this.dialogFormVisible = false;
            if (this.form.title != '') {
                this.singlearr.push(this.form.title);
            }
            
            let contents = (('A' + '.' + this.form.input1) + ',' + ('B' + '.' + this.form.input2) + ',' + ('C' + '.' + this.form.input3) + ',' + ('D' + '.' + this.form.input4))
            let topicObj = {stem: this.form.title, content: contents, answer: this.topicLi.radio1, score: this.topic_score.single_score};
            this.singletopics.topics.push(topicObj);
        },
        //删除录入的选择题
        delsingle(index) {
            this.singlearr.splice(index, 1);
            this.singletopics.topics.splice(index, 1);
        },

        //多选
        multi() {
            this.dialogmulit = true;
        },
        mulitTopic() {
            this.dialogmulit = false;
            if (this.form.title != '') {
                this.mulitarr.push(this.form.title);
            }

            let multi_answer = this.mulitLi.chech1.splice(4, this.mulitLi.chech1.length);
            let manswer = multi_answer.join('');
            let contents = (('A' + '.' + this.form.input1) + ',' + ('B' + '.' + this.form.input2) + ',' + ('C' + '.' + this.form.input3) + ',' + ('D' + '.' + this.form.input4))
            let topicObj = {stem: this.form.title, content: contents, answer: manswer, score: this.topic_score.multi_score}
            this.mulittopics.topics.push(topicObj);
        },
        delmulti(index) {
            this.mulitarr.splice(index, 1);
            this.mulittopics.topics.splice(index, 1);
        },

        // 填空
        pack() {
            this.dialogpack = true;
        },
        packTopic() {
            this.dialogpack = false;
            if (this.form.title != '') {
                this.packarr.push(this.form.title);
            }
            let topicObj = {stem: this.form.title, answer: this.form.input1, score: this.topic_score.pack_score}
            this.packtopics.topics.push(topicObj);
        },
        delpack(index) {
            this.packarr.splice(index, 1);
            this.packtopics.topics.splice(index, 1);
        },

        // 描述
        describe() {
            this.dialogdescribe = true;
        },
        describeTopic() {
            this.dialogdescribe = false;
            if (this.form.title != '') {
                this.describearr.push(this.form.title);
            }
            let topicObj = {stem: this.form.title, answer: this.form.input1, score: this.topic_score.describe_score}
            this.describetopics.topics.push(topicObj);
        },
        deldescribe(index) {
            this.describearr.splice(index, 1);
            this.describetopics.topics.splice(index, 1);
        },

        // 简答
        short() {
            this.dialogshort = true;
        },
        shortTopic() {
            this.dialogshort = false;
            if (this.form.title != '') {
                this.shortarr.push(this.form.title);
            }
            let topicObj = {stem: this.form.title, answer: this.form.input1, score: this.topic_score.short_score}
            this.shorttopics.topics.push(topicObj);
        },
        delshort(index) {
            this.shortarr.splice(index, 1);
            this.shorttopics.topics.splice(index, 1);
        },

        // 确定创建考试
        finish() {
            
            if (this.state == 2) {  // 随机抽题
                let questionsArr = [];
                questionsArr.push(
                    {entype: 1, tnumber: this.testnumber.tnumber1, score: this.testnumber.tscore1}, 
                    {entype: 2, tnumber: this.testnumber.tnumber2, score: this.testnumber.tscore2},
                    {entype: 3, tnumber: this.testnumber.tnumber3, score: this.testnumber.tscore3},
                    {entype: 4, tnumber: this.testnumber.tnumber4, score: this.testnumber.tscore4},
                    {entype: 5, tnumber: this.testnumber.tnumber5, score: this.testnumber.tscore5}
                );
                let testinfo = {
                    courseid: this.subject.level,
                    gid: this.grades.level,
                    testnumber: questionsArr,
                    statime: this.datetime(this.testtime.start_time),
                    endtime: this.datetime(this.testtime.end_time),
                    fullscore: this.testData.fullscore,
                    testname: this.testData.examName
                }
                randomtopic(testinfo).then(
                    res => {
                        if (res.code == 201) {
                            this.$notify({
                                title: "success",
                                message: `${res.msg}`,
                                type: "success",
                            });
                            this.active = 3;
                            this.$router.replace('/testmanager');
                        } else if(res.code == 403) {
                            this.$notify.error({
                                title: "Error",
                                message: `${res.msg}`,
                            });
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
            
            } else if (this.state == 3) {  //Excel 导题
                
                let testinfo = {
                    courseid: this.subject.level,
                    gid: this.grades.level,
                    statime: this.datetime(this.testtime.start_time),
                    endtime: this.datetime(this.testtime.end_time),
                    fullscore: this.testData.fullscore,
                    testname: this.testData.examName
                }
                pourintopic(testinfo).then(
                    res => {
                        if (res.code == 201) {
                            this.$notify({
                                title: "OK",
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
                            this.active = 1;
                        }
                    }
                )

            } else {   // 手动录题 
                let questionsArr = [];
                questionsArr.push(this.singletopics, this.mulittopics, this.packtopics, this.describetopics, this.shorttopics);
                let testinfo = {
                    courseid: this.subject.level,
                    gid: this.grades.level,
                    questions: questionsArr,
                    statime: this.datetime(this.testtime.start_time),
                    endtime: this.datetime(this.testtime.end_time),
                    fullscore: this.testData.fullscore,
                    testname: this.testData.examName
                }
                createtopic(testinfo).then(
                    res => {
                        if (res.code == 201) {
                            this.$notify({
                                title: "OK",
                                message: `${res.msg}`,
                                type: "success",
                            });
                            this.active = 3;
                            this.$router.replace('/testmanager');
                        } else if (res.code == 411 || res.code == 410) {
                            this.$notify.error({
                                title: "Error",
                                message: `${res.msg}`,
                            });
                            this.active = 0;
                        }
                    }
                )
            }
            
        },

        // 上传Excel题表
        exceltopic() {
            
            let fromData = new FormData();
            fromData.append('extopic', document.getElementById('file').files[0])
            exltopic(fromData).then(
                res => {
                    if (res.code == 220) {
                        this.state = 3;
                        this.active = 2;
                    } else {
                        this.$notify.error({
                            title: "Error",
                            message: `${res.msg}`,
                        });
                    }  
                }
            )
        },

        // 题库随机抽题
        randoma() {
            this.dialogeandom = true;
            // this.active = 3
        },
        randomTopic() {
            this.dialogeandom = false;
            this.active = 2;
            this.state = 2;
        },

        // 日期转换
        datetime(stime) {
            let strtime = new Date(stime);
            strtime = strtime.getFullYear() + '-' + this.timAdd((strtime.getMonth() + 1)) + '-' + this.timAdd(strtime.getDate()) + ' ' +
                this.timAdd(strtime.getHours()) + ':' + this.timAdd(strtime.getMinutes()) + ':' + this.timAdd(strtime.getSeconds());
            return strtime;
        },
        timAdd(ro) {
        if (ro < 10) {
            ro = '0' + ro;
        }
        return ro;
        }

    },
    mounted() {
        document.querySelector('body').setAttribute('style', 'background-color:#64a9e3')
        personal().then(
          res => {
            this.testData.uid = res.uid
          }
        )

        findgrade().then(  //查课程
            res => {
                this.gradelist = res.data
            }
        )
    },
    destroyed() {
        document.querySelector('body').setAttribute('style','background-color:#fff');
    },

}
</script>

<style scoped>
    li {
        list-style: none;
    }

    .createTest {
        width: 800px;   
        height: 750px;
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

    .setTopic {
        margin-top: 50px;
    }

    .topicInput1 {
        width: 150px;
        margin-left: 8px;
    }

    .topicInput2 {
        width: 80px;
    }

    .topicUl {
        width: 500px;
        height: 200px;
        margin-top: 0px;
    }

    .topicUl li{
        width: 220px;
        height: 50px;
        line-height: 50px;
        margin-left: 0px;
        
    }

    .span { 
        width: 500px;
        height: 40px;
        line-height: 40px;
        margin-right: 10px;
        padding: 4px;
        border: 1px dashed red;
    }

    .finish {
        margin-top: 30px;
    }

    #file {
       
        position: fixed;
        left: 360px;
        top: 162px;
        width: 140px;
        height: 40px;
        border: 1px solid red;
        opacity: 0;
    }

    .topicInput3 {
        position: absolute;
        width: 200px;
    }
    
    .delBtn {
        float: right;
    }

</style>