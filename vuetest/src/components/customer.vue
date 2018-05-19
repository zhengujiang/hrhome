/*
 * @Author: zhengu.jiang 
 * @Date: 2018-05-14 18:18:15 
 * @Module: {客户管理} 
 */


<template>
    <div class="customer">
        <div style="margin-bottom:20px">
            <el-input placeholder="输入候选人的姓名、手机号、职位查询" classs="el-icon-search" v-model="searchTalent" style="width:310px"></el-input>
            <!-- <el-button type="primary" style="margin-right:50px">查询</el-button> -->
            <el-button type="primary"><i class="el-icon-search" style="margin-right:5px"></i>搜索</el-button>
            <el-button @click="addCustomer" type="primary"><i class="el-icon-plus" style="margin-right:10px"></i>新增客户</el-button>
            <el-button @click="addJob" type="primary"><i class="el-icon-plus" style="margin-right:10px"></i>新增职位</el-button>
        </div>
        <el-table
            v-loading="loading"
            :data="tableData"
            border
            style="max-width:1300px"
            >
            <el-table-column
                prop="level"
                label="等级"
                align="center"
                min-width="8%">
            </el-table-column>
            <el-table-column
                prop="enterprise_name"
                label="公司名称"
                align="center"
                min-width="15%">
            </el-table-column>
            <el-table-column
                prop="signing_time"
                label="签约时间"
                align="center"
                min-width="10%">
            </el-table-column>
            <el-table-column
                prop="position_title"
                label="职位名称"
                align="center"
                min-width="10%">
            </el-table-column>
            <el-table-column
                prop="amount"
                label="佣金"
                align="center"
                min-width="7%">
            </el-table-column>
            <el-table-column
                prop="recommended_total"
                label="已推荐人数"
                align="center"
                min-width="7%">
            </el-table-column>
            <el-table-column
                prop="surface_total"
                label="约面人数"
                align="center"
                min-width="6%">
            </el-table-column>
            <el-table-column
                prop="offer_total"
                label="offer数"
                align="center"
                min-width="6%">
            </el-table-column>
            <el-table-column
                label="操作"
                align="center"
                min-width="12%">
                <template slot-scope="scope">
                    <el-button @click="showDetail(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" @click="out(scope.row.id)" size="small">上传简历</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import api from './http'
export default {
    data(){
        return {
            searchTalent: '',
            tableData: [],
            loading: true,
        }
    },
    mounted(){
        this.init();
    },
    methods: {
        init(){ //职位列表
            this.$http.get(api + '/api/Customer/getCustomerPositionList')
            .then((res)=>{
                if(res.data.code == 200){
                    this.tableData = res.data.data;
                    this.loading = false;
                }else{
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }
            })
        },
        addCustomer(){ //新增客户
            this.$router.push('/admin/customer/company')
        },
        addJob(){ //新增职位
            this.$router.push('/admin/customer/job')
        },
        //编辑
        showDetail(item){
            console.log(item)
        },
        //上传简历
        uploadResume(){

        }
    }
}
</script>
<style>
.customer .el-table .cell, .el-table th>div{
    padding-left: 10px !important;
    padding-right: 10px !important;
}
</style>

<style lang="less" scoped>
    .customer{
        
    }
    
</style>
