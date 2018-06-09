/*
 * @Author: zhengu.jiang 
 * @Date: 2018-05-14 17:21:55 
 * @Module: {公司详情} 
 */

<template>
    <div class="customer">
        <div class="clearfix">
            <el-button class="fl" type="warning" @click="back" plain style="width:100px;margin-bottom:20px">返回</el-button>
            <el-button v-if="list.id" type="primary" @click="openRemark" style="width:100px;margin-bottom:20px">添加备忘</el-button>
            <el-button v-if="list.id" type="primary" @click="delCustomer" style="width:100px;margin-bottom:20px">删除</el-button>
        </div>
        <table border="1" align="center" cellspacing="0" style="border-collapse:collapse;">
            <tr>
                <td>公司名称:</td>
                <td colspan="2" class="left"><input v-model="list.enterprise_name" type="text"></td>
                <td>创始人:</td>
                <td><input v-model="list.legal_person" type="text"></td>
                <td>客户等级:</td>
                <td>
                    <el-rate v-model="list.level"></el-rate>
                </td>
            </tr>
            <tr>
                <td style="line-height:100px">融资情况:</td>
                <td colspan="6">
                    <textarea v-model="list.financing" type="text" style="width: 100%;height:200px"></textarea>
                </td>
            </tr>
            <!--<tr>
                <td rowspan="2">上市情况</td>
                <td>板块:</td>
                <td><input v-model="list.plate" type="text"></td>
                <td>注册资本:</td>
                <td colspan="3"><input v-model="list.reg_capital" type="text"></td>
            </tr>
            <tr>
                <td>股票代码:</td>
                <td><input v-model="list.stock_code" type="text"></td>
                <td>公司主页:</td>
                <td colspan="3"><input v-model="list.home_page" type="text"></td>
            </tr>-->
            <tr>
                <td>注册时间:</td>
                <td colspan='2'><input v-model="list.reg_time" type="text"></td>
                <td>公司地址:</td>
                <td colspan='3'><input v-model="list.address" type="text"></td>
            </tr>
            <tr>
                <td>企业性质</td>
                <td colspan="6">
                    <el-radio-group v-model="list.type">
                        <el-radio style="margin-right:20px" :label="item.id" v-for="(item,index) in nature" :key="index">{{item.name}}</el-radio>
                    </el-radio-group>
                </td>
            </tr>
            <tr>
                <td rowspan="4">企业概况</td>
                <td style="text-align:left" colspan="6">公司背景:</td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="6">
                    <textarea v-model="list.background" type="text" style="width: 100%;height:200px"></textarea>
                </td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="6">相关报道:</td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="6">
                    <textarea v-model="list.reports" type="text" style="width: 100%;height:200px"></textarea>
                </td>
            </tr>
            <!--<tr>
                <td style="text-align:left" colspan="6">荣誉奖项:</td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="6">
                    <textarea v-model="list.award" type="text" style="width: 100%;height:100px"></textarea>
                </td>
            </tr>-->
            <tr class="foot">
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
            </tr>

        </table>
        <div class="btn">
            <el-button v-if="!isClick" type="primary" @click="save" style="width:100px;margin-bottom:20px">保存</el-button>
            <el-button v-else type="primary" style="width:100px;margin-bottom:20px">保存</el-button>
        </div>
        <el-dialog
            title="添加备忘"
            :visible.sync="remark"
            width="500px"
            >
            <textarea class="cheat" v-model="cheat"></textarea>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
        <el-table
            v-loading="loading"
            :data="tableData"
            border
            style="max-width: 1402px;margin-top:20px;">
            <el-table-column
                prop="name"
                label="姓名"
                style="width:20%;"
                align="center"
                >
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="最近一次修改时间"
                style="width:20%"
                align="center"
                >
                <template slot-scope="scope">
                    <span>{{toDate(scope.row.create_time*1000)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="cheat"
                label="备忘"
                style="width:20%"
                align="center"
                >
            </el-table-column>
            <el-table-column
                label="操作日志"
                style="width:20%"
                align="center"
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.type == 1">添加备忘</span>
                    <span v-else>编辑</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="total" class="page" @current-change="currentChange" background layout="prev, pager, next" :total="total">
        </el-pagination>
    </div>
</template>
<script>
import api from './http'
export default {
    data(){
        return {
            list: {
                enterprise_name: '', //企业名称
                legal_person: '', //法人
                level: 0, //等级
                financing: '', //融资情况
                reg_time: '', //注册时间
                address: '', //公司地址
                type: '', //企业性质 0 民营 1 国有 2 台资 3 港资 4 其他外资
                background: '', //公司背景
                reports: '', //相关报道
            },
            nature: [
                {name: '国有企业',id: 1},
                {name: '民/私有企业',id: 0},
                {name: '台资企业',id: 2},
                {name: '港资企业',id: 3},
                {name: '其他外资企业',id: 4},
            ],
            remark: false,
            cheat: '', //备忘
            loading: false,
            tableData: [],
            page: 1,
            total: 1,
            isClick: false
        }
    },
    mounted(){
       let data = JSON.parse(sessionStorage.getItem('company'));
       if(data){
           for(let key in this.list){
               this.list[key] = data[key];
           }
           this.list.id = data.id;
           this.getList();
       }else{
           sessionStorage.removeItem('customerInfo');
       }
    },
    destroyed(){
        sessionStorage.removeItem('company')
    },
    methods: {
        //删除客户
        delCustomer(){
            this.$confirm('是否删除该客户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(api + '/api/Customer/delete?id='+this.list.id)
                    .then((res)=>{
                        if(res.data.code == 200){
                            this.$message({type: 'success',message: '删除成功！'});
                            history.go(-1)
                        }else{
                            this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });          
                });
        },
        toDate(time){
            let data = new Date(time).format("yyyy-MM-dd hh:mm:ss")
            return data;
        },
        //操作记录
        getList(){
            this.loading = true;
            this.$http.post(api + '/api/Cheat/getCheatList?customer_id='+this.list.id+'&page='+this.page+'&num=10')
            .then((res)=>{
                if(res.data.code == 200){
                    this.loading = false;
                    this.tableData = res.data.data.list
                    this.total = res.data.data.total;
                }else{
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }
            })
        },
        currentChange(page) {
            this.page = page;
            this.getList();
        },
        //返回
        back(){
            history.go(-1)
        },
        openRemark(){
            this.remark = true;
        },
        cancel(){
            this.remark = false;
        },
        submit(){
            this.remark = false;
            this.$http.post(api + '/api/Cheat/addCheat?customer_id='+this.list.id+'&cheat='+this.cheat)
            .then((res)=>{
                if(res.data.code == 200){
                    this.$message({type: 'success',message: '添加成功！'})
                    this.getList();
                }else{
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }
            })
        },
        save(){
            this.isClick = true;
            if(!sessionStorage.getItem('company')){
                this.$http.post(api + '/api/Customer/addCustomer',this.list)
                .then((res)=>{
                    if(res.data.code == 200){
                        this.$message({type: 'success',message: '保存成功！'})
                        history.go(-1);
                    }else{
                        this.isClick = false;
                        this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                    }
                })
            }else{
                this.$http.post(api + '/api/Customer/editCustomer',this.list)
                .then((res)=>{
                    if(res.data.code == 200){
                        this.$message({type: 'success',message: '保存成功！'})
                        history.go(-1);
                    }else{
                        this.isClick = false;
                        this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                    }
                })
            }
        },
        showError(content){
            this.$alert(content, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
        },
    
    }
}
</script>
<style scoped>
.el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #fff !important;
}
.customer .el-button--warning.is-plain {
    color: #e6a23c;
    background: #fdf6ec;
    border-color: #f5dab1;
}
.customer .el-button--warning:hover {
    background: #ebb563; 
    border-color: #ebb563; 
    color: #fff;
}
</style>

<style lang="less" scoped>
    .customer{
        max-width:1400px;
        .page{
            float: right;
            margin-top: 30px;
        }
        table{
            border-color: #ccc;
            width: 100%;
            max-width: 1400px;
            min-width: 800px;
            td{
                width: 13%;
                height:40px;
                text-align: center;
                vertical-align:middle;
                // height: 40px;
                // line-height: 20px;
                padding-right: 10px;
                input{
                    width: 100%;
                }
            }
            .left{
                text-align: left;
            }
            .foot{
                td{
                    height: 0px;
                }
            }
        }
        .btn{
            margin-top: 20px;
        }
        textarea{
            &.cheat{
                border: 1px solid #ccc;
                width:100%;
                height: 150px;
            }
            
        }
    }
    
</style>
