/*
 * @Author: zhengu.jiang 
 * @Date: 2018-05-14 17:42:48 
 * @Module: {职位详情} 
 */


<template>
    <div class="customer">
        <div class="clearfix">
            <el-button class="fl" type="warning" @click="back" plain style="width:100px;margin-bottom:20px">返回</el-button>
        </div>
        <div class="top">
            <span>所属公司名称:</span>
            <el-select v-model="list.cid" placeholder="请选择职位" style="width:250px">
                <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.enterprise_name"
                    :value="item.id+''">
                </el-option>
            </el-select>
            <el-button @click="addCustomer" type="primary"><i class="el-icon-plus" style="margin-left:10px"></i>新增客户</el-button>
        </div>
        <table border="1" align="center" cellspacing="0" style="border-collapse:collapse;">
            <tr>
                <td>职位名称</td>
                <td><input v-model="list.position_title" type="text"></td>
                <td>所属部门</td>
                <td><input v-model="list.department" type="text"></td>
            </tr>
            <tr>
                <td>汇报对象</td>
                <td><input v-model="list.reporting_object" type="text"></td>
                <td> </td>
                <td> </td>
            </tr>
            <tr>
                <td colspan="4">职位描述</td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="4">岗位职责：</td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="4">
                    <textarea v-model="list.responsibility" type="text" style="width: 100%;height:100px"></textarea>
                </td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="4">任职要求：</td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="4">
                    <textarea v-model="list.position_requirements" type="text" style="width: 100%;height:100px"></textarea>
                </td>
            </tr>
            <tr>
                <td colspan="4">职位待遇</td>
            </tr>
            <tr>
                <td>年薪</td>
                <td><input v-model="list.annual_salary" type="text"></td>
                <td>薪资构成</td>
                <td><input v-model="list.salary_constitute" type="text"></td>
            </tr>
            <tr>
                <td>工作地点</td>
                <td><input v-model="list.working_place" type="text"></td>
                <td>其他</td>
                <td><input v-model="list.other" type="text"></td>
            </tr>
            <tr>
                <td colspan="4">任职资格</td>
            </tr>
            <tr>
                <td>年龄</td>
                <td><input v-model="list.age" type="text"></td>
                <td>性别</td>
                <td>
                    <el-radio-group v-model="list.gender">
                        <el-radio style="margin-right:20px" :label="item.id" v-for="(item,index) in gender" :key="index">{{item.name}}</el-radio>
                    </el-radio-group>
                </td>
            </tr>
            <tr>
                <td>婚姻状况</td>
                <td>
                    <!-- <el-radio-group v-model="list.is_marriage">
                        <el-radio style="margin-right:20px" :label="item.id" v-for="(item,index) in marriage" :key="index">{{item.name}}</el-radio>
                    </el-radio-group> -->
                    <el-checkbox-group v-model="list.is_marriage">
                        <el-checkbox :label="item.id" v-for="(item,index) in marriage" :key="index">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </td>
                <td>学历</td>
                <td><input v-model="list.seniority" type="text"></td>
            </tr>
            <tr>
                <td colspan="4">目标公司</td>
            </tr>
            <tr>
                <td colspan="4">
                    <textarea v-model="list.position_title" type="text" style="width: 100%;height:100px"></textarea>
                </td>
            </tr>
            <tr class="foot">
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
                cid: '', //所属公司id
                position_title: '', //职位名称
                department: '', //部门
                reporting_object: '', //汇报对象
                responsibility: '', //岗位职责
                position_requirements: '', //任职要求
                annual_salary: '', //年薪
                salary_constitute: '', //薪资构成
                working_place: '', //工作地点
                age: '', //年龄
                gender: '', //性别 0男 1女
                is_marriage: [], //婚姻状况 0 未婚 1已婚
                seniority: '', //学历
                other: '', //其他附加消息
            },
            gender: [
                {id: '0', name: '男'},
                {id: '1', name: '女'}
            ],
            marriage: [
                {id: '0', name: '未婚'},
                {id: '1', name: '已婚'}
            ],
            options:[]
        }
    },
    created(){
        this.getCompany();
    },
    mounted(){

    },
    methods: {
        back(){
            history.go(-1);
        },
        save(){
            this.list.is_marriage = 1;
            this.$http.post(api + '/api/Position/addPosition',this.list)
            .then((res)=>{
                if(res.data.code == 200){
                    history.go(-1);
                    
                }else{
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }
            })
        },
        //新增客户
        addCustomer(){
            this.$router.push('/admin/customer/company');
        },
        //公司列表
        getCompany(){
            this.$http.get(api + '/api/Customer/getCustomerList')
            .then((res)=>{
                if(res.data.code == 200){
                    this.options = res.data.data;
                    
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
        .top{
            margin-bottom: 20px;
        }
        table{
            border-color: #ccc;
            width: 100%;
            max-width: 1000px;
            min-width: 800px;
            td{
                width: 13%;
                text-align: center;
                padding-left: 5px;
                height: 40px;
                vertical-align:middle;
                // line-height: 20px;
                input{
                    width:100%;
                }
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
