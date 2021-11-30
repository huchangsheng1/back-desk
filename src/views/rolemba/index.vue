<template>
    <div> 
         <!-- 修改角色名 -->
           <el-dialog
                title="修改角色名(角色名务必严谨)"
                :visible.sync="dialogble2"
                width="50%">
                <span style="margin-rigth:5%">输入修改角色名：</span>
                <el-input
                    style="width:68%"
                    placeholder="输入修改角色名"
                    v-model="rolename"
                    clearable>
                </el-input>
                
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogble2 = false">取 消</el-button>
                    <el-button type="primary" @click="alterrname(rolename)">确 定</el-button>
                </span>
        </el-dialog>  
        <!-- 修改角色权限 -->
        <el-dialog
                title="修改角色权限"
                :visible.sync="alterdialog"
                width="70%">
            <div class="block">
                <p>
                   <a style="margin-left:5%;color:#000">已有权限:</a> 
                   <a style="margin-left:30%;color:#000">可更新权限:</a>
                </p>
                <el-cascader class="cascader"
                    placeholder="查看已有权限"
                    ref="cascader"
                    :options="poweroptions"
                    :props="{ multiple: true, }"
                    filterable
                    clearable
                    >
                </el-cascader>
                 
                <el-cascader class="cascader"
                  placeholder="选择勾选更新的权限"
                  ref="cascader2"
                  @change="handleChange"
                  :options="powerdata"
                  :props="{ multiple: true, }"
                  filterable
                  clearable>
                </el-cascader>

            </div>
                
                <span slot="footer" class="dialog-footer">
                    <el-button @click="alterdialog = false">取 消</el-button>
                    <el-button type="primary" @click="updatepow">确 定</el-button>
                </span>
        </el-dialog>  


        <el-button class="filter-item btn-secah" style="margin-left: 2px" type="primary" icon="el-icon-plus" @click="addrolepower">添加角色</el-button>
        
        <hr>
        <el-table
            v-loading="listLoading"
            :data="datalist"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
        >
      <el-table-column align="center" label="角色序号" width="95">
        <template slot-scope="scope">
          {{ scope.row.rid }}
        </template>
      </el-table-column>
      <el-table-column label="角色名称">
        <template slot-scope="scope">
          {{ scope.row.rname }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">

          <el-button v-if="scope.row.rid != 1 " type="primary" icon="el-icon-edit" @click="alterrole(scope.row.rid)">修改角色权限</el-button>
          <el-button v-if="scope.row.rid != 1 "  type="primary" icon="el-icon-edit" @click="altername(scope.row.rid)">修改角色名</el-button>
          <p v-else style="text-align:center;color:#e2e2e2;font-size:17px">不可对超级管理员操作哦</p>
        </template>
      </el-table-column>
       
    </el-table>
    
    </div>
</template>

<script>
import {getrole,getrolepower,getrolepower2,setrname,updaterole} from '@/api/role';
import { resetpasswd } from '@/api/table';

export default {
    filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      datalist: null,
      listLoading: true,
      dialogVisible: false,
      dialogble : false,
      dialogble2 : false,
      inputrole : '',
      rolename : '',
      rid : '',
      powerprops: { multiple: true },
      poweroptions : [],
      //修改权限dialog框
      alterdialog : false,
      powerdata : [],
      nodesInfo : [],
    }
  },
  mounted() {
      getrole().then(res => {
          if (res.code == 200) {
              this.datalist = res.data;
              this.listLoading = false;
          }
      })
  },
  methods : {
      //获取角色的所有权限结构
      alterrole(rid){
        this.alterdialog = true;
        this.rid = rid;
        getrolepower2({rid:rid}).then(res => {
            if (res.code != 200) {
               this.$message({
                    type: 'success',
                    message: '获取不到菜单,请退出登入重试'
                });
            }
            let powerarr = res.data;
            let powerarr2 = [];
            for(let i in powerarr) {
                powerarr[i] = JSON.stringify(powerarr[i]).replace(/p_id/g,'value');
                powerarr[i] = powerarr[i].replace(/p_name/g,'label');
                powerarr2.push(JSON.parse(powerarr[i]));
            }
            this.poweroptions = powerarr2;
        })

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
            this.powerdata = powerarr2;
        })

      },
      //修改角色名称
      altername(rid) {
          this.dialogble2 = true;  
          this.rid = rid; 
      },
      //获取到角色名称在发送修改请求
      alterrname(rname) {
          this.$confirm('确定修改该角色名 ?', '修改提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(reslut => {
                    setrname({rid:this.rid,rnametow:this.rolename}).then(res => {
                        if (res.code == 200 ) {
                            this.rid = '',
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
                            this.rid = '',
                            this.dialogble2 = false;
                        }
                    })
                })
      },
      //添加角色操作1获取可添加权限
      addrolepower() {
        
        this.$router.push('/createrole');
        
      },
       updatepow(){
          let pwoList = [];
          let pwoarr = this.nodesInfo;
          for(let i=0;i<pwoarr.length;i++) {
              pwoList.push({
                  'p_id':pwoarr[i].value,
                  'p_name':pwoarr[i].label,
                  'path' : pwoarr[i].path
              })
          }
          this.$confirm('确定更新该角色权限,\n不选权限执行是清空该角色的权限 ?', '权限更新注意', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(rese => {
                    updaterole({
                      'rid':this.rid,
                      'data' : JSON.stringify(pwoList)
                    }).then(res => {
                      if (res.code == 200) {
                            this.$notify({
                                title: '更新成功',
                                message: '该角色权限更新成功',
                            });
                            this.rid == '';
                            window.location.reload('');
                        }else if (res.code == 507) {
                            this.$notify.error({
                                title: '更新失败',
                                message: '该角色不存在,请更换角色重试',
                            });
                        }else if (res.code == 505) {
                            this.$notify.error({
                                title: '更新失败',
                                message: '角色异常,请刷新重试',
                            });
                        }
            })
                })

            
          },
       handleChange () {
        
         this.nodesInfo = this.$refs['cascader2'].getCheckedNodes()  
      }
  }
}

</script>

<style  scoped>
  .cascader {
    margin: 0px 10px;
  }
  .block {
    width: 100%;
    height: 40%;
    overflow-y: auto;
    background-color:#fff ;
  }
</style>