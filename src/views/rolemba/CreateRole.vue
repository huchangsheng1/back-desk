<template>
    <div class="createrole_box">
           <el-steps :active="active" finish-status="success">
            <el-step title="填写角色名"></el-step>
            <el-step title="选择权限"></el-step>
            <el-step title="完成"></el-step>
            </el-steps>

        <div v-if="this.active==1">
            <h3>填写角色名</h3>
            <el-input clearable v-model="rolename" placeholder="请输入角色名称" style="width:50%"></el-input>
            <p>
                <a>备注：</a><span>角色名不可包含字符</span>
            </p>
        </div>
        <div v-if="this.active==2" class="block">
            <h3>添加权限</h3>
            <el-cascader class="cascader"
                placeholder="选择添加的权限"
                ref="cascader"
                @change="handleChange"
                :options="poweroption"
                :props="{ multiple: true, }"
                filterable
                clearable>
            </el-cascader>
        </div>
        <div v-if="this.active==3">
            <h1 style="display:block;margin:0 auto;" >角色信息已创建</h1>
            <p>点击创建角色开始创建</p>
        </div>

        <div class="nextdiv">
            <el-button ref="nextbtn" style="margin-top: 12px;" @click="nextup">返回上一步</el-button>
            <el-button v-if="this.active!=3" ref="nextbtn" style="margin-top: 12px;" @click="next">下一步</el-button>
            <el-button v-if="this.active==3" style="margin-top: 12px;" type="success" @click="create">创建角色</el-button>
        </div>
    </div>

</template>


<script>
import {getrolepower,createrole} from '@/api/role'
export default {
    
    data(){
        return{
            active :1,
            rolename : '',
            poweroption : [],
            IndustryQualification : '',
            nodesInfo : ''
        }
    },

    mounted() {
        document.querySelector('body').setAttribute('style','background-color:#64a9e3');
        getrolepower().then(res => {
            if (res.code != 200) {
               this.$message({
                    type: 'success',
                    message: '获取不到菜单,请退出登入重试'
                });
            }
            let powerarr = res.data;
            let powerarr2 = []
            for(let i in powerarr) {
                powerarr[i] = JSON.stringify(powerarr[i]).replace(/p_id/g,'value');
                powerarr[i] = powerarr[i].replace(/p_name/g,'label');
                powerarr2.push(JSON.parse(powerarr[i]));
            }
            this.poweroption = powerarr2;
        })
    },
    destroyed() {
        document.querySelector('body').setAttribute('style','background-color:#fff');
    },
    methods : {
        next(){
            if (this.active <3) {
                if (this.rolename){
                    this.active = this.active+1;
                }else {
                    this.$message({
                        type: 'info',
                        message: '没有填写角色名称'
                    });
                }
            }
        },
        nextup(){
            if (this.active >0) {
                this.active = this.active-1
            }
            if (this.active == 0) {
                this.$router.push('/nested/menu2');
            }
        },
        //开始创建角色
        create(){
            let pwoList = [];
            let pwoarr = this.nodesInfo;
            for(let i=0;i<pwoarr.length;i++) {
                pwoList.push({
                    'p_id':pwoarr[i].value,
                    'p_name':pwoarr[i].label,
                    'path' : pwoarr[i].path
                })
            }
            createrole({
                rname : this.rolename,
                data : JSON.stringify(pwoList)
            }).then(res => {
                if (res.code == 200) {
                     this.$notify({
                        title: '创建成功',
                        message: '角色已经创建成功',
                    });
                    this.$router.push('/nested/menu2');
                }else if (res.code == 507) {
                     this.$notify.error({
                        title: '创建失败',
                        message: '该角色已存在,请更换角色名重试',
                    });
                }else if (res.code == 505) {
                    this.$notify.error({
                        title: '创建失败',
                        message: '该角色创建失败,请更换角色名重试',
                    });
                }
            })
        },
        
         handleChange () {
        
         this.nodesInfo = this.$refs['cascader'].getCheckedNodes()
         
        
    }
    }
   

}

</script>

<style  scoped>
    .createrole_box {
        width: 800px;
        height: 730px;
        margin: 0px auto;
        background: #fff;
        padding: 10px;
    }
    .nextdiv {
        margin-top: 30px;
    }
    .block {
        width: 50%;
        height: 60%;
        overflow-y: auto;
        background-color:#fff ;
    }
    .cascader {
        width: 100%;
    }
</style>