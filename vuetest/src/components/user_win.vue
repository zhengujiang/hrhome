<template>
    <el-dialog title="添加账号" :visible.sync="showForm" @close="close">
        <el-form :model="form" label-width="75px" :rules="rules" ref="form" class="ruleForm">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="account">
                <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="rule">
                <el-select v-model="form.rule" placeholder="请选择职位" style="width:325px">
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
        }
    },
    props: ['dialogForm'],
    mounted(){
        this.showForm = this.dialogForm;
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
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.tableData.push(this.form)
                    if(this.tableData[0].password.length < 6){
                        this.$alert("密码长度不能小于6", '温馨提示', {
                            confirmButtonText: '确定',
                            callback: ()=>{}
                        });
                    }else{
                        this.$emit('close','ok',this.tableData);
                    }
                } else {
                    return false;
                }
            });
            
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

