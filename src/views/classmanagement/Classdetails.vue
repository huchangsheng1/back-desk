<template>
    <div class="class_details">
    <div class="headtool">
            <div class="goback">
                <el-button type="primary" icon="el-icon-arrow-left" @click="goback">返回</el-button>
            </div>

           <!-- 移出班级 -->
           <div class="out_calss">
                <el-button type="primary" icon="el-icon-delete" @click="shiftout()">移出班级</el-button>   
           </div>
           
           
      </div>
       <div class="class_details_main">
            <el-table
            :data="class_detailsdata"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange">  >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
              prop="uid"
              label="用户编号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="nickname"
              label="用户名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="账号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              width="180">
            </el-table-column>
            <el-table-column prop="" label="操作">
    
            </el-table-column>
            
            
          </el-table>
      </div>
    </div>
    
</template>

<script>
import { grade_showst, grade_delst } from '@/api/classmanagement'
export default {
    data() {
        return {
            class_detailsdata:[],
            multipleSelection: [],
            uidset: []
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
      
            val.forEach((once) => {
                this.uidset.push(once.uid)
            }) 
        
        },
        renderst() {
            let gid = this.$route.params.gid;
            grade_showst({gid}).then(
                res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.class_detailsdata = res.data
                    }
                }
            )
        },

        //移出班级
        shiftout(){
            console.log(this.uidset);
            // return
            grade_delst({
                gid: this.$route.params.gid,
                uArr: this.uidset
            }).then(
                res =>{
                    if (res.code == 200) {
                         this.$notify({
                            title: '成功',
                            message: '移出成功',
                            type: 'success'
                        });
                        this.renderst()
                    } else {
                        this.$notify({
                            title: '失败',
                            message: '移出失败',
                            type: 'error'
                        });
                    }
                }
            )
            
        },
        //返回班级管理
        goback() {
            this.$router.push(`/teachmanager/classmanagement`)
        },
        
        


    },
    mounted() {
        this.renderst()

    }
}
</script>

<style lang="less" scoped>
.class_details {
    height: 100%;
    .headtool {
        width: 1200px;
        height: 100px;
        margin: 0 auto;
        .goback {
            float: left;
            line-height: 100px;
        }
        .out_calss {
            float: right;
            line-height: 100px;

        }
    }
    .class_details_main {
        width: 1200px;
        margin: 0 auto;
    }

}


</style>