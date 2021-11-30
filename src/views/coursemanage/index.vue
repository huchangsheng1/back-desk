<template>
    <div class="coursemanage">
      <div class="headtool">
        <div class="searchtool" style="margin-top: 15px; margin-left: 15px;">
                <el-input placeholder="请输入内容" v-model="searchvalue" class="input-with-select" clearable @change="searchreset(searchvalue)">
                    <el-button slot="append" icon="el-icon-search" @click="searchreset_course(searchvalue)"></el-button>
                </el-input>
        </div>
        <div class="createtool">
          
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="create_course()">添加课程</el-button>
            <el-tooltip class="item" effect="dark" content="问答"  placement="top-start" style="margin-right: 20px">
                      <el-button type="success" icon="el-icon-s-comment"  @click="problem" ></el-button>
               </el-tooltip>
        </div>
        
      </div>

      <div class="course_main">
            <el-table
            :data="courseData"
            border
            style="width: 100%">
            <el-table-column
              prop="course_id"
              label="课程编号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="course_name"
              label="课程名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="gname"
              label="课程班级"
              width="180">
            </el-table-column>
          
            <el-table-column
              prop="start_time"
              label="起始时间">
            </el-table-column>
            <el-table-column
              prop="end_time"
              label="结束时间">
            </el-table-column>
           <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                     <el-button type="primary" icon="el-icon-edit" size="mini"  @click="editcourse(scope.row.course_id)"></el-button>
                </el-tooltip>
               

               <el-tooltip class="item"  effect="dark" content="查看详情" placement="top-start">
                      <el-button type="success" icon="el-icon-view" size="mini" @click="seecourse(scope.row.course_id)"></el-button>
               </el-tooltip>
               <el-tooltip class="item" effect="dark" content="删除"  placement="top-start">

                      <el-button type="danger" icon="el-icon-warning" size="mini"  @click="delete_course(scope.row.course_id)"></el-button>
               </el-tooltip>

               
               

              </template>
                
            </el-table-column>
          </el-table>
      </div>
      


                

      <div class="course_bottom">
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


      <!-- 创建课程dm -->

       <el-dialog title="创建课程" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" close-on-click-modal>
          <div class="found_course_info">
              <el-select v-model="coursegname" placeholder="请选择授课班级">
                <el-option
                v-for="item in coursegnamedata"
                :key="item.gid"
                :label="item.gname"
                :value="item.gname">
                </el-option>
            </el-select>
          </div>
         <!-- //授课班级 -->
          
          <!-- 课程名称 -->
          <el-input  v-model="coursename" placeholder="课程名称"></el-input>

          <!-- 课程起止时间 -->
           <div class="block">
                <el-date-picker
                    v-model="startandenddate"
                    type="datetimerange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd "
                    :picker-options="pickerOptions">
                </el-date-picker>
           </div>

            <!-- 课程简介 -->
           <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">

          </el-input>


          <div class="courseupload">
              <input type="file" id="file" name="file" multiple @change="windimg" class="file"> 
              <div style="height: 20px;width: 20px;">
                <img :src=windimgsrc alt="" style="height: 30px;width: 30px;">
              </div>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="foundcourse()" close-on-click-modal>确 定</el-button>
          </span>
      </el-dialog>


      <!-- 编辑课程 -->

          <el-dialog title="编辑你的课程" :visible.sync="editdialogVisible" width="50%" :before-close="handleClose" close-on-click-modal>
          <div class="found_course_info">
              <el-select v-model="coursegname" placeholder="请选择授课班级">
                <el-option
                v-for="item in coursegnamedata"
                :key="item.gid"
                :label="item.gname"
                :value="item.gid" >
                </el-option>
            </el-select>
          </div>
         <!-- //授课班级 -->
          
          <!-- 课程名称 -->
          <el-input  v-model="coursename" placeholder="课程名称"></el-input>

          <!-- 课程起止时间 -->
           <div class="block">
                <el-date-picker
                    v-model="startandenddate"
                    type="datetimerange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd "
                    :picker-options="pickerOptions">
                </el-date-picker>
           </div>

            <!-- 课程简介 -->
           <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">

          </el-input>


          <div class="courseupload">
              <input type="file" id="file" name="file" multiple @change="windimg" class="file"> 
              <div style="height: 20px;width: 20px;">
                <img :src=windimgsrc alt="" style="height: 30px;width: 30px;">
              </div>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="edit_data_course" close-on-click-modal>确 定</el-button>
          </span>
      </el-dialog>


      <!-- 删除询问 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogelete"
        width="30%"
        :before-close="handleClose">
        <span>确认要删除这门课吗,您将失去这门课的所有数据？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="delete_coursedata()" >确 定</el-button>
        </span>
      </el-dialog>



     

    </div>
</template>

<script>
import { 
  course_render,
  course_selectcourses,
  course_found, 
  course_renderfoundcourses,
  course_found_windowimage,
  course_rendereditcourses,
  course_editcourses,
  course_deletecourses

 } from '@/api/coursemanage'

export default {
    data() {
      return {
        dialogelete: false,
        editdialogVisible: false,
        dialogVisible: false,
        courseData:null,                   //课程数据
        pageNo: 1,
        pagetotall: 1,
        searchvalue: '',                      //搜索内容
        coursegnamedata:[],              //所有班级
        coursegname:'',                     //班级名称
        startandenddate: '',                     //课程开始结束时间
        textarea: '' ,                     //简介
        windimgsrc: '',                   //橱窗图
        wimgname: '',
        coursename: '',                 //课程名称
        course_nub: null,                 //课程编号

          pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    methods: {
      
      handleCurrentChange(page, keyword=''){
         course_render({page, keyword}).then(
          res => {
           
            this.courseData = res.data
            
           
          }
        )
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

      //搜索
      searchreset(keyword) {
          if (keyword == '') {
            course_render({page:this.pageNo}).then(
                res => {
                  console.log(res);
                  this.courseData = res.data
                  this.pagetotall = (res['turnpages'] * 10)
                  
           
             }
            )
          }
      },
      searchreset_course(keyword) {

        course_selectcourses({
          'page': this.pageNo,
          'keyword': keyword
        }).then(
          res => {
            if (res.code == 200) {
              this.courseData = res.data
            }
           }
        )
      },
      //获取所有班级
      create_course() {
        this.dialogVisible = true;
        course_renderfoundcourses().then(
          res => {
            if (res) {
              this.coursegnamedata = res.data;
            }
          }
        )

      },
      //上传橱窗图
      windimg() {
          let formdata = new FormData()

         formdata.append('winimage',document.querySelector('.file').files[0])
         course_found_windowimage(formdata).then(
           res => {
              this.windimgsrc =  res.imagesrc;
              this.wimgname = res.imgname;
           }
         )

      },

      //确认创建课程
      foundcourse(){
        this.dialogVisible = false
        console.log(this.startandenddate, this.coursegname, this.textarea, this.windimgsrc);
        course_found({
            course_name: this.coursename,
            gname: this.coursegname,
            start_time: this.startandenddate[0],
            end_time: this.startandenddate[1],
            imgsrc: this.wimgname,
            descs: this.textarea
        }).then(
          res => {
            if (res.code == 200) {
               this.$notify({
                  title: '成功',
                  message: '课程创建成功',
                  type: 'success'
                });
                this.handleCurrentChange(this.pageNo)
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
      //点击编辑
      editcourse(course_id,imgsrc) {
        this.editdialogVisible = true;
        this.course_nub = course_id

        //获取所有班级
        course_renderfoundcourses().then(
          res => {
            // console.log(res,'班级A');
            if (res) {
              // console.log(res,'班级');
              this.coursegnamedata = res
            }
          }
        )

        // 编辑数据回显
        course_rendereditcourses({course_id}).then(
          res => {
            console.log(res.data,'编辑回显');
            this.coursegname = res.data.gid
            this.coursename = res.data.course_name;
            this.startandenddate = [res.data.start_time +  ' 00:00:00', res.data.end_time + ' 00:00:00'];
            this.textarea = res.data.descs;
            this.windimgsrc = res.data.imgsrc;
            this.wimgname = res.data.imgname;

          }
        )


      },
      //确认编辑
      edit_data_course() {
        this.editdialogVisible = false;
         course_editcourses({
            course_id:this.course_nub,
            course_name: this.coursename,
            gname: this.coursegname,
            start_time: this.startandenddate[0],
            end_time: this.startandenddate[1],
            imgsrc: this.wimgname,
            descs: this.textarea
        }).then(
          res => {
            console.log(res);
            if (res.code == 200) {
               this.$notify({
                  title: '成功',
                  message: '课程编辑成功',
                  type: 'success'
                });
                this.handleCurrentChange(this.pageNo)
            } else {
              this.$notify({
                  title: '失败',
                  message: '编辑失败!请您检查网络，稍后重试！',
                  type: 'error'
                });
            }
          }
        )

      },


      // 点击删除
      delete_course(course_id) {
        this.dialogelete = true
        this.course_nub = course_id
      
      },
      delete_coursedata() {
        this.dialogelete = false;
        course_deletecourses({course_id: this.course_nub}).then(
          res => {
            console.log(res,'删除');
            if (res.code == 200) {
               this.$notify({
                  title: '成功',
                  message: '课程已删除！',
                  type: 'success'
                });
             this.handleCurrentChange(this.pageNo)
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

      //去查看
      seecourse(course_id) {
       
        this.$router.push(`/coursedetails/${course_id}`);
      },
      problem() {
        this.$router.push('/problemlist')
      }




    },

    mounted(){
        course_render({page:this.pageNo}).then(
          res => {
            console.log(res);
            this.courseData = res.data
            this.pagetotall = (res['turnpages'] * 10)
            
           
          }
        )
        
    }





}
</script>

<style lang="scss" scoped>

.coursemanage {
  height: auto;

  .headtool {
    height: 100px;
    .searchtool {
      // display: block;
      // margin-left: 50px;
      height: 20px;
      width: 200px;
      line-height: 100px;
      float: left;
    }
    .createtool {
       height: 20px;
       line-height: 135px;
       float: right;

    }
  }
  .course_main {
    height: 650px;
  }
  .course_bottom{
    border-top: 2px solid #999;
    height: 10%;
    text-align: center;
    .pagetool {
      width: 500px;
      margin: 0 auto;
    }
  }
}



</style>