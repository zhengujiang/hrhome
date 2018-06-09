<template>
    <div class="recomened">
        <el-dialog title="重新推荐" :visible.sync="showForm" @close="close">
            <div v-for="(item,index) in list" :key="index">
                <el-select v-model="item.cid" placeholder="请选择公司" @change="changeCom(item,index)" style="width:200px">
                    <el-option
                        v-for="res in item.companys"
                        :key="res.id"
                        :label="res.enterprise_name"
                        :value="res.id+''">
                    </el-option>
                </el-select>
                <el-select v-model="item.gid" placeholder="请选择职位" @change="changeJob(item,index)" style="width:200px;margin-left:10px">
                    <el-option
                        v-for="res in item.jobs"
                        :key="res.id"
                        :label="res.position_title"
                        :value="res.id+''">
                    </el-option>
                </el-select>
                <i @click="add" class="el-icon-plus"></i>
                <i @click="out(index)" v-if="list.length > 1" class="el-icon-delete"></i>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import api from './http'
export default {
    data() {
        return {
            showForm: false,
            companys: [], //公司
            jobs: [], //职位
            list: [
                {companys: [],cid: '',jobs: [], gid: ''}
            ]
        };
    },
    props: ["dialog","info"],
    mounted() {
        this.showForm = this.dialog;
        this.getCompany(0);
    },
    methods: {
        cancel() {
            this.$emit("close", "close");
        },
        submit() {
            let customerIds = '';
            let positionIds = '';
            for(let i = 0; i < this.list.length; i++){
                if(!this.list[i].cid){
                    this.$alert("请选择公司", '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                    return false
                }
                if(!this.list[i].gid){
                    this.$alert("请选择职位", '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                    return false
                }
                customerIds += this.list[i].cid + ",";
                positionIds += this.list[i].gid + ",";
            }
            customerIds = customerIds.substring(0,customerIds.length-1);
            positionIds = positionIds.substring(0,positionIds.length-1);
            this.$http.get(api + '/api/talent/recommend?id='+this.info.id+'&basic_id='+this.info.basic_id+'&customerIds='+customerIds+"&positionIds="+positionIds)
            .then((res)=>{
                if(res.data.code == 200){
                    this.$message({type: 'success',message: '推荐成功！'})
                    this.$emit("close", "ok");
                }else{
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }
            })
            
        },
        close(res){
            this.$emit("close", "close");
        },
        //选中公司
        changeCom(item,index){
            this.getJobs(item.cid,index);
        },
        changeJob(res){
            console.log(res)
        },
        //公司列表
        getCompany(index){
            this.$http.get(api + '/api/Customer/getCustomerList')
            .then((res)=>{
                if(res.data.code == 200){
                    this.list[index].companys = res.data.data;
                    this.$set(this.list, index, this.list[index]);
                }else{
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }
            })
        },
        //根据公司id获取职位
        getJobs(id,index){
            this.$http.get(api + '/api/Position/getPositionList?customer_id=' + id)
            .then((res)=>{
                if(res.data.code == 200){
                    this.list[index].jobs = res.data.data;
                    this.$set(this.list, index, this.list[index]);
                }else{
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }
            })
        },
        add(){
            this.list.push({companys: [],cid: '',jobs: [], gid: ''});
            this.getCompany(this.list.length-1);
        },
        out(index){
            this.list.splice(index,1)
        }
    }
};
</script>
<style>
.el-dialog--small {
    width: 600px;
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
    }
</style>
