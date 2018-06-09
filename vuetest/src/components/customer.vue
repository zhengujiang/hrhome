/*
 * @Author: zhengu.jiang 
 * @Date: 2018-05-14 18:18:15 
 * @Module: {客户管理} 
 */


<template>
    <div class="customer">
        <div style="margin-bottom:20px">
            <el-input placeholder="输入名称查询" classs="el-icon-search" v-model="searchTalent" style="width:200px"></el-input>
            <el-button @click="search" type="primary"><i class="el-icon-search" style="margin-right:5px"></i>搜索</el-button>
            <el-button @click="addCustomer" type="primary"><i class="el-icon-plus" style="margin-right:10px"></i>新增客户</el-button>
            <el-button @click="addJob" type="primary"><i class="el-icon-plus" style="margin-right:10px"></i>新增职位</el-button>
            <el-button @click="talentExport" type="primary" style="width:80px">导出</el-button>
            <el-button v-if="reBack" type="warning" @click="back" plain style="width:100px;margin-bottom:20px">返回</el-button>
        </div>
        <el-table
            v-loading="loading"
            :data="tableData"
            border
            class="list"
            >
            <el-table-column label="等级" align="center" min-width="7%">
                <div slot-scope="scope">
                    <span style="display:inline-block;width:100%;height:100%;position:absolute;left:0;top:0;z-index:10"></span>
                    <el-rate v-model="scope.row.level" text-color="#ff9900" ></el-rate>
                </div>
            </el-table-column>
            <el-table-column prop="enterprise_name" label="公司名称" align="center" min-width="20%">
                <template slot-scope="scope">
                    <el-button @click="showCustomer(scope.row.id)" type="text" size="small">{{scope.row.enterprise_name}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="10%">
                <template slot-scope="scope">
                    <el-button style="vertical-align:middle" @click="showDetail(scope.row)" type="text" size="small">编辑</el-button>
                    <div class="upload">
                        <input multiple="multiple" name="file" type="file" @change="uploadResume($event,scope.row)"/>
                        <el-button type="text" size="small" >上传简历</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="position_title" label="职位名称" align="center" min-width="10%">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.position_title" @click="showJob(scope.row.position_id)" type="text" size="small">{{scope.row.position_title}}</el-button>
                    <span v-else>--</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="项目经理" align="center" min-width="6%">
                <template slot-scope="scope">
                    <span v-if="scope.row.name">{{scope.row.name}}</span>
                    <span v-else>--</span>
                </template>
            </el-table-column>
            <el-table-column prop="recommended_total" label="已推荐人数" align="center" min-width="5%"> </el-table-column>
            <el-table-column prop="surface_total" label="约面人数" align="center" min-width="4%"> </el-table-column>
            <el-table-column prop="offer_total" label="offer数" align="center" min-width="4%"> </el-table-column>
            <el-table-column prop="amount" label="佣金" align="center" min-width="7%"> </el-table-column>
            <el-table-column prop="status" label="当前节点" align="center" min-width="5%">
                <template slot-scope="scope">
                    <span v-for="(item,index) in allStatus" :key="index"><i v-if="item.id == scope.row.status">{{item.name}}</i></span>
                </template>
            </el-table-column>
            <el-table-column prop="signing_time" label="签约时间" align="center" min-width="7%">
                <template slot-scope="scope">
                    <span v-if="scope.row.signing_time">{{toDate(scope.row.signing_time)}}</span>
                    <span v-else>--</span>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="total" class="page" @current-change="currentChange" background layout="prev, pager, next" :page-size="50" :total="total">
        </el-pagination>
        <edit  @close="dialog" v-if="dialogForm" :editList="editList" :dialogForm="dialogForm"></edit>
        <el-dialog
            title="温馨提示"
            :visible.sync="dialogVisible"
            width="500px"
            >
            <div v-if="failList.length>0">
                <p style="color:#F56C6C;line-height:20px">上传失败:</p>
                <p style="color:#F56C6C;padding-left:50px;line-height:20px" v-for="(item,index) in failList" :key="index">{{item}}</p>
            </div>
            <div v-if="successList.length>0">
                <p style="color:#67C23A;line-height:20px">上传成功:</p>
                <p style="color:#67C23A;padding-left:50px;line-height:20px" v-for="(item,index) in successList" :key="index">{{item}}</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import api from './http';
import edit from './customer_win'
import { Loading } from 'element-ui'
export default {
    data(){
        return {
            searchTalent: '',
            tableData: [],
            loading: true,
            allStatus: [
                {id: 0, name: '待签约'},
                {id: 1, name: '已签约'},
                {id: 2, name: '已付首款'},
                {id: 3, name: '已付尾款'}
            ],
            dialogForm: false,
            editList: '', //编辑数据
            dialogVisible: false,
            failList: '', //上传失败列表
            successList: '', //上传成功列表
            options: [
                {id: '1', name: '公司名称'},
                {id: '2', name: '职位名称'}
            ],
            searchType: '', //搜索类别
            total: 1,
            page: '1',
            reBack: false,
            token: '',
        }
    },
    mounted(){
        document.addEventListener("keyup",this.enter)
        let customer = JSON.parse(sessionStorage.getItem('customerInfo'));
        if(customer && customer.searchTalent){
            this.page = customer.page;
            this.searchTalent = customer.searchTalent;
            this.search()
        }else{
            this.init()
        }
        this.token = sessionStorage.getItem('token')
    },
    beforeDestroy(){
        document.removeEventListener("keyup",this.enter)
    },
    components:{
        edit
    },
    methods: {
        talentExport(){
            let token = sessionStorage.getItem('token')
            this.$http.get(api + '/api/Customer/export')
            .then((res)=>{
                if(res.data.error){
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }else{
                    let url = api + '/api/customer/export?access_token=' + token;
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    document.body.appendChild(link)
                    link.click()
                }
            })
        },
        enter: function(event) {
            if(event.keyCode == 13 || event.which == 13) {
                setTimeout(this.search, 100);
            };
        },
        //查询返回
        back(){
            this.reBack = false;
            this.searchType = '';
            this.searchTalent = '';
            this.init();
        },
        toDate(time){
            var now = new Date(time*1000),
                y = now.getFullYear(),
                m = now.getMonth() + 1,
                d = now.getDate();
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
        },
        //搜索
        search(){
            // if(!this.searchType){
            //     this.$alert("请选择查询类别", '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
            //     return false
            // }
            if(!this.searchTalent){
                this.$alert("请输入名称", '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                return false
            }
            this.loading = true;
            this.page = 1;
            this.$http.get(api + '/api/Customer/search?searchName=' + this.searchTalent + '&page=' + this.page + '&num=50')
            .then((res)=>{
                if(res.data.code == 200){
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.total;
                    this.loading = false;
                    this.reBack = true;
                }else{
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }
            })
        },
        currentChange(page) {
            this.page = page;
            this.init();
        },
        init(){ //职位列表
            this.$http.get(api + '/api/Customer/getCustomerPositionList?page='+this.page+"&num=50")
            .then((res)=>{
                if(res.data.code == 200){
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.total;
                    this.loading = false;
                }else{
                    this.loading = false;
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }
            })
        },
        addCustomer(){ //新增客户
            this.$router.push('/admin/customer/company')
        },
        addJob(){ //新增职位
            this.$router.push('/admin/customer/job')
        },
        //编辑
        showDetail(item){
            this.editList = item;
            this.dialogForm = true;
        },
        //弹框回调
        dialog(res){
            this.dialogForm = false;
            if(res == 'ok'){
                if(this.searchTalent){
                    this.search()
                }else{
                    this.init();
                }
                
            }
        },
        //上传简历
        uploadResume(e,item){
            if(!item.position_id){
                this.$alert('该客户下暂无职位，无法上传简历', '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                return false
            }
            let param = new FormData(); 
            for(var i=0, f; f=e.target.files[i]; i++){
                var name = []
                param.append('file['+i+']', f);
            }
            param.append("customerId",item.id);
            param.append("positionId",item.position_id);
            param.append('access_token', this.token)
            let config = {
                headers:{'Content-Type':'multipart/form-data'}
            };  
            const instance=this.$http.create({
                withCredentials: true
            })
            let options = {
                text: '正在上传...'
            }
            const loading = this.$loading(options);
            instance.post(api + '/api/upload/upload',param,config)  
            .then(res=>{  
                if(res.data.code == 200){
                    let data = res.data.data;
                    this.failList = data.fail;
                    this.successList = data.success;
                    if(data.fail.length === 0){
                        this.$nextTick(()=>{
                            loading.close();
                        })
                        this.$message({type: 'success',message: '上传成功！'})
                        // this.init();
                    }else{
                        this.$nextTick(()=>{
                            loading.close();
                        })
                        this.dialogVisible = true;
                    }
                }else{
                    this.$nextTick(()=>{
                        loading.close();
                    })
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }
            })
        },
        openFullScreen() {
            this.fullscreenLoading = true;
            setTimeout(() => {
                this.fullscreenLoading = false;
            }, 2000);
        },
        //客户详情
        showCustomer(id){
            this.$http.get(api + '/api/Customer/customerDetail?id=' + id)
            .then((res)=>{
                if(res.data.code == 200){
                    sessionStorage.setItem('company',JSON.stringify(res.data.data))
                    let list = {page: this.page,searchTalent: this.searchTalent}
                    sessionStorage.setItem('customerInfo',JSON.stringify(list))
                    this.$router.push('/admin/customer/company')
                }else{
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }
            })
        },
        //职位详情
        showJob(id){
            this.$http.get(api + '/api/Position/customerDetail?id=' + id)
            .then((res)=>{
                if(res.data.code == 200){
                    this.$router.push('/admin/customer/job')
                    let list = {page: this.page,searchTalent: this.searchTalent}
                    sessionStorage.setItem('customerInfo',JSON.stringify(list))
                    sessionStorage.setItem('job',JSON.stringify(res.data.data))
                }else{
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }
            })
        },
    }
}
</script>
<style>
.customer .el-table .cell, .el-table th>div{
    padding-left: 5px !important;
    padding-right: 5px !important;
}
.customer .el-dialog--small {
    width: 40%;
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
.customer .list .el-rate span i{
    color: #FF9900 !important;
}
</style>

<style lang="less" scoped>
    .customer{
        width: 1700px;
        .page{
            float: left;
            margin-top: 100px;
        }
        .upload{
            position: relative;
            display: inline-block;
            overflow: hidden;
            vertical-align: middle;
            margin-left: 10px;
            input{
                position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
                -ms-filter: 'alpha(opacity=0)';
                width: 0;
                padding-left: 80px;
                cursor: pointer;
            }
        }
    }
    
</style>
