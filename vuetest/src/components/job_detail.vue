/*
 * @Author: zhengu.jiang 
 * @Date: 2018-05-14 17:42:48 
 * @Module: {职位详情} 
 */


<template>
    <div class="customer">
        <div class="clearfix">
            <el-button class="fl" type="warning" @click="back" plain style="width:100px;margin-bottom:20px">返回</el-button>
            <el-button v-if="list.id" type="primary" @click="delJob" style="width:100px;margin-bottom:20px">删除</el-button>
        </div>
        <div class="top">
            <span>所属公司名称:</span>
            <el-autocomplete
                class="inline-input"
                v-model="state2"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
                v-if="edit"
            ></el-autocomplete>
            <!-- <el-select v-if="edit" v-model="list.cid" placeholder="请选择公司" style="width:250px">
                <el-option v-for="item in options" :key="item.id" :label="item.enterprise_name" :value="item.id+''">
                </el-option>
            </el-select> -->
            <span v-else style="color: #20a0ff">&nbsp;{{name}}</span>
            <el-button @click="addCustomer" type="primary">
            <i class="el-icon-plus" style="margin-right:10px"></i>新增客户</el-button>
        </div>
        <table border="1" align="center" cellspacing="0" style="border-collapse:collapse;">
            <tr>
                <td>职位名称:</td>
                <td><input v-model="list.position_title" type="text"></td>
                <td>需要人数:</td>
                <td><input v-model="list.number" type="text"></td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="4">职位描述：</td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="4">
                    <textarea v-model="list.position_desc" type="text" style="height:200px"></textarea>
                </td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="4">薪酬待遇：</td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="4">
                    <textarea v-model="list.salary" type="text"></textarea>
                </td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="4">对标公司：</td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="4">
                    <textarea v-model="list.standard_company" type="text"></textarea>
                </td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="4">其他要求：</td>
            </tr>
            <tr>
                <td style="text-align:left" colspan="4">
                    <textarea v-model="list.other" type="text"></textarea>
                </td>
            </tr>
            <!--<tr>
                <td colspan="4">职位待遇</td>
            </tr>
            <tr>
                <td>年龄:</td>
                <td><input v-model="list.age" type="text"></td>
                <td>性别:</td>
                <td>
                    <el-radio-group v-model="list.gender">
                        <el-radio style="margin-right:20px" :label="item.id" v-for="(item,index) in gender" :key="index">{{item.name}}</el-radio>
                    </el-radio-group>
                </td>
            </tr>
            <tr>
                <td>婚姻状况:</td>
                <td>
                    <el-radio-group v-model="list.is_marriage">
                        <el-radio style="margin-right:20px" :label="item.id" v-for="(item,index) in marriage" :key="index">{{item.name}}</el-radio>
                    </el-radio-group>
                </td>
                <td>学历:</td>
                <td><input v-model="list.seniority" type="text"></td>
            </tr>-->
            <!-- <tr>
                <td colspan="4">目标公司</td>
            </tr>
            <tr>
                <td colspan="4">
                    <textarea v-model="list.other" type="text" style="width: 100%;height:100px"></textarea>
                </td>
            </tr> -->
            <tr class="foot">
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
    </div>
</template>
<script>
import api from './http'
export default {
    data() {
        return {
            list: {
                cid: '', //所属公司id
                position_title: '', //职位名称
                number: '', //需要人数
                position_desc: '', //职位描述
                salary: '', //薪酬待遇
                standard_company: '', //对标公司
                other: '', //其他要求
            },
            options: [],
            name: '',
            edit: true,
            state2: '',
            isClick: false,
        }
    },
    mounted() {
        let data = JSON.parse(sessionStorage.getItem('job'));
        if (data) {
            for (let key in this.list) {
                this.list[key] = data[key];
            }
            this.list.id = data.id;
            this.edit = false;
        }else{
            sessionStorage.removeItem('customerInfo');
        }
        this.getCompany();
    },
    destroyed() {
        sessionStorage.removeItem('job')
    },
    methods: {
        //删除客户
        delJob(){
            this.$confirm('是否删除该职位?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post(api + '/api/Position/delete?id='+this.list.id)
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
        //职位选择
        querySearch(queryString, cb) {
            var restaurants = this.options;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
            };
        },
        //选择职位
        handleSelect(item) {
            this.list.cid = item.id;
        },
        back() {
            history.go(-1);
        },
        save() {
            if(!this.list.cid){
                this.$alert('请选择公司', '温馨提示', { confirmButtonText: '确定', callback: () => { } });
                return false
            }
            this.isClick = true;
            if (!sessionStorage.getItem('job')) {
                this.$http.post(api + '/api/Position/addPosition', this.list)
                    .then((res) => {
                        if (res.data.code == 200) {
                            history.go(-1);
                            this.$message({ type: 'success', message: '保存成功！' })
                        } else {
                            this.isClick = false;
                            this.$alert(res.data.error, '温馨提示', { confirmButtonText: '确定', callback: () => { } });
                        }
                    })
            } else {
                this.$http.post(api + '/api/Position/editPosition', this.list)
                    .then((res) => {
                        if (res.data.code == 200) {
                            history.go(-1);
                            this.$message({ type: 'success', message: '保存成功！' })
                        } else {
                            this.isClick = false;
                            this.$alert(res.data.error, '温馨提示', { confirmButtonText: '确定', callback: () => { } });
                        }
                    })
            }
        },
        //新增客户
        addCustomer() {
            this.$router.push('/admin/customer/company');
        },
        //公司列表
        getCompany() {
            this.$http.get(api + '/api/Customer/getCustomerList')
                .then((res) => {
                    if (res.data.code == 200) {
                        this.options = res.data.data;
                        for (let i = 0; i < this.options.length; i++) {
                            if (this.list.cid == this.options[i].id) {
                                this.name = this.options[i].enterprise_name;
                            }
                            this.options[i].value = this.options[i].enterprise_name;
                        }
                    } else {
                        this.$alert(res.data.error, '温馨提示', { confirmButtonText: '确定', callback: () => { } });
                    }
                })
        }
    }
}
</script>
<style scoped>
.el-table--enable-row-hover .el-table__body tr:hover > td {
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
.customer {
    .top {
        margin-bottom: 20px;
    }
    table {
        border-color: #ccc;
        width: 100%;
        max-width: 1000px;
        min-width: 800px;
        td {
            width: 13%;
            text-align: center;
            padding-left: 5px;
            height: 40px;
            vertical-align: middle;
            // line-height: 20px;
            input {
                width: 100%;
            }
            textarea{
                width: 100%;
                height: 150px;
            }
        }
        .foot {
            td {
                height: 0px;
            }
        }
    }
    .btn {
        margin-top: 20px;
    }
}
</style>
