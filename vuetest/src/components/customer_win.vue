/*
 * @Author: zhengu.jiang 
 * @Date: 2018-05-19 15:19:13 
 * @Module: {客户管理编辑弹框} 
 */
<template>
    <el-dialog title="编辑" :visible.sync="showForm" @close="close" class="box">
        <el-form :model="form" label-width="100px" ref="form" class="ruleForm">
            <el-form-item label="项目经理" prop="name">
                <!-- <el-input v-model="form.name"></el-input> -->
                <el-select v-model="managerName" placeholder="请选择项目经理" style="width:300px">
                    <el-option
                        v-for="item in managers"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id+''">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="佣金" prop="amount">
                <el-input v-model="form.amount" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="签约时间" prop="signing_time">
                <el-date-picker
                    v-model="form.signing_time"
                    type="date"
                    style="width:300px"
                    value-format="yyyy-mm-dd"
                    :editable="false"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="当前节点" prop="status">
                <el-select v-model="statusName" placeholder="请选择节点" style="width:300px">
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id+''">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客户等级" prop="status">
                <el-rate v-model="form.level" score-template="{value}" style="line-height:45px"></el-rate>
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
            form: {
                id: '',
                manager_id: '', //项目经理
                amount: '',
                signing_time: '',
                status: '', //当前节点
                level: 0
            },
            options: [
                {id: 0, name: '待签约'},
                {id: 1, name: '已签约'},
                {id: 2, name: '已付首款'},
                {id: 3, name: '已付尾款'}
            ],
            managers: [],
            showForm: false,
            statusName: '', //当前节点名
            managerName: '', //项目经理名
        }
    },
    props: ['dialogForm','editList'],
    mounted(){
        this.showForm = this.dialogForm;
        for(let key in this.form){
            this.form[key] = this.editList[key];
            if(key == 'signing_time'){
                this.form[key] = this.form[key] * 1000;
                if(!this.form[key]){
                    this.form[key] = new Date().getTime();
                }
            }
        }
        for(let i = 0; i < this.options.length; i++){
            if(this.options[i].id == this.form.status){
                this.statusName = this.options[i].name;
            }
        }
        this.$http.get(api + '/api/Customer/editPositionInfo')
        .then((res)=>{
            if(res.data.code == 200){
                this.managers = res.data.data.list;
                for(let i = 0; i < this.managers.length; i++){
                    if(this.managers[i].id == this.form.manager_id){
                        this.managerName = this.managers[i].name;
                    }
                }
            }else{
                this.$alert(res.data.error, '温馨提示', {
                    confirmButtonText: '确定',
                    callback: ()=>{}
                });
            }
        })
    },
    methods: {
        cancel(){
            this.$emit('close','close');
        },
        submitForm(formName) {
            if(Number(this.managerName)){
                this.form.manager_id = this.managerName;
            }
            if(Number(this.statusName)){
                this.form.status = this.statusName;
            }
            if(!this.form.manager_id){
                this.$alert("请选择项目经理", '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                return false
            }
            // if(!this.form.amount){
            //     this.$alert("请输入佣金", '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
            //     return false
            // }
            if(!this.form.signing_time){
                this.$alert("请选择签约时间", '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                return false
            }
            // if(!this.form.status){
            //     this.$alert("请选择节点", '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
            //     return false
            // }
            this.$http.post(api + '/api/Customer/editPositionInfo',{
                id: this.form.id,
                manager_id: this.form.manager_id,
                amount: this.form.amount,
                signing_time: new Date(this.form.signing_time).getTime()/1000,
                level: this.form.level,
                status: this.form.status,
            })
            .then((res)=>{
                if(res.data.code == 200){
                    this.$message({type: 'success',message: '编辑成功！'})
                    this.$emit('close','ok');
                }else{
                    this.$alert(res.data.error, '温馨提示', {
                        confirmButtonText: '确定',
                        callback: ()=>{}
                    });
                }
            })
            
            
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

