<template>
    <div class="talent" style="width:1800px">
        <div class="btn">
            <span @click="changeTalent(item.id)" v-for="(item,index) in btn.list" :key="index" :class="{'sign': item.id == btn.flag}">{{item.name}}</span>
            <!--<el-select v-model="searchType" placeholder="请选择查询类别" style="width:160px;margin-left:10px">
                <el-option
                    v-for="res in options"
                    :key="res.id"
                    :label="res.name"
                    :value="res.id">
                </el-option>
            </el-select>-->
            <el-input placeholder="输入姓名、手机号、职位查询" :prefix-icon="'el-icon-search'" v-model="searchTalent" style="width:210px"></el-input>
            <el-button @click="search" type="primary" style="margin-left:10px"><i class="el-icon-search" style="margin-right:5px"></i>查询</el-button>
            <el-button @click="talentExport" type="primary" style="width:80px">导出</el-button>
            <el-button v-if="reBack" type="warning" @click="back" plain style="width:80px">返回</el-button>
        </div>
        <div v-loading="loading">
            <el-table v-if="tableData.length>0" :data="tableData" border>
                <el-table-column prop="job_seeker" align="center" min-width="5%" label="姓名">
                    <template slot-scope="scope">
                        <span class="detail" @click="showDetail(scope.row)">{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" min-width="6%" label="操作" v-if="btn.flag != '4'">
                    <div slot-scope="scope">
                        <div v-if="btn.flag == '1'">
                            <el-button @click="operation(scope.row.id,1)" type="text" size="small" v-if="scope.row.current_progress !== 3">pass</el-button>
                            <el-button @click="operation(scope.row.id,2)" type="text" size="small" v-if="scope.row.current_progress === 0">有效</el-button>
                            <el-button @click="operation(scope.row.id,3)" type="text" size="small" v-if="scope.row.current_progress === 0">储备</el-button>
                            <el-button @click="operation(scope.row.id,4)" type="text" size="small" v-if="scope.row.current_progress === 1">约面</el-button>
                            <el-button @click="operation(scope.row.id,5)" type="text" size="small" v-if="scope.row.current_progress === 2">复试</el-button>
                            <el-button @click="operation(scope.row.id,6)" type="text" size="small" v-if="scope.row.current_progress === 2">谈薪</el-button>
                            <el-button @click="operation(scope.row,7)" type="text" size="small" v-if="scope.row.current_progress === 3">offer</el-button>
                            <el-button @click="operation(scope.row.id,8)" type="text" size="small" v-if="scope.row.current_progress === 3">拒绝</el-button>
                        </div>
                        <div v-if="btn.flag == '2'">
                            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                        </div>
                        <div v-if="btn.flag == '3'">
                            <el-button type="text" size="small" @click="rerecommend(scope.row)">重新推荐</el-button>
                        </div>
                    </div>
                </el-table-column>
                <el-table-column prop="induction_time" align="center" min-width="8%" label="最后一次修改时间">
                    <template slot-scope="scope">
                        <span v-if="scope.row.update_time">{{toDate(scope.row.update_time)}}</span>
                        <span v-else>{{toDate(scope.row.create_time)}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="gender" align="center" min-width="3%" label="性别"></el-table-column> -->
                <el-table-column prop="enterprise_name" align="center" min-width="20%" label="入职公司" v-if="btn.flag == '2'"></el-table-column>
                <el-table-column prop="induction_time" align="center" min-width="6%" label="入职时间" v-if="btn.flag == '2'">
                    <template slot-scope="scope">
                        <span>{{toDateJob(scope.row.induction_time)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="position_title" align="center" min-width="6%" label="职位名称" v-if="btn.flag == '2'"></el-table-column>
                <!--<el-table-column prop="job_expect_titles" align="center" min-width="6%" label="期望职位" v-if="btn.flag != '2'"></el-table-column>
                <el-table-column prop="job_city" align="center" min-width="6%" label="期望工作地" v-if="btn.flag != '2'"></el-table-column>-->
                <el-table-column prop="enterprise_name" align="center" min-width="18%" label="推荐公司" v-if="btn.flag != '2'"></el-table-column>
                <el-table-column prop="position_title" align="center" min-width="6%" label="推荐职位" v-if="btn.flag != '2'"></el-table-column>
                <!-- <el-table-column prop="mobile" align="center" min-width="10%" label="手机号码"></el-table-column> -->
                <!-- <el-table-column prop="email" align="center" min-width="15%" label="邮箱"></el-table-column> -->
                <el-table-column prop="referees_name" align="center" min-width="5%" label="推荐人"></el-table-column>
                <el-table-column prop="manager_name" align="center" min-width="5%" label="项目经理"></el-table-column>
                <el-table-column prop="annual_salary" align="center" min-width="5%" label="年薪(元)" v-if="btn.flag == '2'"></el-table-column>
                <el-table-column prop="service_charge" align="center" min-width="5%" label="服务费" v-if="btn.flag == '2'"></el-table-column>
                <el-table-column prop="butt" align="center" min-width="5%" label="对接" v-if="btn.flag == '2'"></el-table-column>
                <el-table-column prop="make_list" align="center" min-width="5%" label="做单" v-if="btn.flag == '2'"></el-table-column>
                <el-table-column prop="current_progress" align="center" min-width="5%" label="当前进度" v-if="btn.flag === '1'">
                    <template slot-scope="scope">
                        <span>{{currents[scope.row.current_progress]}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="induction_time" align="center" min-width="8%" label="创建时间">
                    <template slot-scope="scope">
                        <span>{{toDate(scope.row.create_time)}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-table v-else :data="table" border></el-table>
        </div>
        <el-pagination v-if="total" class="page" @current-change="currentChange" background layout="prev, pager, next" :page-size="50" :total="total">
        </el-pagination>
        <recomend v-if="dialog" @close="close" :dialog="dialog" :info="info"></recomend>
        <edit v-if="editDialog" @editWin="editWin" :type="type" :dialog="editDialog" :info="editInfo"></edit>
    </div>
</template>
<script>
import recomend from "./talent_recomen_win"
import edit from "./talent_edit_win"
import api from "./http"
export default {
    data() {
        return {
            btn: {
                flag: "1",
                list: [
                    { name: "进行中", id: "1", selected: true },
                    { name: "已发offer", id: "2", selected: false },
                    { name: "储备中", id: "3", selected: false },
                    { name: "不合适", id: "4", selected: false }
                ]
            },
            table: [],
            tableData: [],
            searchTalent: "",
            loading: true,
            dialog: false,  //弹窗显示
            info: '', //重新推荐信息
            editDialog: false, //编辑弹窗显示
            editInfo: '', //编辑信息
            page: '1', //当前页
            total: 1, //数据总条数
            currents: {
                "0": "项目经理筛选",
                "1": "客户筛选",
                "2": "面试中",
                "3": "谈薪中",
            },
            type: '', //区分是否从offer点击进入
            reBack: false,
            options: [
                {id: '1', name: '姓名'},
                {id: '2', name: '手机'},
                {id: '3', name: '职位'}
            ],
            searchType: '', //搜索类别
            url: '',
        };
    },
    mounted() {
        // this.init();
        document.addEventListener("keyup",this.enter)
        let talent = JSON.parse(sessionStorage.getItem('talentInfo'));
        if(talent && talent.searchTalent){
            this.page = talent.page;
            this.searchTalent = talent.searchTalent;
            this.btn.flag = talent.btnFlag;
            this.search()
        }else{
            if(talent && talent.btnFlag) this.btn.flag = talent.btnFlag
            this.init();
        }
    },
    beforeDestroy(){
        document.removeEventListener("keyup",this.enter)
    },
    components: {
        recomend,
        edit
    },
    methods: {
        talentExport(){
            let token = sessionStorage.getItem('token')
            this.$http.get(api + '/api/Talent/export?type=' + this.btn.flag)
            .then((res)=>{
                if(res.data.error){
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }else{
                    let url = api + '/api/Talent/export?type=' + this.btn.flag + '&access_token=' + token;
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
        toDate(time){
            let data = new Date(time*1000).format("yyyy-MM-dd hh:mm")
            return data;
        },
        toDateJob(time){
            let data = new Date(time*1000).format("yyyy-MM-dd")
            return data;
        },
        back(){
            this.reBack = false;
            this.searchTalent = '';
            this.searchType = '';
            this.init();
        },
        changeTalent(index) {
            this.btn.flag = index;
            this.loading = true;
            this.searchTalent = '';
            this.reBack = false;
            // if(this.searchTalent){
            //     this.search();
            // }else{
            //     this.init()
            // }
            this.init();
        },
        search() {
            // if(!this.searchType){
            //     this.$alert("请选择查询类别", '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
            //     return false
            // }
            if(!this.searchTalent){
                this.$alert("请输入搜索数据", '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                return false
            }
            this.loading = true;
            if(!sessionStorage.getItem('talentInfo')){
                this.page = 1;
            }
            this.$http.get(api + '/api/Talent/search?searchData=' + this.searchTalent+'&page='+ this.page + '&num=50' + "&searchType=" + this.btn.flag)
            .then((res)=>{
                if(res.data.code == 200){
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.total;
                    this.loading = false;
                    this.reBack = true;
                }else{
                    this.loading = false;
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }
            })
        },
        //查看详情
        showDetail(item) {
            this.$http.get(api + '/api/talent/getResumeDetail?resume_id=' + item.basic_id)
            .then((res)=>{
                if(res.data.code == 200){
                    sessionStorage.setItem('talent',JSON.stringify(res.data.data))
                    sessionStorage.setItem('talentId',item.basic_id)
                    let list = {page: this.page,searchTalent: this.searchTalent,btnFlag:this.btn.flag}
                    sessionStorage.setItem('talentInfo',JSON.stringify(list))
                    this.$router.push("/admin/talent/resume");
                }else{
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }
            })
        },
        //初始化列表
        init() {
            this.tableData=[];
            this.loading = true;
            this.$http.get(api + "/api/talent/getTalentList?page=" + this.page + "&num=50&status=" + this.btn.flag)
            .then((res)=>{
                if(res.data.code == 200){
                    this.loading = false;
                    this.tableData = res.data.data.list;
                    this.total = res.data.data.total;
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
        //进行中操作
        operation(id,v){
            if(v == 7){
                this.editDialog = true;
                this.type = 'offer'
                this.editInfo = id;
            }else{
                this.changeType(id,v);
            }
        },
        changeType(id,v){
            this.$confirm('是否继续该操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api + "/api/talent/operationStatus?id=" + id + "&operationType=" + v)
                    .then((res)=>{
                        if(res.data.code == 200){
                            this.$message({type: 'success',message: '操作成功！'})
                            if(this.searchTalent){
                                this.search();
                            }else{
                                this.init();
                            }
                        }else{
                            this.$alert(res.data.error, '温馨提示', {
                                confirmButtonText: '确定',
                                callback: ()=>{}
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });          
                });

        },
        currentChange(page) {
            this.page = page;
            if(this.searchTalent){
                this.search();
            }else{
                this.init();
            }
        },
        //重新推荐
        rerecommend(item){
            this.info = item;
            this.dialog = true;
        },
        //重新推荐返回
        close(res){
            this.dialog = false;
            if(res == 'ok'){
                if(this.searchTalent){
                    this.search();
                }else{
                    this.init();
                }
            }
        },
        //编辑
        edit(item){
            this.editInfo = item;
            this.type = '';
            this.editDialog = true;
        },
        //编辑回调
        editWin(res,form){
            this.editDialog = false
            if(res == 'ok'){
                if(this.searchTalent){
                    this.search();
                }else{
                    this.init();
                }
            }
        }
    }
};
</script>
<style>
.talent .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #fff !important;
}
.talent .el-table .cell, .el-table th>div{
    padding-left: 5px !important;
    padding-right: 5px !important;
}
.talent .el-button--warning.is-plain {
    color: #e6a23c;
    background: #fdf6ec;
    border-color: #f5dab1;
}
.talent .el-button--warning:hover {
    background: #ebb563; 
    border-color: #ebb563; 
    color: #fff;
}
</style>
<style lang="less" scoped>
    .talent{
        .page{
            float: left;
            margin-top: 100px;
        }
        .btn{
            margin-bottom: 30px;
            margin-top: 10px;
            span{
                display: inline-block;
                height: 40px;
                padding: 0 20px;
                text-align: center;
                line-height: 40px;
                background-color: #f2f2f2;
                cursor: pointer;
                margin-right: 10px;
                border-radius: 5px;
            }
            .sign{
                color: #fff;
                background-color: #20a0ff;
            }
        }
        .detail{
            border-bottom: 1px solid #20a0ff;
            color: #20a0ff;
            cursor: pointer;
        }
    }
</style>
