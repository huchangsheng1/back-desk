<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input class="secah" placeholder="请输入用户昵称" v-model="input" clearable></el-input>
      <el-button class="filter-item btn-secah" style="margin-left: 2px" type="primary" icon="el-icon-search" @click="search"></el-button>
      <el-button class="filter-item" style="margin-left: 10px" type="primary" icon="el-icon-plus" @click="dialogFormVisible = true"></el-button>
    </div>

    <el-table 
      v-loading="listLoading" 
      :data="list" 
      element-loading-text="Loading" 
      border 
      fit  
      highlight-current-row
    >
      <el-table-column align="center" label="用户昵称" width="210"  prop="nickname">
      </el-table-column>
      <el-table-column label="用户手机号" prop="phone" align="center"></el-table-column>

     <el-table-column label="用户性别" width="210"  align="center">
       <template slot-scope="scopeSex">
         {{ scopeSex.row.sex == 1 ? '男' : '女' }}
       </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="用户身份" prop="rname" width="200" align="center"></el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="210" >
        <template slot-scope="scope">
          <el-button style="margin-left: 2px" type="primary" icon="el-icon-edit" @click="altuser(scope.row.phone)"></el-button>
          <el-button style="margin-left: 2px" type="danger" icon="el-icon-delete" @click="deluesr(scope.row.phone)"></el-button>
          <el-button style="margin-left: 2px" type="warning" icon="el-icon-unlock" @click="reset(scope.row.phone)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    
    

    <div class="dialog">
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="昵称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio v-model="sex" label="1">男</el-radio>
            <el-radio v-model="sex" label="0">女</el-radio>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-select v-model="form.rid" placeholder="---请选择---">
              <el-option label="管理员" value="1"></el-option>
              <el-option label="教务" value="2"></el-option>
              <el-option label="教师" value="3"></el-option>
              <el-option label="学生" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级" :label-width="formLabelWidth">
            <el-select v-model="editUserFormData.level" placeholder="---请选择---">
              <el-option v-for="item in gradelist" :key="item.gid" :value="item.gid" :label="item.gname"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog title="修改用户信息" :visible.sync="alterdialog">
      <el-form :model="form">
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="uform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="uform.sex" label="1">男</el-radio>
          <el-radio v-model="uform.sex" label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-select
            v-model="editUserFormData.level"
            placeholder="---请选择---"
          >
            <el-option
              v-for="item in gradelist"
              :key="item.gid"
              :value="item.gid"
              :label="item.gname"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="alterdialog = false">取 消</el-button>
        <el-button type="primary" @click="alteruser">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定删除该用户？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteuesr">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  
  <el-pagination background layout="prev, pager, next" class="flip" :current-page.sync="pager" :total="totalpage" @current-change="handleCurrentChange"></el-pagination>
  
  </div>
  
</template>

<script>
import {
  getList,
  findsgrade,
  adduser,
  deluser,
  alterusers,
  showuser,
  resetpasswd,
} from "@/api/table";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: [],
      listLoading: true,
      dialogFormVisible: false,
      alterdialog: false,
      dialogVisible: false,
      pager: 1,
      totalpage: 1,
      input: "",
      sex: "",
      form: {
        name: "",
        phone: "",
        rid: "",
      },
      uform: {
        name: "",
        sex: "",
      },
      editUserFormData: { level: "" },
      gradelist: [],
      formLabelWidth: "120px",
      userphone: "",
    };
  },
  created() {
    this.listLoading = false;
  },
  methods: {
    // 翻页
    handleCurrentChange() {
      this.listLoading = true;
      getList({ page: this.pager }).then((response) => {
        this.list = response.data.desc;
        this.listLoading = false;
      });
      findsgrade().then((res) => {
        this.gradelist = res.data;
      });
    },

    // 添加用户
    add() {
      let userinfo = {
        phone: this.form.phone,
        nickname: this.form.name,
        sex: this.sex,
        rid: this.form.rid,
        gid: this.editUserFormData.level,
      };
      adduser(userinfo).then((res) => {
        if (res.code == 200) {
          this.$notify({
            title: "OK",
            message: `${res.mes}`,
          });
          window.location.reload('');
          (this.form.phone = ""), (this.form.name = ""), (this.form.rid = "");
          this.sex = "";
          this.editUserFormData.level = "";
          this.dialogFormVisible = false;
        } else if (res.code == 507) {
          this.$notify.error({
            title: "错误",
            message: `${res.mes}`,
          });
          (this.form.phone = ""), (this.form.name = ""), (this.form.rid = "");
          this.sex = "";
          this.editUserFormData.level = "";
          this.dialogFormVisible = false;
        }
      });
    },

    // 删除用户
    deluesr(uphone) {
      this.dialogVisible = true;
      this.userphone = uphone;
    },
    deleteuesr() {
      deluser({ phone: this.userphone }).then((res) => {
        if (res.code == 200) {
          this.$notify({
            title: "OK",
            message: `${res.mes}`,
            type: "success",
          });
          this.dialogVisible = false;
          window.location.reload('');
        } else if (res.code == 503) {
          this.$notify.error({
            title: "错误",
            message: `${res.mes}`,
          });
          this.dialogVisible = false;
        }
      });
    },

    // 修改用户
    altuser(uphone) {
      this.userphone = uphone;
      showuser({ phone: this.userphone }).then((res) => {
        this.uform.name = res.data[0].nickname;
        this.uform.sex = String(res.data[0].sex);
      });
      this.alterdialog = true;
    },
    alteruser() {
      this.alterdialog = false;
      let data = {
        phone: this.userphone,
        nickname: this.uform.name,
        sex: this.uform.sex,
        gid: this.editUserFormData.level,
      };
      let userinfo = { phone: this.userphone, data: data };
      alterusers(userinfo).then((res) => {
        if (res.code == 200) {
          this.$notify({
            title: "OK",
            message: `${res.mes}`,
            type: "success",
          });
          this.alterdialog = false;
          this.editUserFormData.level = "";
          window.location.reload('');
        } else if (res.code == 503) {
          this.$notify.error({
            title: "错误",
            message: `${res.mes}`,
          });
          this.alterdialog = false;
          this.editUserFormData.level = "";
        } else if (res.code == 505) {
          this.$notify.error({
            title: "错误",
            message: `${res.mes}`,
          });
          this.alterdialog = false;
          this.editUserFormData.level = "";
        }
      });
    },

    // 重置密码
    reset(uphone) {
      this.userphone = uphone;
      resetpasswd({ phone: this.userphone }).then((res) => {
        if (res.code == 200) {
          this.$notify({
            title: "OK",
            message: `${res.mes}`,
            type: "success",
          });
        } else if (res.code == 503) {
          this.$notify.error({
            title: "Error",
            message: `${res.mes}`,
          });
        } else {
          this.$notify.error({
            title: "Error",
            message: `${res.mes}`,
          });
        }
      });
    },

    // 模糊查询
    search() {
      let keypage = { keyword: this.input, page: this.pager };
      this.userinfo(keypage);
    },

    userinfo(keyword) {
      getList(keyword).then((response) => {
        this.list = response.data.desc;
        this.totalpage = response.data.item * 10;
        this.listLoading = false;
      });
    },
  },
  mounted() {
    this.listLoading = true;
    getList({ page: this.pager }).then((response) => {
      this.list = response.data.desc;
      this.totalpage = response.data.item * 10;
      this.listLoading = false;
    });
    findsgrade().then((res) => {
      this.gradelist = res.data;
    });
  },
};
</script>

<style scoped>
.uid {
  display: none;
}
.secah {
  width: 200px;
}
.filter-container {
  margin-bottom: 10px;
}
.flip {
  margin: 0px auto;
  margin-top: 10px;
  /* margin-left: 500px;  */
}
</style>
