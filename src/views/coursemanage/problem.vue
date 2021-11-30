<template>
    
    <div class="problemlist">
        <div class="headsloot">
           <el-button style="margin-top: 20px" type="primary" icon="el-icon-arrow-left" @click="goback">返回</el-button>
        </div>

        <div class="askmain">
            <div class="ask">
                <div class="record" v-for="(item, index) in askData" :key="index">
                    <div class="record_heads">
                        <el-avatar shape="square" :size="20" :src="item.head_img" class="record_heads_img"></el-avatar>
                        <span class="askname">{{ item.nickname }}</span>
                        <div class="record_content_ask_time">{{ item.ask_time }}</div>
                        <el-tag type="danger" effect="dark" class="record_heads_course_name" size="mini">{{ item.course_name }}</el-tag>
                        <div class="record_content">
                            <div class="record_content_ask_text">{{ item.ask_text }}</div>  
                            <el-button class="reply_btn" type="primary" icon="el-icon-edit" size="mini" circle @click="unfoldreply(item.ask_key)"></el-button>                          
                        </div>
                      
                    </div>
                    <div class="record_main" @click="seereply(item.ask_key)" >
                        <el-collapse style="border: none; ">
                            <el-collapse-item title="查看回答" name="1"  >
                                <div>回答内容</div>
                                <div class="record" v-for="(item, index) in reply_data" :key="index">
                                    <div class="record_heads">
                                        <el-avatar shape="square" :size="20" :src="item.head_img" class="record_heads_img"></el-avatar>
                                        <span class="askname">{{ item.nickname }}</span>
                                        <!-- <el-tag type="danger" effect="dark" class="record_heads_course_name" size="mini">{{ item.course_name }}</el-tag> -->
                                        <div class="record_content_ask_time">{{ item.replay_time }}</div>
                                        <div class="record_content">
                                            <div class="record_content_ask_text" style="font-size: 10px;">{{ item.replay_text }}</div>                            
                                        
                                        
                                        </div>
                                    
                                    </div>
                                   
                                    
                                </div>
                            </el-collapse-item>
                        </el-collapse>
                        
                    </div>
                    
                </div>

               

            </div>


        </div>

        <div class="fool">
            <div class="pagetool">
                    <el-pagination
                
                background
                @current-change="handleCurrentChange"
                :current-page.sync="pageNo"
                layout="prev, pager, next"
                :total="pagetotall">
                </el-pagination>

            </div>
            
        </div>


            <!-- 回复模态 -->
            <el-dialog title="回复内容" :visible.sync="dialogreplyVisible">
                        <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入回复内容"
                        v-model="reply_text">
                        </el-input>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmreply">确 定</el-button>
            </div>
            </el-dialog>


    </div>




</template>

<script>

import { course_selectask, course_showask, course_addreplay } from '@/api/coursemanage'
export default {

    data() {
        return {
            pageNo: 1,
            pagetotall:1,
            askData: [],
            reply_text:'',           //回复内容
            dialogreplyVisible: false,       //回复模态
            reply_key:'',
            reply_data:''

        }
    },
    methods: {
        handleCurrentChange(keyword = '') {

            course_selectask({
                page: this.pageNo,
                keyword: keyword
                
            }).then(
                res => {
                    console.log(res.data);
                    this.askData = res.data.desc;
                }
            )
            



        },
        //查看回答
        seereply(ask_key) {
         
            course_showask({
                ask_key
            }).then(
                res => {
                    if (res.code == 200) {
                        this.reply_data = res.data
                    }
                }
            )
        },
        //返回
        goback() {
            this.$router.push('/teachmanager/coursemanage')
        },

        //点击回复
        unfoldreply(ask_key) {
            this.dialogreplyVisible = true;
            this.reply_key = ask_key
            

        },
        //确认回复
        confirmreply() {

            if (this.reply_text != '') {
                this.dialogreplyVisible = false;
                course_addreplay({
                  
                    ask_key: this.reply_key,
                    replay_text: this.reply_text

                }).then(
                    res => {
                        console.log(res);
                        if (res.code == 200) {
                            this.$notify({
                                title: '成功',
                                message: '回复成功!',
                                type: 'success'
                            });
                          this.handleCurrentChange(keyword)
                          this.reply_text = '';                     //清除内容
                        } else {
                            this.$notify({
                                title: '失败',
                                message: '回复失败!请您检查网络，稍后重试！',
                                type: 'error'
                            });
                        }
                    }
                )
            } else {
                this.$notify({
                    title: '失败',
                    message: '回复内容不能为空!',
                    type: 'error'
                });
            }
           
            
        }


    },
    mounted() {
        this.handleCurrentChange()
            

    }
    
}
</script>


<style lang="less" scoped>
.problemlist {

    height: 100%;
    .headsloot {
        width: 1200px;
        height:100px;
        margin:  0 auto;
    }
    .askmain {
        width: 1200px;
        min-height: 800px;
        background-color: #fff;
        margin:  0 auto;
        box-shadow:  2px 5px 10px #999;
        
        .ask {
            height: auto;
            
            overflow: hidden;
            .record {
                height: auto;
                 border-bottom: 1px dashed #999;
                .record_heads {
                    margin: 20px 0;
                    .record_heads_img {
                        margin: 20px 30px 0 20px;
                    }
                    .askname {
                        color: #3a86ff;
                        font-size: 18px;
                        margin-right: 30px;
                    }
                    .record_heads_course_name {
                        margin-right: 30px;
                    }
                    .record_content {
                        margin: 20px 20px 20px 20px;
                        .record_content_ask_text {
                            height: auto;
                            font-size: 19px;
                        }
                        
                        

                    }
                    

                
                }
                .record_main {
                        height: auto;
                      
                        margin: 20px 20px 20px 40px;
                         
                        .answerdata {
                            color: #7f5539;
                        }

                }
                
                .record_content_ask_time {
                            margin-top: 30px;
                           
                            width: 200px;
                            color: #999;
                            float: right;
                           
                }
            }
        }
    }
    .fool {
        width: 1200px;
        height:100px;

        margin:  20px auto;
        text-align: center;
        .pagetool{
            width: 80%;
            margin: 0 auto;
        }
    }


}




</style>