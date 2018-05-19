/*
 * @Author: zhengu.jiang 
 * @Date: 2018-05-14 17:21:55 
 * @Module: {公司详情} 
 */

<template>
    <div class="customer">
        <div class="clearfix">
            <el-button class="fl" type="warning" @click="back" plain style="width:100px;margin-bottom:20px">返回</el-button>
        </div>
        <table border="1" align="center" cellspacing="0" style="border-collapse:collapse;">
            <tr>
                <td>企业名称</td>
                <td colspan="2" class="left"><input v-model="list.enterprise_name" type="text"></td>
                <td>法人</td>
                <td colspan="3"><input v-model="list.legal_person" type="text"></td>
            </tr>
            <tr>
                <td style="line-height:100px">融资情况</td>
                <td colspan="6">
                    <textarea v-model="list.financing" type="text" style="width: 100%;height:100px"></textarea>
                </td>
            </tr>
            <tr>
                <td rowspan="2">上市情况</td>
                <td>板块</td>
                <td><input v-model="list.plate" type="text"></td>
                <td>注册资本</td>
                <td colspan="3"><input v-model="list.reg_capital" type="text"></td>
            </tr>
            <tr>
                <td>股票代码</td>
                <td><input v-model="list.stock_code" type="text"></td>
                <td>公司主页</td>
                <td colspan="3"><input v-model="list.home_page" type="text"></td>
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
                <td rowspan="6">企业概况</td>
                <td style="text-align:left" colspan="6">公司背景:</td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="6">
                    <textarea v-model="list.background" type="text" style="width: 100%;height:100px"></textarea>
                </td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="6">发展历程:</td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="6">
                    <textarea v-model="list.course" type="text" style="width: 100%;height:100px"></textarea>
                </td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="6">荣誉奖项:</td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="6">
                    <textarea v-model="list.award" type="text" style="width: 100%;height:100px"></textarea>
                </td>
            </tr>
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
            <el-button type="primary" @click="save" style="width:100px;margin-bottom:20px">保存</el-button>
        </div>
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
                financing: '', //融资情况
                plate: '', //板块
                stock_code: '', //股票代码
                reg_capital: '', //注册资本
                home_page: '', //公司主页
                type: '', //企业性质 0 民营 1 国有 2 台资 3 港资 4 其他外资
                background: '', //背景描述
                course: '', //发展历程
                award: '', //奖项
            },
            nature: [
                {name: '国有企业',id: 1},
                {name: '民/私有企业',id: 0},
                {name: '台资企业',id: 2},
                {name: '港资企业',id: 3},
                {name: '其他外资企业',id: 4},
            ]
        }
    },
    mounted(){

    },
    methods: {
        //返回
        back(){
            history.go(-1)
        },
        save(){
            this.$http.post(api + '/api/Customer/addCustomer',this.list)
            .then((res)=>{
                if(res.data.code == 200){
                    
                    
                }else{
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }
            })
        }
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
        table{
            border-color: #ccc;
            width: 100%;
            max-width: 1000px;
            min-width: 800px;
            td{
                width: 13%;
                height:30px;
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
    }
    
</style>
