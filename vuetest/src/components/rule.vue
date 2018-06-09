/*
 * @Author: zhengu.jiang 
 * @Date: 2018-05-14 18:20:13 
 * @Module: {权限设置} 
 */

<template>
    <div>
        <el-button type="primary" @click="add">添加用户组</el-button>
        <el-table
            v-loading="loading"
            :data="tableData"
            border
            style="width: 1002px;margin-top:20px;">
            <el-table-column
                prop="name"
                label="职位"
                style="width:20%;"
                align="center"
                >
            </el-table-column>
            <el-table-column
                prop="node_list.length"
                label="权限数量"
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
                    <el-button @click="showDetail(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" @click="out(scope.row.id)" size="small" style="color:red">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <rule @close="dialog" v-if="dialogForm" :edit="edit" :rule="rule" :nodeList="nodeList" :dialogForm="dialogForm"></rule>
    </div>
</template>
<script>
import rule from "./rule_win";
import store from "../store.js"
import api from "./http.js"
export default {
    data() {
        return {
            tableData: [],
            dialogForm: false,
            nodeList: [],
            outerVisible: false,
            innerVisible: false,
            rule: '',
            edit: false,
            loading: true,
        }
    },
    components: {
        rule
    },
    mounted(){
        this.init();
    },
    methods: {
        init(){
            this.$http.get(api + '/api/Rule/ruleList')
            .then((res)=>{
                if(res.data.code == 200){
                    this.tableData = res.data.data.ruleList;
                    this.nodeList = res.data.data.nodeList;
                    let all = {name: '全部',child: []}
                    for(var i = 0; i < this.nodeList.length; i++){
                        for(var j = 0; j < this.nodeList[i].child.length; j++){
                            this.nodeList[i].child[j].selected = false;
                        }
                        all.child = all.child.concat(this.nodeList[i].child)
                    }
                    this.nodeList.unshift(all);
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
        //编辑
        showDetail(res){
            this.rule = res;
            this.dialogForm = true;
            this.edit = true;
        },
        //删除
        out(id){
            this.$confirm('此操作将永久删除该职位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRule(id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            
        },
        deleteRule(id){
            this.$http.get(api + "/api/Rule/delRule?node_id=" + id)
            .then((res)=>{
                if(res.data.code == 200){
                    this.init();
                    this.$message({
                        type: 'success',
                        message: '删除成功！'
                    })
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
            this.edit =false;
        },
        cancel(){
            this.dialogForm = false;
        },
        dialog(res,data){
            this.dialogForm = false;
            if(res == 'ok'){
                if(this.edit){
                    this.$http.post(api + "/api/Rule/editRule",data[0])
                    .then((res)=>{
                        if(res.data.code == 200){
                            this.$message({
                                type: 'success',
                                message: '编辑成功！'
                            })
                            this.init();
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
                }else{
                    this.$http.post(api + "/api/Rule/addRule",data[0])
                    .then((res)=>{
                        if(res.data.code == 200){
                            this.$message({
                                type: 'success',
                                message: '添加成功！'
                            })
                            this.init();
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
                }
            }
        },
    }
}
</script>
<style lang="less" scoped>
    table{
        border-collapse: collapse;
        border: 1px solid #ccc;
        tr,td{
            text-align: center;
            border: 1px solid #ccc;
        }
    }
</style>
