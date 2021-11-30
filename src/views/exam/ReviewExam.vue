<template>
    <div class="topic">
        <div class="testTitle">
            <h2 class="h2">{{ tname }}</h2>
            <h5 class="h5">所属科目：{{ cname }}</h5>
        </div>

        <!-- 单选 -->
        <h4>一、单项选择题</h4>
        <div class="subject" v-for="(item, index) in single" :key="item.tid">
            <p class="stitle"> {{ (index +1) + '、' + item.t_stem }}（{{ item.t_score }}分） </p>
            <p class="option">
                <el-radio v-model="item.tanswer" label="A" class="radio" clearable> {{ item.A }} </el-radio>
                <el-radio v-model="item.tanswer" label="B">{{ item.B }}</el-radio>
                <el-radio v-model="item.tanswer" label="C">{{ item.C }}</el-radio>
                <el-radio v-model="item.tanswer" label="D">{{ item.D }}</el-radio>
            </p>
            <p class="answer">
                <span class="sanswer">参考答案：{{ item.t_answer }}</span>
                <span class="score">得分：{{ item.tscore }}</span>
            </p>
        </div>
        <!-- 多选 -->
        <h4>二、多项选择题</h4>
        <div class="subject" v-for="(item, index) in mulit" :key="item.tid">
            <p class="stitle">
                {{ (index +1) + '、' + item.t_stem }}（{{ item.t_score }}分）
            </p>
            <p class="option">
                <el-checkbox v-model="item.ttobj[item.tid+'A']" label="A">{{ item.A }}</el-checkbox>
                <el-checkbox v-model="item.ttobj[item.tid+'B']" label="B">{{ item.B }}</el-checkbox>
                <el-checkbox v-model="item.ttobj[item.tid+'C']" label="C">{{ item.C }}</el-checkbox>
                <el-checkbox v-model="item.ttobj[item.tid+'D']" label="D">{{ item.D }}</el-checkbox>
            </p>
            <p class="answer">
                <span class="sanswer">参考答案：{{ item.t_answer }}</span>
                <span class="score">得分：{{ item.tscore }}</span>
            </p>
        </div>
        <!-- 填空 -->
        <h4>三、填空题</h4>
        <div class="subject" v-for="(item, index) in pack" :key="item.tid">
            <p class="stitle">
                {{ (index +1) + '、' + item.t_names }}（{{ item.t_score }}分）
            </p>
            <p class="option">
                提交答案：{{ item.tanswer }}
            </p>
            <p class="answer">
                <span class="sanswer">参考答案：{{ item.t_answer }}</span>
                得分：<el-input-number 
                    v-model="item.tscore"
                    size="mini" class="topicInput2" 
                    label="1" 
                    controls-position="right" 
                    @change="handleChange" :min="0" :max="item.t_score">
                    </el-input-number>
            </p>
        </div>
        <!-- 描述 -->
        <h4>四、描述题</h4>
        <div class="subject" v-for="(item, index) in describe" :key="item.tid">
            <p class="stitle">
                {{ (index +1) + '、' + item.t_names }}（{{ item.t_score }}分）
            </p>
            <p class="option">提交答案：{{ item.tanswer }}</p>
            <p class="answer">
                <span class="sanswer">参考答案：{{ item.t_answer }}</span>
                得分：<el-input-number 
                    v-model="item.tscore"
                    size="mini" class="topicInput2" 
                    label="1" 
                    controls-position="right" 
                    @change="handleChange" :min="0" :max="item.t_score">
                    </el-input-number>
            </p>
        </div>
        <!-- 简答 -->
        <h4>五、简答题</h4>
        <div class="subject" v-for="(item, index) in short" :key="item.tid">
            <p class="stitle">
                {{ (index +1) + '、' + item.t_names }}（{{ item.t_score }}分）
            </p>
            <p class="option">提交答案：{{ item.tanswer }}</p>
            <p class="answer">
                <span class="sanswer">参考答案：{{ item.t_answer }}</span>
                得分：<el-input-number 
                    v-model="item.tscore"
                    size="mini" class="topicInput2" 
                    label="1" 
                    controls-position="right" 
                    @change="handleChange" :min="0" :max="item.t_score">
                    </el-input-number>
            </p>
        </div>

        <div class="alterBtn">
            <el-button class="filter-item btn" style="margin-left: 2px;" type="primary" icon="el-icon-refresh-plus" @click="finish">完成批改</el-button>
        </div>
    </div>
    
</template>

<script>
import { reviewexam, completereview } from '@/api/exam'

export default {
    name: 'ReviewExam',
    data() {
        return {
            tname: '',
            cname: '',
            uid: '',
            test_key: '',
            mulitLi: {
                check: [],
            },
            single: [], // 单选
            mulit: [], // 多选
            pack: [], // 填空
            describe: [], // 描述
            short: [], // 简答
        }
    },
    methods: {
        handleChange(value) {
        },
        finish() {
            let fractionArr = [];
            for (let x = 0; x < this.single.length; x ++) {  //单选
                let fractionObj = {tid: this.single[x]['tid'], mark: this.single[x]['tscore']}
                fractionArr.push(fractionObj)
            };
            for (let y = 0; y < this.mulit.length; y ++) {  //多选
                let fractionObj = {tid: this.mulit[y]['tid'], mark: this.mulit[y]['tscore']}
                fractionArr.push(fractionObj)
            };
            for (let y = 0; y < this.pack.length; y ++) {  //填空
                let fractionObj = {tid: this.pack[y]['tid'], mark: this.pack[y]['tscore']}
                fractionArr.push(fractionObj)
            };
            for (let y = 0; y < this.describe.length; y ++) {  //描述
                let fractionObj = {tid: this.describe[y]['tid'], mark: this.describe[y]['tscore']}
                fractionArr.push(fractionObj)
            };
            for (let y = 0; y < this.short.length; y ++) {  //简答
                let fractionObj = {tid: this.short[y]['tid'], mark: this.short[y]['tscore']}
                fractionArr.push(fractionObj)
            };
            let info = {test_key: this.test_key, uid: this.uid, fraction: fractionArr}
            completereview(info).then(
                res => {
                    if (res.code == 219) {
                        this.$notify({
                        title: "success",
                        message: `${res.msg}`,
                        type: "success",
                    });
                    this.$router.replace('/stayexam');
                    }
                }
            )
        }
    },
    mounted() {
        document.querySelector('body').setAttribute('style', 'background-color:#64a9e3');
        this.uid = this.$route.params.uid;
        this.test_key = this.$route.params.tkey;
        this.tname = this.$route.params.tname;
        this.cname = this.$route.params.cname;

        let data = {uid: this.uid, test_key: this.test_key}
        reviewexam(data).then(
            res => {
                let topics = res.answerdetails
                let singleArr = [],
                    mulitArr = [];
                for (let x = 0; x < topics.length; x++) {
                    singleArr = topics[x]["1"];
                    mulitArr = topics[x]["2"];
                    this.pack = (topics[x]["3"]);
                    this.describe = (topics[x]["4"]);
                    this.short = (topics[x]["5"]);
                }

                let optionArr = []
                for (let y = 0; y < singleArr.length; y++) {
                    // console.log(singleArr[y]);
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
                        tanswer: singleArr[y]["tanswer"],
                        tscore: singleArr[y]["tscore"]

                    };
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
                    let manswer =  mulitArr[s]["tanswer"].split('')

                   
                     let ttobj = {}
                    for(let i =0; i< manswer.length ; i++ ) {
                        
                        ttobj[mulitArr[s]["tid"]+`${manswer[i]}`] = true;
                        
                    }

                    this.mulitLi.check.push(...manswer);
                    optionArr.push(A, B, C, D)

                    let mulitObj = {
                        tid: mulitArr[s]["tid"],
                        optionObj: optionArr,
                        ttobj,
                        A: A,
                        B: B,
                        C: C,
                        D: D,
                        t_stem: t_stem,
                        t_answer: mulitArr[s]["t_answer"],
                        t_score: mulitArr[s]["t_score"],
                        tanswer: mulitArr[s]["tanswer"],
                        tscore: mulitArr[s]["tscore"]
                    };
                    this.mulit.push(mulitObj);
                }

            }
        )
    },
    destroyed() {
        document.querySelector('body').setAttribute('style','background-color:#fff');
    },
}
</script>


<style scoped>
    .topic {
        width: 800px;
        height: 730px;
        margin: 0 auto;
        background: #fff;
        padding-left: 10px;
        overflow-y: scroll;
    }

    .testTitle {
        width: 370px;
        height: 40px;
        margin: 0 auto;
        text-align: center;
    }

    .h2 {
        width: 180px;
        height: 40px;
        float: left;
    }

    .h5 {
        width: 180px;
        height: 40px;
        float: left;
        line-height: 40px;
    }
    .h5::after, ::before {
        content: '';
        height: 0;
        line-height: 0;
        clear: both;
        display: block;
        visibility: hidden;
    }

    .subject {
        width: 600px;
        height: auto;
        padding-left: 6px;
    }

    .stitle {
        width: 600px;
        height: 40px;
        line-height: 40px;
    }

    .option {
        width: 600px;
        height: 40px;
        line-height: 40px;
    }

    .answer {
        width: 600px;
        height: 120px;
        line-height: 40px;
        padding-left: 6px;
        background-color: #f5f5f5;
    }
    span {
        display: block;
        width: 600px;
        height: 40px;
        margin-top: 10px;
    }

    .topicInput2 {
        width: 76px;
    }

    .alterBtn {
        position: fixed;
        right: 310px;
        bottom: 70px;
    }
</style>