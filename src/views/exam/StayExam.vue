<template>
    <el-container>
        <el-header>
            <h3>待批改试卷</h3>
        </el-header>
        <el-main>
            <div class="app-container">
                <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
                    <el-table-column align="center" label="考试名称" width="200" prop="test_name"></el-table-column>
                    <el-table-column align="center" label="所属班级" width="200" prop="gname"></el-table-column>
                    <el-table-column align="center" label="所属科目" prop="course_name"></el-table-column>
                    <el-table-column align="center" label="学生姓名" width="150" prop="nickname"></el-table-column>
                    <el-table-column align="center" label="操作" width="280">
                        <template slot-scope="scopeKey">
                            <el-button class="filter-item"
                                style="margin-left: 10px"
                                type="primary"
                                icon="el-icon-document-checked"
                                @click="correct(scopeKey.row.test_key, scopeKey.row.uid, scopeKey.row.test_name, scopeKey.row.course_name)">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 翻页 -->
                <el-pagination background layout="prev, pager, next" class="flip" :current-page.sync="page" :total="totalpage"
                @current-change="handleCurrentChange"
                ></el-pagination>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import { stayexam } from '@/api/exam'

export default {
    name: 'StayExam',
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
            page: 1,
            totalpage: 1,
        }
    },
    methods: {
        handleCurrentChange() {
            this.listLoading = true;
            stayexam().then(
                res => {
                    for (let x = 0; x < res.examinee.length; x ++) {
                        this.list.push(res.examinee[x]);
                    }

                    this.totalpage = res.item * 10;
                    this.listLoading = false;
                }
            )
        },
        correct(test_key, userid, test_name, course_name) {
            let uid = userid, tkey = test_key, tname = test_name, cname = course_name;
            this.$router.push({
                path: `/reviewexam/${uid}/${tkey}/${tname}/${cname}`
            })
        },
    },
    created() {
        this.listLoading = false;
    },
    mounted() {
        document.querySelector("body").setAttribute("style", "background-color:#64a9e3");

        this.listLoading = true;
        stayexam({ page: this.page }).then(
            res => {
                for (let x = 0; x < res.examinee.length; x ++) {
                    this.list.push(res.examinee[x]);
                }

                this.totalpage = res.items * 10;
                this.listLoading = false;
            }
        )
    },
    destroyed() {
        document.querySelector('body').setAttribute('style','background-color:#fff');
    },
}
</script>


<style scoped>
    .el-main {
        height: 640px;
        background-color: #fff;
        color: #333;
        text-align: center;
    }
    .el-header {
        background-color: #f5f5f5;
        margin-top: 15px;  
        color: #333;
        line-height: 30px;
    }
    .flip{
        margin-top: 10px;
    }
</style>