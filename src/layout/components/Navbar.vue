<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    
    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span style="color:#000;margin-right:20px; ">{{userdata.rname}}：{{userdata.nickname}}</span>
          <img :src="userdata.headimg" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
           <el-dropdown-item divided>
            <el-button style="color:#000;" type="text" @click="dialogVisible = true">修改密码</el-button>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;color:#000" >退出登入</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        原始密码：<el-input
          placeholder="请输入原始密码"
          v-model="inputpwd1"
          clearable show-password>
        </el-input><br><br>
        新密码：<el-input
          placeholder="请输入新密码"
          v-model="inputpwd2"
          clearable show-password>
        </el-input><br><br>
        确认密码：<el-input
          placeholder="确认密码"
          v-model="inputpwd3"
          clearable show-password>
        </el-input><br><br>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="alertpwd">确定修改</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {getPersonal,alterUserpwd} from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  data(){
    return {
      userdata : {},
      dialogVisible: false,
      inputpwd1: '',
      inputpwd2: '',
      inputpwd3: '',
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      localStorage.removeItem('User-Token');
      this.$router.push(`/login`);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    alertpwd() {
       if (this.inputpwd2 != this.inputpwd3) {
          this.$notify.error({
              title: '修改错误',
              message: '两次输入密码不正确',
            });
          return;
       }
       if (String(this.inputpwd1).length <5 ||  String(this.inputpwd3).length <5) {
         this.$notify.error({
              title: '修改错误',
              message: '请输入正确格式密码',
            });
         return;
       }
       let data = {
           phone:this.userdata.phone,
           statpwd : this.inputpwd1,
           updatepwd : this.inputpwd3
       }
       alterUserpwd(data).then(res => {
          
           if (res.code == 200) {
             this.$notify({
              title: '修改成功',
              message: '请从新登入',
              });
             localStorage.removeItem('User-Token');
             this.$router.push({
               path:'/login',
             });
           }else if (res.code == 503) {
             this.$notify.error({
              title: '修改错误',
              message: '您输入的原密码错误',
            });
           }
       })
    }
  },
  mounted() {
    getPersonal().then(res => {
      this.userdata = res;
  
    })
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
 
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
 

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
