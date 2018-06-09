/*
 * @Author: zhengu.jiang 
 * @Date: 2018-06-02 15:20:13 
 * @Module: {照片添加} 
 */

<template>
    <div class="photo">
        <div class="main">
            <div class="default">
                <img :src="loginImg" alt="">
            </div>
            <div class="upload">
                <input name="file" accept="image/jpeg,image/png,image/image/tiff" type="file" @change="uploadPhoto($event)"/>
                <el-button type="primary" size="small" style="width:130px">上传照片</el-button>
            </div>
        </div>
        <div class="img" v-for="(item,index) in list" :key="index">
            <img :src="item.url" alt="">
            <div class="set">
                <span @click="setCover(item.id)">设为封面</span><span @click="delImage(item.id)">删除</span>
            </div>
        </div>
        
    </div>
</template>
<script>
import api from "./http.js"
export default {
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            list: [],
            loginImg: '',
            imgHost: ''
        }
    },
    mounted(){
        this.init();
        this.imgHost = api;
    },
    methods: {
        init(){
            this.$http.get(api + '/api/image/getList')
            .then((res)=>{
                if(res.data.code == 200){
                    this.list = res.data.data;
                    for(let i = 0; i < this.list.length; i++){
                        this.list[i].thumb = this.imgHost + '/' + this.list[i].url;
                    }
                    this.list.filter(res=>{
                        if(res.is_cover == 1){
                            this.loginImg = res.thumb;
                        }
                    });
                    if(!this.loginImg){
                        this.$http.get(api + '/api/Login/getCoverUrl')
                            .then((res)=>{
                                if(res.data.code == 200){
                                    this.loginImg = this.imgHost + '/' + res.data.data;
                                }else{
                                    this.$alert(res.data.error, '温馨提示', {
                                        confirmButtonText: '确定',
                                        callback: ()=>{}
                                    });
                                }
                            })
                    }
                }else{
                    this.$alert(res.data.error, '温馨提示', {
                        confirmButtonText: '确定',
                        callback: ()=>{}
                    });
                }
            })
        },
        setCover(id){
            this.$http.get(api + '/api/image/setCover?id=' + id)
            .then((res)=>{
                if(res.data.code == 200){
                    this.init();
                    this.$message({type: 'success',message: '设置成功！'})
                }else{
                    this.$alert(res.data.error, '温馨提示', {
                        confirmButtonText: '确定',
                        callback: ()=>{}
                    });
                }
            })
        },
        delImage(id){
            this.$confirm('此操作将永久删除该照片, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delimg(id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
        },
        delimg(id){
            this.$http.get(api + '/api/image/delImage?id=' + id)
            .then((res)=>{
                if(res.data.code == 200){
                    this.init();
                    this.$message({type: 'success',message: '删除成功！'})
                }else{
                    this.$alert(res.data.error, '温馨提示', {
                        confirmButtonText: '确定',
                        callback: ()=>{}
                    });
                }
            })
        },
        uploadPhoto(e){
            let param = new FormData(); 
            // for(var i=0, f; f=e.target.files[i]; i++){
            //     var name = []
            //     param.append('image['+i+']', f);
            // }
            param.append('image',e.target.files[0])
            param.append('access_token', sessionStorage.getItem('token'));
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
            instance.post(api + '/api/Image/addImage',param,config)  
            .then(res=>{  
                if(res.data.code == 200){
                    this.$nextTick(()=>{
                        loading.close();
                    })
                    this.$message({type: 'success',message: '上传成功！'})
                    this.init();
                }else{
                    this.$nextTick(()=>{
                        loading.close();
                    })
                    this.$alert(res.data.error, '温馨提示', {confirmButtonText: '确定',callback: ()=>{}});
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .photo{
        .main{
            height: 100%;
            width: 200px;
            border: 1px solid #ccc;
            padding: 10px;
            .default{
                width: 100%;
                img{
                    width: 100%;
                }
            }
            .upload{
                position: relative;
                display: inline-block;
                overflow: hidden;
                vertical-align: middle;
                margin-left: 25px;
                margin-top: 5px;
                input{
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                    -ms-filter: 'alpha(opacity=0)';
                    width: 0;
                    padding-left: 130px;
                    cursor: pointer;
                }
            }
        }
        .img{
            margin: 20px;
            height: 250px;
            position: relative;
            display: inline-block;
            img{
                height: 100%;
            }
            .set{
                display: none;
                span{
                    display: inline-block;
                    width: 50%;
                }
            }
            &:hover .set{
                display: inline-block;
                width: 100%;
                height: 40px;
                background-color: rgba(0,0,0,0.5);
                color: #fff;
                position: absolute;
                bottom: 0;
                text-align: center;
                line-height: 40px;
                cursor: pointer;
            }
        }
    }
</style>
