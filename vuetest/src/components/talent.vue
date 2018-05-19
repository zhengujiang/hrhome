<template>
    <div class="talent">
        <div class="btn">
            <span @click="changeTalent(item.id)" v-for="(item,index) in btn.list" :key="index" :class="{'sign': item.id == btn.flag}">{{item.name}}</span>
            <el-input placeholder="输入候选人的姓名、手机号、职位查询" :prefix-icon="'el-icon-search'" v-model="searchTalent" style="width:310px"></el-input>
            <el-button type="primary">查询</el-button>
        </div>
        <el-table
            v-loading="loading"
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return {
            btn: {
                flag: '1',
                list: [
                    {name: '进行中',id: '1',selected: true},
                    {name: '已发offer',id: '2',selected: false},
                    {name: '储备中',id: '3',selected: false},
                    {name: '不合适',id: '4',selected: false},
                ]
            },
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            searchTalent: '',
            loading: true,
        }
    },
    mounted(){
        setTimeout(()=>{
            this.init()
        })
    },
    methods: {
        changeTalent(index){
            this.btn.flag = index;
        },
        search(){
            
        },
        //初始化列表
        init(){
            if(this.tableData.length > 0){
                this.loading = false;
            }
        },
    }
}
</script>
<style>
.talent .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #fff !important;
}
</style>
<style lang="less" scoped>
    .talent{
        .btn{
            margin-bottom: 30px;
            margin-top: 10px;
            span{
                display: inline-block;
                height: 40px;
                padding: 0 20px;
                text-align: center;
                line-height: 40px;
                background-color: #f2f2f2;
                cursor: pointer;
                margin-right: 10px;
                border-radius: 5px;
            }
            .sign{
                color: #fff;
                background-color: #20a0ff;
            }
        }
    }
</style>
