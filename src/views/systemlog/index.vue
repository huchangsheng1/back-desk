<template>

    <div class="app-log">
        <div class="filter-container">
          <span style="margin :0 10px" class="demonstration">关键字:</span>
             <el-input 
             style="width:200px"
              placeholder="请输入内容关键字"
              v-model="parmas.keyword"
              clearable>
            </el-input>

            <span style="margin :0 10px" class="demonstration">时间范围:</span>
            <el-date-picker
              v-model="parmas.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <span style="margin :0 10px" class="demonstration">类别选择:</span>
             <el-select v-model="parmas.category" clearable placeholder="请选择">
               <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
               </el-option>
            </el-select>

            <el-button class="filter-item btn-secah" style="margin-left: 2px" type="primary" icon="el-icon-search" @click="selectlog" ></el-button>
            <el-button style="margin-left: 10px" type="danger" icon="el-icon-delete" @click="deletelog"></el-button>
        </div>
        
        <el-table
         ref="multipleTable" tooltip-effect="dark"
         @selection-change="handleSelectionChange"
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    > 
      <el-table-column type="selection" ></el-table-column>
      <el-table-column align="center" label="用户名" width="230">
        <template slot-scope="scope" >
          <span>{{ scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作内容" width="300">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="操作时间" width="230" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.log_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作类型" width="230" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.log_type == 1" data-log-type=scope.row.log_type>添加操作</span>
          <span v-else-if="scope.row.log_type ==2" data-log-type=scope.row.log_type>删除操作</span>
          <span v-else-if="scope.row.log_type ==3" data-log-type=scope.row.log_type>修改操作</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作人ip" width="230">
        <template slot-scope="scope">
          <span>{{ scope.row.log_ip }}</span>
        </template>
      </el-table-column>
      
    </el-table>
        <div align="center">
            <br>
             <el-pagination
              background
              layout="prev, pager, next"
              :total="total" @current-change="handleCurrentChange" :current-page.sync="pager">
            </el-pagination>  
        </div>  
    </div>
</template>


<script>
import {getlog,getlog2,getpage,deletlog} from '@/api/log'

export default {
   filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger',
      }
      return statusMap[status]
    }
  },
    data() {
        return {
            tableData:[],
            delarr : [],
            total :10,
            listLoading: true,
            parmas : {
               keyword :'',
               category : '',
               time : '',
            },
            options :[
                      {value: '1',label: '增加操作'},
                      {value: '2',label: '删除操作'},
                      {value: '3',label: '修改操作'},
              ],
            pager : 1
        }
    },
    mounted(){
        getlog().then(res => {
            this.tableData = res.data.desc;
            this.total = res.data.item *10;
            this.listLoading = false
        })

    },methods: {
        //筛选查找日志
        selectlog() {
          let desc = {};
          if (this.parmas.keyword) {
             desc['keyword'] = this.parmas.keyword;
          }
          if (this.parmas.category) {
             desc['category'] = this.parmas.category;
          }
          let start_time = this.datetime(this.parmas.time[0]).replace('NaN-NaN-NaN','');
          let end_time = this.datetime(this.parmas.time[1]).replace('NaN-NaN-NaN','');
          if (start_time) {
              if (start_time == end_time) {
              desc['start_time'] = start_time;
            }else {
              desc['start_time'] = start_time;
              desc['end_time'] = end_time;
            } 
          }
          getlog2(desc).then(res =>{
             if (res.code == 200) {
                this.tableData = res.data.desc;
                this.total = res.data.item *10;
                this.listLoading = false
                this.parmas.time = [];
             }
          })
        },
        //翻页
        handleCurrentChange(){
           let page = this.pager;

          let desc = {};
          if (this.parmas.keyword) {
             desc['keyword'] = this.parmas.keyword;
          }
          if (this.parmas.category) {
             desc['category'] = this.parmas.category;
          }
          if(page) {
            desc['page'] = page;
          }
          let start_time = this.datetime(this.parmas.time[0]).replace('NaN-NaN-NaN','');
          let end_time = this.datetime(this.parmas.time[1]).replace('NaN-NaN-NaN','');
          if (start_time) {
              if (start_time == end_time) {
              desc['start_time'] = start_time;
            }else {
              desc['start_time'] = start_time;
              desc['end_time'] = end_time;
            } 
          }

           getpage(desc).then(res =>{
             if (res.code == 200) { 
                this.tableData = res.data.desc;
                this.total = res.data.item *10;
                this.listLoading = false
             }
          })
        },
        //删除
        deletelog() {
          let delarrss = []
          this.delarr.forEach((item,key) => {
              delarrss.push(item.log_key);
          })
          if (delarrss.length == 0) {
            return;
          }
          deletlog(delarrss).then(res => {
             if (res.code == 200) {
                this.$notify({
                  title: '删除成功',
                  message: '删除成功',
                });
                window.location.reload('');
             }
          })
        },
        //时间转换
        datetime(stime) {
          let strtime = new Date(stime);
          strtime = strtime.getFullYear() + '-' + (strtime.getMonth() + 1) + '-' + strtime.getDate() 
          return strtime;
        },
        handleSelectionChange(val) {
          this.delarr = val;
        }
    }
}
</script>

<style scoped>
   
</style>