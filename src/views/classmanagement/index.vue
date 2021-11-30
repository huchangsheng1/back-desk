<template>
    <div class="Classmanagement">
       <div class="headtool">
            
            <!-- 搜索栏 -->
            <div class="searchtool" style="margin-top: 15px;">
                <el-input placeholder="请输入内容" v-model="searchvalue" class="input-with-select" clearable @change="searchreset(searchvalue)">
                 
                    <el-button slot="append" icon="el-icon-search" @click="handleCurrentChange(pageNo, searchvalue)"></el-button>
                </el-input>
            </div>
            <!-- 创建课程 -->
            <div class="createtool">
              <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">创建班级</el-button>
            </div>

            
      </div>

      <div class="grade_main">
            <el-table
            :data="gradeData"
            border
            style="width: 100%">
            <el-table-column
              prop="gid"
              label="班级编号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="gname"
              label="班级名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="gstnub"
              label="班级人数"
              width="180">
            </el-table-column>
            <el-table-column
              prop="c_time"
              label="创建时间">
            </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                     <el-button type="primary" icon="el-icon-edit"  @click="grade_edit_echo(scope.row.gname,scope.row.gid)"></el-button>
                </el-tooltip>
               

               <el-tooltip class="item" effect="dark" content="查看详情" placement="top-start">
                      <el-button type="success" icon="el-icon-view"  @click="lookclassdetails(scope.row.gid)"></el-button>
               </el-tooltip>
               <el-tooltip class="item" effect="dark" content="解散" placement="top-start">
                      <el-button type="danger" icon="el-icon-warning"  @click="dissolution(scope.row.gid)"></el-button>
               </el-tooltip>


              </template>
                
            </el-table-column>
            
            
          </el-table>


           
      </div>


    <div class="grade_bottom">
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




      
        <!-- 创建班级 -->
        <el-dialog title="创建班级" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                <el-input v-model="gnamevalue" placeholder="班级名称"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="create_grade(gnamevalue)">创 建</el-button>
                </span>
        </el-dialog>

        <!-- 编辑班级 -->
        <el-dialog title="编辑你的班级名称" :visible.sync="grade_edit_statr" width="30%" :before-close="handleClose">
                <el-input v-model="gnameagainvalue" placeholder="班级名称"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="grade_edit_statr = false">取 消</el-button>
                    <el-button type="primary" @click="grade_edit(gnamevalue)">确 认</el-button>
                </span>
        </el-dialog>


    </div>
</template>

<script>

import { grade_find, grade_create, grade_alterst, grade_del } from '@/api/classmanagement'
export default {
     data() {
      return {
        grade_edit_statr: false,
        dialogVisible : false,
        gradeData:null,                   //班级数据
        pageNo: 1,
        pagetotall: 1,
        searchvalue: '',                //搜索框
        gnamevalue: '',                  //班级名称
        gnameagainvalue: '',             //编辑班级名称回显
        gidvalue: ''                    //班级id

      }
    },
    methods: {
      handleCurrentChange(page, keyword=''){
          
         grade_find({page, keyword}).then(
          res => {
            console.log(res,'123');
            this.gradeData = res.data.desc
           
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
      //搜索后
      searchreset(keyword) {
          if (keyword == '') {
             grade_find({page:1, keyword}).then(
              res => {
                  this.gradeData = res.data.desc
                  this.pagetotall = (res.data.item * 10)
                }
              )
          }
         
        
      },
      //创建班级
      create_grade(gname) {
        this.dialogVisible = false;
        this.gnamevalue = ''
        grade_create({'gname':gname,'gArr': []}).then(
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
      //编辑班级回显
      grade_edit_echo(gname, gid) {
        this.gnameagainvalue = gname;
        this.grade_edit_statr = true
        this.gidvalue = gid
      },

      //编辑班级确认
      grade_edit() {
        this.grade_edit_statr = false
   
       grade_alterst({
         gid: this.gidvalue,
         gname:this.gnameagainvalue
       }).then(
         res => {
         
           if (res.code == 200) {
                this.$notify({
                  title: '编辑成功!',
                  message: '感谢您的每一份细心^_^',
                  type: 'success'
                });
                this.handleCurrentChange(this.pageNo)
            } else {
              this.$notify({
                  title: '编辑失败',
                  message: '修改异常',
                  type: 'error'
                });
            }
         }
       )

      },
      //班级详情
      lookclassdetails(gid) {
        this.$router.push(`/logerlist/${gid}`)
      },
      //解散班级
      dissolution(gid) {
        grade_del({gid}).then(
          res => {
            
            if (res.code == 200) {
                this.$notify({
                  title: '解散成功!',
                  message: '有点遗憾,希望我们有机会再见!',
                  type: 'success'
                });
                this.handleCurrentChange(this.pageNo)
            } else {
              this.$notify({
                  title: '失败',
                  message: '解散失败!您解散的班级可能不存在!',
                  type: 'error'
                });
            }
          }
        )
      }
    

    },
    mounted(){
      
        
        grade_find({page:this.pageNo}).then(
          res => {
        
           if (res.code == 200) {
             this.gradeData = res.data.desc
             this.pagetotall = (res.data.item * 10)
           }
            
            
           
          }
        )
        
    }
}
</script>



<style lang="scss" scoped>

.Classmanagement {
  height: 871px;
  .headtool {
    width: 1200px;
    height: 100px;
    margin: 0 auto;
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
      //  width: 200px;
       line-height: 135px;
       float: right;
      // margin-right: 50px;
    }
  
  }
  
  .grade_main {
    height: 700px;
    width: 1200px;
    margin: 20px auto;
  }
  .grade_bottom{
    border-top: 2px solid #555;
    height: 10%;
    text-align: center;
    .pagetool {
      width: 500px;
      margin: 0 auto;
    }
  }
}



</style>