<template>
    <div class="view_power">

           <el-dialog
                title="修改权限名(权限名务必严谨)"
                :visible.sync="dialogble2"
                width="50%">
                <span style="margin-rigth:5%">输入修改权限名：</span>
                <el-input
                    style="width:68%"
                    placeholder="输入修改权限名"
                    v-model="powername"
                    clearable>
                </el-input>
                
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogble2 = false">取 消</el-button>
                    <el-button type="primary" @click="alterp_name(powername)">确 定</el-button>
                </span>
            </el-dialog>  

        <el-button class="filter-item btn-secah" style="margin-left: 2px" type="primary" icon="el-icon-plus" @click="addpower">添加权限</el-button>
        <hr>
         <el-table
            :data="tableData"
                style="width: 100%"
                row-key="p_id"
                border
                 default-expand-all
                 lazy
                :tree-props="{children: 'children'}">
            <el-table-column
                prop="p_id"
                label="权限id"
                width="180">
            </el-table-column>
            <el-table-column
                prop="p_name"
                label="权限名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="p_key"
                label="是否菜单">
                <template slot-scope="scope">
                    <span v-if="scope.row.purl == undefind" icon="el-icon-check">是</span>
                    <span v-else icon="el-icon-close">否</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="purl"
                label="权限C/A">
                 <template slot-scope="scope">
                    <span v-if="scope.row.purl == undefind" icon="el-icon-check">暂无C/A</span>
                    <span v-else icon="el-icon-close">{{scope.row.purl}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                 <template slot-scope="scope">
                    <el-button  type="primary" icon="el-icon-edit" @click="altername(scope.row.p_id)">修改权限名</el-button>
                </template>
            </el-table-column>
            </el-table>     

            <el-dialog
                center    
                title="添加权限操作"
                :visible.sync="dialogVisible"
                width="80%" 
            >  
               <el-input
                    style="display:block;width:50%;margin:0 auto"
                    placeholder="请输入权限名"
                    v-model="powernameipt"
                    clearable>
                </el-input><br>
            
                <el-input 
                   :disabled = "disabless"
                   ref="powerurl"
                   style="display:block;width:50%;margin:0 auto"
                    placeholder="请输入权限C/A(添加菜单可不填)"
                    v-model="powerurl"
                    clearable>
                </el-input>
                <div align=center>
                <p><a>选择菜单(不选菜单则是顶级菜单)：</a></p>
                <br>
                 
                <el-select  v-model="powerval" @change="munechange1" style="width:25%" placeholder="一级菜单">
                    <el-option
                    loading = true
                    v-for="(item,index) in powerOption"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :data-key = "item.p_key"
                    >
                    </el-option>
                    </el-select>
                <el-select   v-model="powerval2" style="width:25%" @change="munechange2" placeholder="二级菜单">
                    <el-option
                    loading = true
                    v-for="(item,index) in powerOption2"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :data-key = "item.p_key"
                    >
                    </el-option>
                 </el-select>

                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addpowerreq">确 定</el-button>
                </span>
            </el-dialog>
   
    </div>
</template>


<script >
import {powershow,poweralter,powermenu,powerpadd} from '@/api/power';

export default {
    
    data() {
        return {
            tableData: []  ,
            dialogble2 : false,
            powername : '',
            p_id : '',
            dialogVisible : false,
            powernameipt : '',
            powerurl : '',
            powerval : '',
            powerval2 : '',
            powerOption : [],
            powerOption2 : [],
            disabless : false,
            munedan : 0,
        }
    },
   mounted() {
       powershow().then(res => {
            if (res.code == 200) {
                this.tableData = res.data;
            }
        })
   },
   methods : {
       altername(p_id) {
          this.dialogble2 = true;
          this.p_id = p_id;
       },
       //修改
       alterp_name(powername){
           
           this.$confirm('确定修改该角色名 ?', '修改提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(res => {
                    poweralter({
                        'p_id':this.p_id,
                        'p_name' : powername
                    }).then(res => {
                       if (res.code == 200 ) {
                            this.p_id = '',
                            this.dialogble2 = false;
                            this.$notify({
                                title: '修改成功',
                                message: '该角色的角色名已更新',
                            });
                            window.location.reload('');
                        }else {
                            this.$notify.error({
                                title: '修改失败',
                                message: '该角色修改失败,请重试',
                            });
                            this.p_id = '',
                            this.dialogble2 = false;
                        }
                    })
                    
                })
       },
       //添加
       addpower() {
           this.dialogVisible = true;
            powermenu().then(res => {
                res.data.forEach(el  => {
                    if (el.p_key == 0) {
                        this.powerOption.push(el);
                    }else {
                        this.powerOption2.push(el);
                    }
                });
            })
       },
       //添加
       addpowerreq(){
           let data  = {};
           this.$confirm('确定添加该权限 ?,没有选择菜单则是顶级菜单', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(reslut => {
                    if(!this.powernameipt.trim()) {
                        this.$notify.error({
                                title: '添加失败',
                                message: '权限名称不能为空',
                            });
                        return;
                    }
                data['p_name'] = this.powernameipt;
                if (this.munedan == 0) {
                    data['menu'] = 0;
                    data['p_key'] = 0;
                }else if (this.munedan == 2){
                     if (!this.powerurl || !/[A-z]+\/[A-z]/.test(this.powerurl)) {
                          this.$notify.error({
                                title: '添加失败',
                                message: '权限url不能为空或者不符合格式',
                            });
                        return;
                     }
                     data['p_key'] = this.powerval2;
                     data['menu'] = 1;
                     data['purl'] = this.powerurl;
                }else if (this.munedan ==1) {
                    data['menu'] = 0;
                    data['p_key'] = this.powerval;
                }
                powerpadd(data).then(res => {
                    if (res.code == 200) {
                         this.$notify({
                            title: '添加成功',
                            message: '权限添加成功！',
                         });
                    this.powernameipt = '';
                    this.powerurl = '';
                    this.powerval='';
                    this.powerval2 = '';
                    this.munedan = 0;
                    this.dialogVisible = false;
                    window.location.reload('');
                    }else {
                        this.$notify({
                            title: '添加失败',
                            message: '权限添加失败，请重试！',
                         });
                    }
                })
                })
       },
       munechange1(){
           this.powerval2 = '';
           this.powerurl = '';
           this.disabless = true;
           this.munedan = 1;
       },
       munechange2(){
           this.powerval = '';
            this.disabless = false;
            this.munedan =2
       },
   }

}

</script>

<style  scoped>

</style>
