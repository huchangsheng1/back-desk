<template>
    <div class="work_box">
        <div class="header_box">
            <!-- <p class="upload"><input type="file" name="" id=""></p> -->
            <el-button type="primary" @click="pushjob" style="margin:2px">发布作业</el-button>
            <!-- <el-button type="text" @click="open">发布作业</el-button> -->
        </div>
         <el-table
           :data="tableData.filter(data => !search || data.course_id.toLowerCase().includes(search.toLowerCase()))"
           style="width: 100%;text-align:centent ;">
           <el-table-column
             label="作业编号"
             prop="workNub">
           </el-table-column>
           <el-table-column
             label="作业名称"
             prop="workName">
          </el-table-column>
           <el-table-column
               label="课程ID"
               prop="course_id">
            </el-table-column>
            <el-table-column
               label="开始时间"
               prop="stattime">
            </el-table-column>
            <el-table-column
               label="结束时间"
               prop="endtime">
            </el-table-column>
          <el-table-column
            align="right">
            <template slot="header">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入课程名称关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-document-checked"
                @click="handleEdit(scope.$index, scope.row)">
                </el-button>
              
                <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)">
                </el-button>
              
            </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import "@/assets/less/testPaper.less";
import {lookwork,deletework} from '@/api/work'
  export default {
    data() {
      return {
        tableData: [],
        search: ''
      }
    },
    mounted(){
      // console.log(2)
        lookwork().then(
          res => {
            if(res.code == 200){
              console.log(res)
                res.workArr.forEach(item => {  
                this.tableData.push({
                    workNub:item.work_nub,
                    workName: item.work_name,
                    course_id: item.course_id,
                    stattime:item.create_time,
                    endtime:item.end_time,
                })
              })
            }else if(res.code == 400){
              this.tableData.push({
                workNub:'当前未发布作业',
              })
            }
          }
        )
        
        
        
        
        
    },
    methods: {
      handleEdit(index, row) {
        // console.log(row.workNub)
        this.$router.push({path:'/Correctingwork',query:{
          course_id:row.course_id.substring(row.course_id.indexOf('(')+1,row.course_id.indexOf(')')),//课程id
          workNub:row.workNub,//作业编号id
        }})

      },
      handleDelete(index, row) {
        deletework({
          work_nub:row.workNub
        }).then(
          res =>{
            if(res.code == 200){
              this.$router.push('/workmanager')
              location.reload()
            }
          }
        )
        

      },  
      pushjob(){
          this.$router.push('/Publishjob')
      },
    },
  
}
</script>
<style scoped lang="less">
.work_box{
  margin: 10px;
    // border: 1px solid blue;
    .header_box{
        width: 100%;
        height: 50px;
        overflow: hidden;
        
        // border: 1px solid red;
        .upload{
            float: left;
            // width: 100px;
            // overflow: hidden;
        }
    }
}


</style>