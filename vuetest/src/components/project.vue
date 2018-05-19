<template>
    <div class="project">
        <el-input type="text" v-model="word"></el-input>
        <el-button type="primary" @click="enter">确定</el-button>
        <div class="box">
            <div class="son">
                <span v-for="(item, index) in words" :key="index">{{item}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                word: '',
                words: [],
            };
        },
        methods: {
            enter(){
                this.words = this.word.split(',');
            },
        },
    };
</script>
<style lang="less" scoped>
    .box{
        width: 400px;
        overflow: hidden;
        .son{
            span{
                display: inline-block;
                font-size: 100px;
                color: red;
            }
        }
    }
</style>
