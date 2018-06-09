<template>
    <div class="account" style="max-width:1202px">
        <el-button type="primary" @click="add">添加账号</el-button>
        <user @close="dialog" v-if="dialogForm" :info="info" :dialogForm="dialogForm"></user>
        <el-table
            :data="tableData"
            v-loading="loading"
            border
            style="max-width: 1202px;margin-top:20px;">
            <el-table-column
                prop="name"
                label="姓名"
                style="width:20%;"
                align="center"
                >
            </el-table-column>
            <el-table-column
                prop="email"
                label="账号"
                style="width:20%"
                align="center"
                >
            </el-table-column>
            <el-table-column
                prop="rule_name"
                label="权限"
                style="width:20%"
                align="center"
                >
            </el-table-column>
            <el-table-column
                label="操作"
                style="width:20%"
                align="center"
                >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row.id)" type="text" size="small" style="color:red">删除</el-button>
                    <el-button type="text" @click="edit(scope.row)" size="small">编辑</el-button>
                    <el-button type="text" @click="reset(scope.row.id)" size="small">重置密码</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="total" class="page" @current-change="currentChange" background layout="prev, pager, next" :page-size="50" :total="total">
        </el-pagination>
    </div>
</template>
<script>
    import user from "./user_win";
    import api from "./http.js"
    export default {
        data() {
            return {
                tableData: [],
                dialogForm: false,
                loading:true,
                page: 1,
                total: 1,
                info: '',
                list: [],
            }
        },
        components: {
            user
        },
        created(){
            this.getList();
        },
        methods: {
            //修改
            edit(item){
                this.dialogForm = true;
                this.info = item;
            },
            handleClick(id) {
                this.$confirm('此操作将永久删除该账户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.out(id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            // currentChange(page) {
            //     this.page = page;
            //     this.init();
            // },
            currentChange(page){
                console.log(page)
                this.tableData = this.list.slice((page-1)*50,page*50)
            },
            getList(){
                this.$http.get(api + '/api/user/accountList')
                .then((res)=>{
                    if(res.data.code == 200){
                        // this.tableData = res.data.data.list;
                        // this.total = res.data.data.total
                        this.list = res.data.data.list;
                        this.total = res.data.data.list.length;
                        this.currentChange(1)
                        this.loading = false;
                    }else{
                        this.$alert(res.data.error, '温馨提示', {
                            confirmButtonText: '确定',
                            callback: ()=>{}
                        });
                    }
                })
                .catch((error)=>{
                    this.$alert(error, '温馨提示', {
                        confirmButtonText: '确定',
                        callback: ()=>{}
                    });
                })
            },
            add(){
                this.dialogForm = true;
                this.info = '';
            },
            dialog(data,info,res,id){
                this.dialogForm = false;
                if(data == 'ok' && res == 'add'){
                    this.$http.post(api + '/api/user/addAccount',{
                        name: info[0].name,
                        rule_id: info[0].rule,
                        email: info[0].account,
                        password:info[0].password
                    })
                    .then((res)=>{
                        if(res.data.code == 200){
                            this.getList();
                            this.$message({type: 'success',message: '添加成功！'})
                        }else{
                            this.$alert(res.data.error, '温馨提示', {
                                confirmButtonText: '确定',
                                callback: ()=>{}
                            });
                        }
                    })
                }
                if(data == 'ok' && res == 'edit'){
                    this.$http.post(api + "/api/user/editAccount",{
                        account_id: id,
                        operate: 'setRule',
                        param: info.rule_id,
                        name: info.name
                    })
                    .then((res)=>{
                        if(res.data.code == 200){
                            this.$message({type: 'success',message: '修改成功！'})
                            this.getList();
                        }else{
                            this.$alert(res.data.error, '温馨提示', {
                                confirmButtonText: '确定',
                                callback: ()=>{}
                            });
                        }
                    })
                }
            },
            out(id){
                this.$http.get(api + "/api/user/delAccount?account_id=" + id)
                .then((res)=>{
                    if(res.data.code == 200){
                        this.getList();
                        this.$message({type: 'success',message: '删除成功！'})
                    }else{
                        this.$alert(res.data.error, '温馨提示', {
                            confirmButtonText: '确定',
                            callback: ()=>{}
                        });
                    }
                })
            },
            reset(id){
                this.$confirm('是否确认重置密码?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(api + "/api/user/editAccount",{
                        account_id: id,
                        operate: 'resetPassword',
                        param: ''
                    })
                    .then((res)=>{
                        if(res.data.code == 200){
                            this.$message({
                                type: 'success',
                                message: '重置成功！'
                            })
                        }else{
                            this.$alert(res.data.error, '温馨提示', {
                                confirmButtonText: '确定',
                                callback: ()=>{}
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });          
                });
            }
        }
    }
</script>
<style>
.account .el-pagination{
    padding: 0
}
</style>

<style lang="less" scoped>
    .account{
        text-align: left;
        .page{
            float: right;
            margin-top: 30px;
        }
        .ruleForm{
            width: 400px;
            margin-top: 30px;
        }
    }
</style>

