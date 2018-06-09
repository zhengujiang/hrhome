<template>
    <div class="recomened">
        <el-dialog title="编辑" :visible.sync="showForm" @close="close">
            <el-form :model="form" label-width="100px" ref="form" class="ruleForm">
                <el-form-item label="年薪:" prop="annual_salary">
                    <el-input v-model="form.annual_salary"></el-input>
                </el-form-item>
                <el-form-item label="服务费:" prop="service_charge">
                    <el-input v-model="form.service_charge"></el-input>
                </el-form-item>
                <el-form-item label="对接:" prop="butt">
                    <el-input v-model="form.butt"></el-input>
                </el-form-item>
                <el-form-item label="做单:" prop="make_list">
                    <el-input v-model="form.make_list"></el-input>
                </el-form-item>
                <el-form-item label="入职时间:" prop="induction_time">
                    <el-date-picker
                        v-model="form.induction_time"
                        type="date"
                        style="width:300px"
                        @change="changeTime"
                        value-format="yyyy-mm-dd"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import api from './http'
export default {
    data() {
        return {
            // rules: {
            //     annual_salary: [{ required: true, message: '请输入年薪', trigger: 'change' }],
            //     service_charge: [{ required: true, message: '请输入服务费', trigger: 'change' }],
            //     butt: [{ required: true, message: '请输入对接', trigger: 'change' }],
            //     make_list: [{ required: true, message: '请输入做单', trigger: 'change' }],
            //     induction_time: [{ required: true, message: '请选择入职时间', trigger: 'change' }]
            // },
            showForm: false,
            form: {
                id: '',
                annual_salary: '',
                service_charge: '',
                butt: '',
                make_list: '',
                induction_time: '',
            },
        };
    },
    props: ["dialog","info","type"],
    mounted() {
        this.showForm = this.dialog;
        this.form.id = this.info.id;
        if(this.type != 'offer'){
            for(let key in this.form){
                this.form[key] = this.info[key];
                if(key == 'induction_time'){
                    this.form[key] = this.form[key] * 1000;
                }
            }
        }
    },
    methods: {
        changeTime(res){
            console.log(res)
        },
        cancel() {
            this.$emit("editWin", "close");
        },
        submit(formName) {
            // if(!this.form.annual_salary){
            //     this.$alert("请输入年薪", '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
            //     return false
            // }
            // if(!this.form.service_charge){
            //     this.$alert("请输入服务费", '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
            //     return false
            // }
            // if(!this.form.butt){
            //     this.$alert("请输入对接", '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
            //     return false
            // }
            // if(!this.form.make_list){
            //     this.$alert("请输入做单", '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
            //     return false
            // }
            if(!this.form.induction_time){
                this.$alert("请选择入职时间", '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                return false
            }
            // console.log(new Date(this.form.induction_time).getTime()/1000)
            // let time = new Date(this.form.induction_time).getTime();
            // this.form.induction_time = new Date(this.form.induction_time).getTime()/1000;
            if(this.type != 'offer'){
                this.$http.post(api + '/api/talent/editByOffer',{
                    id: this.form.id,
                    annual_salary: this.form.annual_salary,
                    service_charge: this.form.service_charge,
                    butt: this.form.butt,
                    make_list: this.form.make_list,
                    induction_time: new Date(this.form.induction_time).getTime()/1000,
                })
                .then((res)=>{
                    if(res.data.code == 200){
                        this.$message({type: 'success',message: '操作成功！'})
                        this.$emit("editWin", "ok");
                    }else{
                        this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                    }
                    
                })
            }else{
                this.form.operationType = 7;
                this.$http.post(api + '/api/talent/operationStatus',{
                    id: this.form.id,
                    operationType: 7,
                    annual_salary: this.form.annual_salary,
                    service_charge: this.form.service_charge,
                    butt: this.form.butt,
                    make_list: this.form.make_list,
                    induction_time: new Date(this.form.induction_time).getTime()/1000,
                })
                .then((res)=>{
                    if(res.data.code == 200){
                        this.$message({type: 'success',message: '操作成功！'})
                        this.$emit("editWin", "ok");
                    }else{
                        this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                    }
                    
                })
            }
            
        },
        close(res){
            this.$emit("editWin", "close");
        },
    }
};
</script>
<style>
.el-dialog--small {
    width: 40%;
}
</style>

<style lang="less" scoped>
    .recomened{
        i{
            display: inline-block;
            font-size: 22px;
            line-height: 40px;
            margin-left: 15px;
            vertical-align: middle;
            cursor: pointer;
        }
        .ruleForm{
            width: 400px;
            margin: 0 auto;
            margin-top: 30px;
        }
    }
</style>
