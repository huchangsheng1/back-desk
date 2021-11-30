<template>
    <div class="coursedetails">
        <div class="headtool">
            <div class="createtool">
                <el-button type="primary" icon="el-icon-arrow-left" @click="goback" class="goback">上一页</el-button>
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addchapter" class="addchapter">新增章节</el-button>
                 
            </div>
        
        </div>

        <div class="course_main">
            <el-table
                :data="chapter_section_data"
                style="width: 100%"
                row-key="chapter_id"
                border
                lazy
                :load="load"
                :tree-props="{children: 'children'}">
                <el-table-column
                prop="chapter_id"
                label="编号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="chapter_name"
                label="章节名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="chapter_key"
                label="标识">
                </el-table-column>
                 <el-table-column label="操作">
                      <template slot-scope="scope">
                                <el-button type="warning"  size="mini" v-show="scope.row.chapter_key != 0" @click="seeresources(scope.row.chapter_id)">
                                    查看
                                </el-button>
                                <el-button type="success" size="mini" v-show="scope.row.chapter_key == 0" @click="addsection(scope.row.chapter_id)">添加</el-button>

                                <el-button type="primary" size="mini" @click="editchapterset(scope.row.chapter_id,scope.row.chapter_name)">修改</el-button>

                                <el-button type="danger" size="mini" @click="deletechapter(scope.row.chapter_id)">删除</el-button>
                                 
                      </template>
                    
                     
                </el-table-column>
                
            </el-table>
      </div>



      <!-- 创建章节 -->
        <el-dialog title="创建章节" :visible.sync="dialogaddchaptersVisible">
            <div class="foundchapter">
                <div class="chapterinputlist" v-for="(item, index) in chapterinputdata" :key="index +item">
                    <el-input v-model="item.chapter_name" placeholder="请输入章名称" ></el-input>
                </div>
               
               <div style="margin:20px 0">
                   节信息：
                   <el-button type="success" @click="addchapterInput" icon="el-icon-plus"></el-button>
                </div>

                <div class="sectioninptlist" v-for="(item, index) in sectioninputdata" :key="index">
                    <el-input v-model="item.section_name" placeholder="请输入节名称" class="sei"></el-input>
                    <a class="filelist">
                        <input type="file"  id="file" name="file" multiple @change="uploadresources" class="file"> 
                    
                    </a>
                     
                </div>
                
                

            </div>
  
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogaddchaptersVisible = false">取 消</el-button>
                <el-button type="primary" @click="addchapterdata()">确 定</el-button>
            </div>
        </el-dialog>


        <!-- 节资源 -->
        <el-drawer
        title="节资源"
        :visible.sync="drawer"
        
        :before-close="handleClose">
        <span>编号：{{ addresourceschapter_id }}</span>
        <!-- 视频文件 -->
        <div class="headstool">
            <el-button type="primary" size="mini" @click="sectionupload(addresourceschapter_id)">上传资源</el-button>
            
        </div>
        <div class="videolist">
            <div class="video" v-for="(item, index) in videodata" :key="index">
                <i class="videoKey"></i> 
                <a class="videoname">{{ item.srcname }}</a> 
                <i class="upvideo" @click="videodialog = true"></i>
                <a class="el-icon-delete-solid"   @click="sectiondelete(item.srcname, item.resources_key)" style="margin: 7px;"></a>
    
            </div>
        </div>

        <!-- ptf文件 -->
        <div class="ptflist">
           
           <div class="ptf" v-for="(item, index) in ptfdata" :key="index">
               <i class="ptfKey"></i> 
               <a class="ptfname">{{ item.srcname }}</a> 
               <i class="upptf"></i>
             <a class="el-icon-delete-solid" style="margin: 7px;"  @click="sectiondelete(item.srcname, item.resources_key)"></a>
            </div>
           
        </div>
        </el-drawer>


        <!-- 添加节 -->
        <el-dialog title="添加节" :visible.sync="addsectionVisible">
            <div class="addchapter">
                <div style="margin:20px 0">
                   节信息：
                   <el-button type="success" @click="addsectionInput" icon="el-icon-plus"></el-button>
                </div>

                <div class="sectioninptlist" v-for="(item, index) in addsectioninputdata" :key="index">
                    <el-input v-model="item.section_name" placeholder="请输入节名称" class="sei"></el-input>
                     
                    
                </div>
            </div>
  
            <div slot="footer" class="dialog-footer">
                <el-button @click="addsectionVisible = false">取 消</el-button>
                <el-button type="primary" @click="definesection()">确 定</el-button>
            </div>
        </el-dialog>


        <!-- 修改节名称 -->

        <el-dialog title="修改节" :visible.sync="altersectionVisible">
            <div class="addchapter">
                <div class="sectioninptlist">
                    <el-input v-model="alterchaptersectiondata" placeholder="请输入节名称" class="sei"></el-input>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="altersectionVisible = false">取 消</el-button>
                <el-button type="primary" @click="definealter()">确 定</el-button>
            </div>
        </el-dialog>


        <!-- 节上传资源 -->

         <el-dialog title="上传资源" :visible.sync="dialogaddsectionuploadVisible">
            <div class="sectionupload">
             <a class="se_dilelist">
                 <input type="file" id="file" name="file" multiple @change="section_resource_upload" class="se_file"> 
             </a>
            
                
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogaddsectionuploadVisible = false">取 消</el-button>
                <el-button type="primary" @click="addsectionupload()">确 定</el-button>
            </div>
        </el-dialog>




        <!-- 询问 -->
        <el-dialog
        title="提示"
        :visible.sync="dialogdeleteVisible"
        width="30%"
        :before-close="handleClose">
        <span>确认要删除次章/节吗？删除以后数据将不可恢复</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogdeleteVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmsectiondelete()">确 定</el-button>
        </span>
        </el-dialog>

        





        <!-- 编辑章节 -->

         



        
    </div>
</template>


<script>
import { 
course_foundchapters,
course_sectionresource, 
course_foundchapter, 
course_deletechapter, 
course_editchapter, 
course_fileupload, 
course_setchapter, 
course_addsection,
course_uploadresources,
course_delete_dir

} from '@/api/coursemanage'
export default {
    data(){
        return {
            chapterData:[],                   //章节初始数据
            chapter_section_data: [],        //章节数据
            dialogaddchaptersVisible: false,        //创建章节模态框
            dialogeditchaptersVisible: false,        //编辑章节模态框
            drawer: false,                           //节资源模态框
            dialogdeleteVisible: false,

            addsectionVisible: false,               //添加节模态框
            altersectionVisible: false,             //修改节名称
            dialogaddsectionuploadVisible: false,       //节资源上传模态
            alterchaptersectiondata:'',
            fileup:'',                                  //文件上传input
            

            direction: 'rtl',
            videodata: [],
            ptfdata: [],
            chapter_name: '',
            chapterinputdata: [{'chapter_name': ''}],                     //创建章input
            sectioninputdata: [{'section_name': ''}],                      //创建节input

            editchapterinputdata: [],   
                                                //编辑章input
            addsectioninputdata: [],                                       //添加节input


            addresourceschapter_id: '',                                       //节操作当前节id                 
            filesrc: '',
            sectionfilesrc: [],
            srcnamedata:'',
            addsectionchapter_key: '',                                         //添加节时的章id
            resourceskey: ''
           


        }
    },
    methods: {
        addchapterInput() {
            this.sectioninputdata.push({'section_name': ''})
        },

        addsectionInput() {
            this.addsectioninputdata.push({'section_name': ''})
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        //章节渲染
        chapter_render(){
            let chapter_course_id  = this.$route.params.course_id
            course_foundchapters({chapter_course_id}).then(
                res => {
                    
                    if (res) {
                        this.chapterData = res
                        let chapter = [] //
                        let section = []
                         this.chapterData.forEach((val) => {
                             if (val.chapter_key != 0) {
                                 section.push(val)
                             } else {
                                 chapter.push(val)
                             }
                         })
                        

                        chapter.forEach((once) => {
                                once['children'] = [];
                                section.forEach((val) => {
                                    if (val.chapter_key == once.chapter_id) {
                                            once['children'].push(val);
                                    }
                                }) 
                                    
                        })

            
                        this.chapter_section_data = chapter; 
                    } else {
                        this.$notify({
                            title: '小提示',
                            message: '该课程还没有章节！',
                         
                        });
                    }
                             
                }
            )
        },
        load(tree, treeNode, resolve) {
            setTimeout(() => {
                    resolve()
                }, 1000)
      
        },
        //节资源渲染
        seeresources(chapter_id) {
            this.addresourceschapter_id = chapter_id
             this.drawer = true
             let chapter_course_id  = this.$route.params.course_id
            course_sectionresource({chapter_course_id, chapter_id}).then(
                res => {
                    console.log(res.data, '资源');
                    this.videodata = res.data.video;
                    this.ptfdata = res.data.ppt;

                }
            )

        },


        //创建章节模态
        addchapter() {
            this.dialogaddchaptersVisible = true
        },

        //上传资源
        uploadresources() {
             let formdata = new FormData()
             formdata.append('file_data',document.querySelector('.file').files[0])
             course_fileupload(formdata).then(
                 res => {
                     if (res.code == 200) {
                         this.$notify({
                            title: '成功',
                            message: '上传成功！',
                            type: 'success'
                            });
                        this.filesrc = res.data;
                        
                     } else if (res.code == 401) {
                         this.$notify({
                            title: '失败',
                            message: '暂不支持此格式!',
                            type: 'error'
                            });
                            document.querySelector('.file').value = ''
                     } else if (res.code == 402) {
                         this.$notify({
                            title: '失败',
                            message: '文件过大!',
                            type: 'error'
                            });
                     } else{
                         this.$notify({
                            title: '失败',
                            message: '上传失败，请稍后重试',
                            type: 'error'
                            });
                     }
                    
                 }
             )


        },
        //创建章节
        addchapterdata() {
            this.dialogaddchaptersVisible = false
             let chapter_course_id  = this.$route.params.course_id
            // console.log(this.chapterinputdata, this.sectioninputdata, this.filesrc);
                let addchapterdatalist = []
                this.chapterinputdata.forEach((val, key) => {
                        addchapterdatalist.push({
                                'chapter_sort' : key,
                                'chapter_course_id': chapter_course_id,
                                'chapter_name' : val.chapter_name,
                                'section_set' :[]
                                })
                        this.sectioninputdata.forEach((once,index) => {
                            addchapterdatalist[key]['section_set'].push({
                                chapter_sort:index,
							    section_name:once.section_name,
                                src: []
                            })
                            

                        });
                         addchapterdatalist[key]['section_set'].forEach((val) => {
                             if( this.filesrc[0]) {
                                  this.filesrc.forEach((vals) => {
                                   val['src'].push(vals.filesrc)
                                })
                             }
                               
                            
                         })
                         
                        

                });

                course_foundchapter(addchapterdatalist).then(
                    res => {
                   
                        if (res.code == 200) {
                        this.$notify({
                            title: '成功',
                            message: '创建成功！',
                            type: 'success'
                            });
                        this.chapter_render()
                        this.chapterinputdata = [{'chapter_name': ''}]                  
                        this.sectioninputdata =  [{'section_name': ''}]
                         document.querySelector('.file').value = '' 
                        } else {
                        this.$notify({
                            title: '失败',
                            message: '创建失败!请您检查网络，稍后重试！',
                            type: 'error'
                            });
                        }
                    }
                )

                 
        },

        //删除章节
        deletechapter(chapter_id) {
            let chapter_course_id  = this.$route.params.course_id;

            course_deletechapter({
                chapter_course_id,
                chapter_id
            }).then(
                res => {
                    if (res.code == 200) {
                        this.$notify({
                            title: '成功',
                            message: '删除成功！',
                            type: 'success'
                            });
                        this.chapter_render()
                        } else {
                        this.$notify({
                            title: '失败',
                            message: '删除失败!请您检查网络，稍后重试！',
                            type: 'error'
                            });
                    }
                }
            )
            

        },

        //点击编辑章节
        editchapter() {
            this.dialogeditchaptersVisible = true
            let chapter_course_id  = this.$route.params.course_id;
            course_editchapter({chapter_course_id}).then(
                res => {
                    console.log(res,'编辑回显');
                    this.chapterData = res
                       
                         this.chapterData.forEach((val) => {
                             if (val.chapter_key == 0) {
                                 this.editchapterinputdata.push(val)
                             } else {
                                 this.editsectioninputdata.push(val)
                             }
                         })

                         this.editchapterinputdata.forEach((once) => {
                                once['children'] = [];
                                 this.editsectioninputdata.forEach((val) => {
                                    if (val.chapter_key == once.chapter_id) {
                                            once['children'].push(val);
                                    }
                                }) 
                                    
                        })

                        console.log(this.editchapterinputdata);
                }
            )

        },

/***********************************************/
        //点击添加
        addsection(chapter_key){
            this.addsectionVisible = true;
            this.addsectionchapter_key = chapter_key;
        },

        //确认添加
        definesection(chapter_key) {
            
            this.addsectionVisible = false;

            let chapter_course_id  = this.$route.params.course_id
            let addsectiondata = [];
           this.addsectioninputdata.forEach((val, key) => {

                addsectiondata.push({
                    chapter_course_id,
                    chapter_key:this.addsectionchapter_key,
                    section_name: val.section_name,
                    chapter_sort: key 

                })
               
           })

       
            course_addsection(addsectiondata).then(
                res => {
                    if (res.code == 200) {
                        this.$notify({
                            title: '成功',
                            message: '添加成功！',
                            type: 'success'
                            });
                        this.chapter_render()
                        } else {
                        this.$notify({
                            title: '失败',
                            message: '添加失败!请您检查网络，稍后重试！',
                            type: 'error'
                            });
                    }
                    
                }
            )


             
        },



        //点击编辑章节
        editchapterset(chapter_id, chaptername) {
            this.altersectionVisible = true
            this.alterchaptersectiondata = chaptername;
            this.alterchapterchapter_id = chapter_id;
        },

        //确认修改
        definealter() {
            this.altersectionVisible = false;
            course_setchapter({
                chapter_id:this.alterchapterchapter_id,
                chapter_name: this.alterchaptersectiondata
            }).then(
                res => {
                   if (res.code == 200) {
                        this.$notify({
                            title: '成功',
                            message: '修改成功！',
                            type: 'success'
                            });
                        this.chapter_render()
                        } else {
                        this.$notify({
                            title: '失败',
                            message: '修改失败!请您检查网络，稍后重试！',
                            type: 'error'
                            });
                    }
                }
            )
        },


        // 点击节上传资源
        sectionupload(chapter_id) {
            console.log(chapter_id);
            this.dialogaddsectionuploadVisible = true;
            this.addresourceschapter_id = chapter_id;
            
        },
        //上传
        section_resource_upload() {
            let formdata = new FormData()
             formdata.append('file_data',document.querySelector('.se_file').files[0])
             course_fileupload(formdata).then(
                 res => {
                     
                     res.data.forEach((val)=> {
                         this.sectionfilesrc.push(val.filesrc)
                     })
                 }
             )
        },

        //确认上传
        addsectionupload() {
            this.dialogaddsectionuploadVisible = false
            ;
            console.log(this.sectionfilesrc);
            course_uploadresources({
                chapter_id: this.addresourceschapter_id,
                src: this.sectionfilesrc
                
            }).then(
                res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$notify({
                            title: '成功',
                            message: '上传成功！',
                            type: 'success'
                            });
                        this. seeresources(this.addresourceschapter_id)
                        } else {
                        this.$notify({
                            title: '失败',
                            message: '上传失败!请您检查网络，稍后重试！',
                            type: 'error'
                            });
                    }
                }
            )

        },

        //点击节删除
        sectiondelete(srcname, resources_key){
            this.dialogdeleteVisible = true
            this.srcnamedata = srcname
            this.resourceskey = resources_key
            
        },

        //确认删除
        confirmsectiondelete(srcname){
            this.dialogdeleteVisible = false
            course_delete_dir({
                sourcename: this.srcnamedata,
                resources_key: this.resourceskey
            }).then(
                res => {
                    console.log(res,'删除成功！');
                    if (res.code == 200) {
                        this.$notify({
                            title: '成功',
                            message: '删除成功！',
                            type: 'success'
                            });
                        this. seeresources(this.addresourceschapter_id)
                        } else {
                        this.$notify({
                            title: '失败',
                            message: '删除失败!请您检查网络，稍后重试！',
                            type: 'error'
                            });
                    }
                }
            )
        },
        //返回
        goback() {
             this.$router.push(`/teachmanager/coursemanage`)
        }

        

    },
    mounted() {
        this.chapter_render()
        

    },
}
</script>

<style lang="less" scoped>
    .sei {
        width: 150px;
        margin-right: 20px;
        float: left;
    }
    .se_dilelist {
         display: block;
        width: 60px;
        height: 40px;
        float: left;
        background: url('../../assets/resources_images/updir.png') no-repeat;
        background-size: contain;
        overflow: hidden;
        .se_file {
            width: 60px;
            height: 20px;
            cursor:pointer;
            font-size:0;
            opacity:0;
            border: 1px solid #333;
        
            background-color: #fff;
        }
    }

    .char {
        width: 300px;
    }
    .filelist {
        display: block;
        width: 60px;
        height: 40px;
        float: left;
        background: url('../../assets/resources_images/updir.png') no-repeat;
        background-size: contain;
        overflow: hidden;
        .file {
            width: 60px;
            height: 20px;
            cursor:pointer;
            font-size:0;
            opacity:0;
            border: 1px solid #333;
        
            background-color: #fff;
        }

    }
    

    .headstool {
        width: 400px;
        margin: 0 auto;
    }
    .videolist{
        width: 400px;
        height: 50%;
        overflow: hidden;
        margin: 0 auto;
        border: 1px solid #999;
        .video {
            width: 80%;
            height: 30px;
            margin: 10px auto;
            background-color: #f5f5f5;
            .videoKey {
                display: block;
                width: 30px;
                height: 30px;
                background: url('../../assets/resources_images/videoKey.png');
                background-size: contain;
                margin-right: 20px;
                float: left;

            }
            .videoname {
                display: block;
                width: 60%;
                line-height: 30px;
                font-size: 12px;
                float: left;
                overflow: hidden;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                -webkit-text-overflow: ellipsis;
                -moz-text-overflow: ellipsis;
                white-space: nowrap;

            }
            .upvideo {
                display: block;
                width: 20px;
                height: 20px;
                background: url('../../assets/resources_images/upvideo.png');
                margin: 5px 10px;
                background-size: contain;
                cursor:pointer;
                float: right;
            }
            .sectiondelete{
                // display: block;
                width: 2px;
                float: left;
            }          



        }
        .video:hover {
             box-shadow: 2px 2px 2px 2px #999;
        }

        
    }

    .ptflist{
        width: 400px;
        height: 50%;
        overflow: hidden;    
        margin: 0 auto;
        border: 1px solid #999;
        .ptf {
            width: 80%;
            height: 30px;
            margin: 10px auto;
            background-color: #f5f5f5;
            .ptfKey {
                display: block;
                width: 30px;
                height: 30px;
                background: url('../../assets/resources_images/pptKey.png');
                background-size: contain;
                margin-right: 20px;
                float: left;

            }
            .ptfname {
                display: block;
                width: 60%;
                line-height: 30px;
                font-size: 12px;
                float: left;
                overflow: hidden;
                text-overflow: ellipsis;
                -o-text-overflow: ellipsis;
                -webkit-text-overflow: ellipsis;
                -moz-text-overflow: ellipsis;
                white-space: nowrap;

            }
            .upptf {
                display: block;
                width: 20px;
                height: 20px;
                background: url('../../assets/resources_images/upvideo.png');
                margin: 5px 10px;
                background-size: contain;
                cursor:pointer;
                float: right;
            }
            .sectiondelete{
                display: block;
                width: 20px;
                float: right;
            }          



        }
        .ptf:hover {
             box-shadow: 2px 2px 2px 2px #999;
        }

        
    }
.coursedetails{
    .headtool {
        width: 1200px;
        margin: 0 auto;
        height: 100px;
        .createtool{
            margin-top: 20px;
            .goback{
                float: left;

            }
            .addchapter {
                float: right;

            }
        
        }
        
    }
    
    .course_main {
        width: 1200px;
        min-height: 800px;
        height: auto;
        margin: 0 auto;
    }

}
    

    


</style>