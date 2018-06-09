/*
 * @Author: zhengu.jiang 
 * @Date: 2018-05-14 18:19:13 
 * @Module: {账户弹框} 
 */
<template>
    <el-dialog :title="title" :visible.sync="showForm" @close="close">
        <el-form :model="form" label-width="75px" ref="form" class="ruleForm">
            <el-form-item label="姓名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item v-if="!edit" label="账号">
                <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item v-if="!edit" label="密码">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="权限">
                <el-select v-model="ruleName" placeholder="请选择职位" style="width:325px">
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id+''">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import api from './http.js'
export default {
    data() {
        return {
            rules: {
                name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
                account: [{ required: true, message: '请输入账号', trigger: 'change' }],
                password: [{ required: true, message: '请输入密码', trigger: 'change' }],
                rule: [{ required: true, message: '请选择权限', trigger: 'change' }]
            },
            tableData: [],
            form: {
                name: '',
                account: '',
                password: '',
                rule: ''
            },
            options: [],
            showForm: false,
            edit: false,
            ruleName: '',
            title: ''
        }
    },
    props: ['dialogForm','info'],
    mounted(){
        this.showForm = this.dialogForm;
        this.title = "添加账号"
        if(this.info) {
            this.edit = true;
            this.form.name = this.info.name;
            this.ruleName = this.info.rule_name;
            this.title = '编辑'
        }

        this.init();
    },
    methods: {
        init(){
            this.$http.get(api + '/api/Rule/ruleList')
            .then((res)=>{
                if(res.data.code == 200){
                    this.options = res.data.data.ruleList;
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
        cancel(){
            this.$emit('close','close');
        },
        submitForm(formName) {
            if(!this.form.name){
                this.$alert('请输入姓名', '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                return false
            }
            if(!this.edit){
                this.form.rule = this.ruleName;
                if(!this.form.account){
                    this.$alert('请输入账户', '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                    return false
                }
                if(!this.form.password){
                    this.$alert('请输入密码', '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                    return false
                }
                if(!this.form.rule){
                    this.$alert('请选择权限', '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                    return false
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.tableData.push(this.form)
                        if(this.tableData[0].password.length < 6){
                            this.$alert("密码长度不能小于6", '温馨提示', {
                                confirmButtonText: '确定',
                                callback: ()=>{}
                            });
                        }else{
                            this.$emit('close','ok',this.tableData,'add');
                        }
                    } else {
                        return false;
                    }
                });
            }else{
                let item = {
                    rule_id: this.ruleName > 0 ? this.ruleName : this.info.rule_id,
                    name: this.form.name
                }
                this.$emit('close','ok',item,'edit',this.info.id);
            }
            
        },
        close(){
            this.$emit('close','close');
        }
    }
}
</script>
<style lang="less" scoped>
    .ruleForm{
        width: 400px;
        margin: 0 auto;
        margin-top: 30px;
    }
</style>

