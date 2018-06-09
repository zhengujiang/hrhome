<template>
    <div class="talentDetail">
        <div class="clearfix">
            <span class="back">
                <el-button class="fl" type="warning" @click="back" plain style="width:100px;margin-bottom:20px">返回</el-button>
            </span>
            <el-button class="fl" type="primary" @click="delTalent" style="width:100px;margin-bottom:20px;margin-left:10px">删除</el-button>
        </div>
        <div class="title">
            <span>基本信息</span>
        </div>
        <div class="content">
            <span>姓名:&nbsp;&nbsp;<i v-if="basic.name">{{basic.name}}</i><i v-else>--</i></span>
            <span>性别:&nbsp;&nbsp;<i v-if="basic.gender">{{basic.gender}}</i><i v-else>--</i></span>
            <span>年龄:&nbsp;&nbsp;<i v-if="basic.age">{{basic.age}}</i><i v-else>--</i></span>
            <span>工作年限:&nbsp;&nbsp;<i v-if="basic.work_years">{{basic.work_years}}</i><i v-else>--</i></span>
            <span>当前职位:&nbsp;&nbsp;<i v-if="basic.current_title">{{basic.current_title}}</i><i v-else>--</i></span>
            <span>手机号码:&nbsp;&nbsp;<i v-if="basic.mobile">{{basic.mobile}}</i><i v-else>--</i></span>
            <span>邮箱:&nbsp;&nbsp;<i v-if="basic.email">{{basic.email}}</i><i v-else>--</i></span>
        </div>
        <div class="title">
            <span>教育经历</span>
        </div>
        <div class="educations" v-for="(item,index) in educations" :key="index">
            <div class="time">
                <span>{{item.start_time}}&nbsp;-&nbsp;{{item.end_time}}</span>
            </div>
            <div>
                <span>{{item.school}}&nbsp;|&nbsp;</span>
                <span>{{item.degree}}&nbsp;|&nbsp;</span>
                <span>{{item.major}}</span>
            </div>
        </div>
        <div class="title">
            <span>工作经历</span>
        </div>
        <div class="occupations" v-for="(item,index) in occupations" :key="index+'a'">
            <div class="time">
                <span>{{item.start_time}}&nbsp;-&nbsp;{{item.end_time}}</span>
            </div>
            <div>
                <span>{{item.company}}</span>
            </div>
            <div>
                <span>{{item.predicted_job_function}}</span>
            </div>
            <p>工作描述：</p>
            <p v-for="(item,index) in toLine(item.desc)" :key="index + 'b'">{{item}}</p>
        </div>
        <div class="title">
            <span>项目经历</span>
        </div>
        <template v-if="projects.length">
            <div class="occupations" v-for="(item,index) in projects" :key="index+'b'">
                <div class="time">
                    <span>{{item.start_year}}/{{item.start_month}}&nbsp;-&nbsp;{{item.end_year}}/{{item.end_month}}</span>
                </div>
                <p v-for="(item,index) in toLine(item.desc)" :key="index + 'b'">{{item}}</p>
            </div>
        </template>
        <div v-else style="margin-top:10px">无</div>
        <div class="title">
            <span>自我评价</span>
        </div>
        <p style="margin-top:10px" v-if="basic.self_evaluate">{{basic.self_evaluate}}</p>
        <p v-else style="margin-top:10px">无</p>
        <div class="title">
            <span>技能</span>
        </div>
        <p v-if="basic.skills" style="margin-top:10px">{{basic.skills}}</p>
        <p v-else style="margin-top:10px">无</p>
    </div>
</template>
<script>
import api from "./http"
export default {
    data() {
        return {
            basic: {
                name: '',
                gender: '',
                age: '',
                work_years: '',
                current_title: '',
                mobile: "",
                email: "",
                skills: "",
                self_evaluate: ""
            },
            educations: [], //教育经历
            occupations: [], //工作经历
            projects: [], //项目经历

        };
    },
    mounted() {
        let data = JSON.parse(sessionStorage.getItem('talent'));
        for(let key in this.basic){
            this.basic[key] = data.basic[key];
        }
        this.educations = data.educations;
        this.occupations = data.occupations;
        this.projects = data.projects;
        // this.init();
    },
    methods: {
        back() {
            history.go(-1);
        },
        //字符串换行处理
        toLine(item){
            let arr = item.split("\n");
            return arr
        },
        //删除
        delTalent(){
            this.$confirm('是否删除该简历?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let id = sessionStorage.getItem('talentId')
                    this.$http.get(api + "/api/talent/delete?id=" + id)
                    .then((res)=>{
                        if(res.data.code == 200){
                            this.$message({type: 'success',message: '删除成功！'})
                            history.go(-1);
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
    }
};
</script>
<style>
.talentDetail .back .el-button--warning.is-plain {
    color: #e6a23c;
    background: #fdf6ec;
    border-color: #f5dab1;
}
.talentDetail .back .el-button--warning:hover {
    background: #ebb563; 
    border-color: #ebb563; 
    color: #fff;
}
</style>
<style lang="less" scoped>
    .talentDetail{
        width: 1000px;
        margin-bottom: 50px;
        .title{
            width: 1000px;
            height: 30px;
            line-height: 30px;
            border-left: 3px solid #409EFF;
            background-color: rgb(198, 228, 240);
            margin-top: 15px;
            span{
                padding-left: 10px;
                font-size: 20px;
                color: #409EFF
            }
        }
        .content{
            width: 1000px;
            margin-top: 10px;
            span{
                display: inline-block;
                width: 49%;
                height: 30px;
                line-height: 30px;
            }
        }
        .educations{
            margin-top: 10px;
            div{
                span{
                    line-height: 20px;
                }
            }
        }
        .occupations{
            margin-top:10px;
            p{
                line-height: 20px;
            }
            div{
                span{
                    line-height: 20px;
                }
            }
        }
        p{
            line-height: 20px;
        }
    }
</style>
