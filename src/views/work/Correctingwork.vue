<template>
    <div class="box_up">
        <el-button :plain="true" @click="open" style="display:none">打开消息提示</el-button>
        <el-button :plain="true" @click="down" style="display:none">打开消息提示</el-button>
        <div class="overblack" @click="backTop">^</div>
        <!-- <a href="javascript:void(0)">aaa</a> -->
        <div class="logo">
            <p>学生id: <span>&nbsp;&nbsp;&nbsp;{{studnetID}}</span></p>
            <p>
                学生姓名:
                <el-select v-model="value" placeholder="请选择" @change="replace(value)">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                  </el-option>
                </el-select>
            </p>
            <p>学生得分: <span>{{full}}</span></p>
            <div @click="Correct(value)" style="" class="submit">提交</div>
            <div class="clear"></div>        
        </div>
        <div class="box">

        <div class="centent">
            <!-- <button @click="upper " class="test_info">返回上一层</button> -->
            <div :class="{text_content: text_content != ''}">{{text_content}}</div>
                <div class="box_left" >
                    <div v-for="(topics,index) in sortedTopics" :key="index" >
                        <div class="topicsType" v-if="topics.topic_content.length != 0 ">
                            
                            <h4 v-if="topics.topicType == 1">一.&nbsp;&nbsp;单选题</h4>
                            <h4 v-if="topics.topicType == 2">二.&nbsp;&nbsp;多选题</h4>
                            <h4 v-if="topics.topicType == 3">三.&nbsp;&nbsp;填空题</h4>
                            <h4 v-if="topics.topicType == 4">四.&nbsp;&nbsp;描述题</h4>
                            <h4 v-if="topics.topicType == 5">五.&nbsp;&nbsp;简答题</h4>        
                            <div class="topic-content" v-for="(t, index) in topics.topic_content" :key="index" style="margin-left:20px;margin-bottom: 10px">
                               
                                <div>
                                   {{index+1}}.&nbsp;&nbsp; {{t.substr(0,t.indexOf('|'))}} 
                                   <span class="fraction"> <input type="text" name="" id="" style="width:50px;outline: none;text-align: center;" v-model="minute[t.substr(0,t.indexOf('|'))]">分数</span>
                                   
                                </div>
                                 <!-- 单选 -->
                                <div class="radio" v-if="topics.topicType == 1" readonly>
                                 <el-radio v-for="(item,index) in (t.substring(t.indexOf('|')+1, t.lastIndexOf('|')).split(','))" :key="index" v-model="lest[t.substr(0,t.indexOf('|'))]"
                                  :label="item.substr(0,item.indexOf('.'))" 
                                  style="display:block; margin:10px" :disabled="(item.substr(0,item.indexOf('.')) == lest[t.substr(0,t.indexOf('|'))])? false:true">
                                    {{ item }}
                                  </el-radio>
                                  <div class="yeschar">
                                      
                                        <p>我选的答案：{{t.substring(t.lastIndexOf('|')+1, t.indexOf('('))}}</p>
                                        <p>正确答案：{{t.substring(t.indexOf('[')+1, t.indexOf(']'))}}</p>    
                                  </div>
                                </div>

                                <!-- 多选 -->
                                <div class="checkbox" v-if="topics.topicType == 2">
                                 <el-checkbox-group v-model="lest[t.substr(0,t.indexOf('|'))]">
                                    <el-checkbox :label="item.substr(0,item.indexOf('.')).trim()" v-for="(item,index) in (t.substring(t.indexOf('|')+1, t.lastIndexOf('|')).split(','))" 
                                    :key="index" 
                                    style="display:block; margin:10px;" :disabled="(item.substr(0,item.indexOf('.')).trim() == lest[t.substr(0,t.indexOf('|'))])? false:true"
                                    >
                                     {{ item }}
                                    </el-checkbox>
                                    </el-checkbox-group>
                                    <div class="yeschar">
                                        <p>我选的答案：{{t.substring(t.lastIndexOf('|')+1, t.indexOf('('))}}</p>
                                        <p>正确答案：{{t.substring(t.indexOf('[')+1, t.indexOf(']'))}}</p>
                                    </div>
                                </div>      

                                <!-- 填空题 -->
                                <div class="fillInBlank" v-if="topics.topicType == 3">        
                                   <div v-for="(item,indexs) in (t.substring(t.indexOf('|')+1, t.lastIndexOf('|')).split(','))" :key="indexs" >
                                        <el-input  type="textarea"  :rows="2"  :placeholder="t.substring(t.lastIndexOf('|')+1,t.indexOf('('))" v-model="t.o" style="width:400px" ref="test" disabled class="input_box"></el-input>
                                      </div>
                                     <div class="yeschar">
                                       <p>我选的答案：{{t.substring(t.lastIndexOf('|')+1, t.indexOf('('))}}</p>
                                       <p>正确答案：{{t.substring(t.indexOf('[')+1, t.indexOf(']'))}}</p>
                                    </div>
                                </div>
                                <!-- 描述题 -->
                                <div class="text" v-if="topics.topicType == 4">
                                    <div v-for="(item,index) in (t.substring(t.indexOf('|')+1, t.lastIndexOf('|')).split(','))" :key="index" >
                                        <!-- <div>{{item}}</div> -->
                                        <el-input  type="textarea"  :rows="2"  :placeholder="t.substring(t.lastIndexOf('|')+1,t.indexOf('('))"  v-model="t.o" style="width:400px" ref="des" disabled class="input_box"></el-input>
                                    </div>
                                      <div class="yeschar">
                                        <p>我选的答案：{{t.substring(t.lastIndexOf('|')+1, t.indexOf('('))}}</p>
                                        <p>正确答案：{{t.substring(t.indexOf('[')+1, t.indexOf(']'))}}</p>
                                    </div>
                                </div>

                                <div class="text" v-if="topics.topicType == 5">
                                    <div v-for="(item,index) in (t.substring(t.indexOf('|')+1, t.lastIndexOf('|')).split(','))" :key="index" >
                                        <!-- <div>{{item}}</div> -->
                                        <el-input  type="textarea"  :rows="2"  :placeholder="t.substring(t.lastIndexOf('|')+1,t.indexOf('('))"  v-model="t.o" style="width:400px" ref="br" disabled class="input_box"></el-input>
                                    </div>
                                      <div class="yeschar">
                                          <p>我选的答案：{{t.substring(t.lastIndexOf('|')+1, t.indexOf('('))}}</p>
                                          <p v-if="t.substring(t.indexOf('[')+1, t.indexOf(']'))">正确答案：{{t.substring(t.indexOf('[')+1, t.indexOf(']'))}}</p>
                                          <p v-if="!t.substring(t.indexOf('[')+1, t.indexOf(']'))">正确答案：未批改</p>
                                    </div>
                                </div>
                            </div>                                                                                                                                                                                                                                                                                                              
                      </div>    
                                                                                                                                                                                                                                     
                    </div>
                </div>
        </div>    
    </div>

    </div>
</template>

<script>
import "@/assets/less/testPaper.less";
import {correctingwork,Lookstudentworks,HomeWorkCorrecting} from '@/api/work'
export default {
    data(){
        return {
             //按题目类型分类好的题目数据
             //题目类型==>  1:单选题  2:多选题  3:填空题   4:描述  5:简答题
            sortedTopics: [
                { topicType: 1, topic_content: [] },
                { topicType: 2, topic_content: [] },
                { topicType: 3, topic_content: [] },
                { topicType: 4, topic_content: [] },
                { topicType: 5, topic_content: [] },
            ],
            hao:['one','two',"three"],
            radio: '',
            checkList: ['选中且禁用','复选框 A'],
            textarea:'',
            full:'',
            nowtime:"00:00:00",
            dialogVisible: false,
            wow:'',
            test_key:'',
            answer:[],//全部题
            ccw:[],
            suo:[],
            lest:{},
            disabled:false,
            text_content:'',
            isLoading:true,
            studnetID:'',
            options: [],
            value: '',
            minute:[]


        }
    },
    mounted(){
            let uid = ''
            // console.log(this.$route.query.workNub,this.$route.query.gid)
            let date = {
                    workNub:this.$route.query.workNub,
                    course_id:this.$route.query.course_id
            }
            correctingwork({params:date}).then(
                res => {
                    // console.log(res.date)
                    if(res.code == 200){
                        res.date.forEach((item,key) => {
                            this.options.push({
                                value: item.uid,
                                label: item.student
                            })
                        })
                    }
                })
    //回到顶部
    window.addEventListener('scroll', this.scrollToTop)                                
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollToTop)
    },

    methods:{
        upper(){
            this.$router.push('/work')
        },
        replace(n){
            this.studnetID = n;
            let date = {
                test_key: this.$route.query.workNub, 
                uid: n,
                course_id: this.$route.query.course_id, 
            }
            this.sortedTopics.forEach(item => {
                item.topic_content.length = 0
            })
            Lookstudentworks({params:date})
             .then(
                 result => {
                    console.log(result)
                      if(result.code == 200){
                          result.data.forEach((element,key)=> {
                            //   console.log(element)
                              for (let item of this.sortedTopics) {
                                 // console.log(element.substring(element.indexOf('(')+1,element.lastIndexOf(')')))
                                  if( element.substring(element.indexOf('(')+1,element.lastIndexOf(')')) == item.topicType){
                                      item.topic_content.push(element)
                                       if(element.substr(element.indexOf('(')+1,1) == 1 ){//判断是不是单选 走不同的model
                                         this.$set(this.lest,element.substr(0,element.indexOf('|')),element.substring(element.lastIndexOf('|')+1,element.indexOf('(')))
                                     }else if(element.substr(element.indexOf('(')+1,1) == 2){//判断是否是多选 走不同的model
                                         let option = element.substring(element.lastIndexOf('|')+1,element.indexOf('('));
                                         let newoption = option.split('')
                                         this.$set(this.lest, element.substr(0,element.indexOf('|')), newoption);                                         
                                     }else {
                                         this.$set(this.lest, element.substr(0,element.indexOf('|')), element.substring(element.lastIndexOf('|')+1,element.indexOf('(')));       
                                     }
                                  }
                              }
                          });
                     }  
                     if(result.code == 400){
                         this.text_content = `该学生还未提交作业`
                     }
                    //  console.log(this.sortedTopics)
             })
        },
        Correct(uid){
            // console.log(uid)
            let Arr = []
            Object.keys(this.minute).forEach(item =>{
                // console.log(item)
                Arr.push({
                    workname:item,
                    full:this.minute[item],
                })
            })
            let date ={
                uid:uid,
                tid:this.$route.query.workNub,
                work_json:Arr
            }
            HomeWorkCorrecting({params:date})
                .then(
                    res => {
                        if(res.code == 200) {
                            this.open()
                        }else if(res.code = 400){
                             this.down()
                        }
                    }
                )
        },
        //批改成功提示
         open() {
          this.$message('批改成功');
        },
        down(){
            this.$message('未选择学生或未批改');
        },
         backTop () {
            const that = this
            let timer = setInterval(() => {
              let ispeed = Math.floor(-that.scrollTop / 5)
              document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
              if (that.scrollTop === 0) {
                clearInterval(timer)
              }
            }, 16)
        },
         scrollToTop () {
            const that = this
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            that.scrollTop = scrollTop
            if (that.scrollTop > 60) {
              that.btnFlag = true
            } else {
              that.btnFlag = false
            }
        }
    }
}
</script>
<style scoped lang="less">

.box_up{
    margin: 10px auto;
    width: 1200px;
    height: auto;
    // border: 1px solid #4fb16c;
    .logo{
        width: 1200px;
        
        height: 170px;
        border: 1px solid #fff;
        background: #fff;
        p {
            margin-left: 10px;
            width: 300px;
            // border: 1px solid red;
        }
    }
    .box {
        background: #fff;
        .centent {
            margin: 20px auto;
            width: 1200px;
            height: auto;
            overflow: hidden;
            text-align: left;
            // border: 1px solid #888888;
            box-shadow: 5px 5px 5px #8888885d;
            border-radius: 10px;
            .box_left {
                margin-top: 10px;
                margin-left: 20px;
                .fraction {
                    float: right;
                    margin-right: 100px;
                }
            }
            .test_info {
                margin-top: 10px;
                margin-left: 10px;
                padding: 5px;
                border:1px solid rgb(168, 167, 167);
                color: rgb(211, 210, 210);
                background:#409EFF;
                border-radius: 3px;
                cursor: pointer;
               
            }
            .test_info:hover {
                background:#bbbec2;
            }
            .input_box{
                margin: 10px auto;
                margin-left: 30px;
            }
            .input_box:focus {
                outline: none;
                border: 2px solid #1aa6b7;
            }
            .yeschar {
                margin-left: 30px;
                width: 300px;
                border: 1px solid rgba(0, 0, 0, 0.281);
                p{
                    margin: 10px auto;

                }
            }
        }
    }
}
.clear {
    margin-top: 10px;
    clear: both;
}
.overblack {
    position:fixed;
    right: 100px;
    bottom: 20px;
    width: 50px;
    height: 40px;
    line-height: 45px;
    // background: red;
    font-size: 30px;
    text-align: center;
    // border: 1px solid red;
    background: #409EFF;
    
    
}
.submit {
    margin-left: 10px;
    padding: 2px;
    width: 100px;
    // float: left;
    text-align: center;
    border: 1px solid rgb(189, 186, 186);
    border-radius: 5px;
    cursor: pointer;
}
.submit:hover {
    background: #409EFF;
}
</style>