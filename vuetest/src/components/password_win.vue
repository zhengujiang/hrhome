/*
 * @Author: zhengu.jiang 
 * @Date: 2018-05-14 18:19:13 
 * @Module: {修改密码弹框} 
 */

<template>
    <div class="rule_win">
        <el-dialog title="修改密码" :visible.sync="showForm" @close="close">
            
            <el-form :model="form" label-width="75px" ref="form" class="ruleForm">
                <el-form-item label="旧密码">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password" v-model="form.newPassword"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
          </el-dialog>
    </div>
</template>
<script>
import api from './http.js'
export default {
    data() {
        return {
            form: {
                password: '',
                newPassword: '',
            },
            showForm: false,
        };
    },
    props: ['show'],
    mounted(){
        this.showForm = this.show;
    },
    methods: {
        cancel() {
            this.$emit("close", "close");
        },
        submitForm() {
            if(this.form.password.length < 6){
                this.$alert('旧密码长度最低6位', '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                return false
            }
            if(this.form.newPassword.length < 6){
                this.$alert('新密码长度最低6位', '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                return false
            }
            this.$http.post(api + "/api/user/modifyPassword",this.form)
            .then((res)=>{
                if(res.data.code == 200){
                    this.$message({type: 'success',message: '修改成功！'})
                    this.$emit("close", "ok");
                }else{
                    this.$alert(res.data.error, '温馨提示', {
                        confirmButtonText: '确定',
                        callback: ()=>{}
                    });
                }
            })
            
        },
        close() {
            this.$emit("close", "close");
        },
    }
};
</script>
<style >
    .rule_win .el-dialog--small {
        width: 500px;
    }
</style>


