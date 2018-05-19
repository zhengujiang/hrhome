<template>
    <div class="table">
        <section class="box">
            <section class="oneLine">
                <span class="rightBorder bottomBorder">名称</span><input type="text" class="rightBorder bottomBorder"><!--
             --><span class="rightBorder bottomBorder">所属部门</span><input type="text" class="bottomBorder">
            </section>
            <section class="twoLine">
                <span class="rightBorder bottomBorder">地址</span><input class="rightBorder bottomBorder" type="text"><!--
             --><span class="rightBorder bottomBorder">年龄</span><input type="text" class="bottomBorder">
            </section>
            <section class="threeLine">
                <section class="left clearfix fl">
                    <div class="fl rightBorder bottomBorder">联系人</div>
                    <div class="fl">
                        <span class="rightBorder bottomBorder">职位</span><input class="rightBorder bottomBorder" type="text"><!--
                        --><span class="rightBorder bottomBorder">年龄</span><input type="text" class="rightBorder bottomBorder">
                    </div>
                </section>
                <section class="right left clearfix fl">
                    <div class="fl rightBorder bottomBorder">
                        <span class="rightBorder bottomBorder">E-mail</span><span></span>
                    </div>
                    <div class="fl">
                        <input class="bottomBorder" type="text"><!--
                        --><span class="rightBorder bottomBorder"></span><input type="text" class="bottomBorder">
                    </div>
                </section>
            </section>
        </section>
    </div>
</template>
<script>
export default {
    data(){
        return {
            
        }
    }
}
</script>
<style lang="less" scoped>
    .table{
        text-align: left;
        margin-left: 10px;
        span{
            display: inline-block;
            width: 100px;
            text-align: center;
            height: 30px;
            line-height: 30px;
        }
        .leftBorder{
            border-left: 1px solid #ccc;
        }
        .rightBorder{
            border-right: 1px solid #ccc;
        }
        .bottomBorder{
            border-bottom: 1px solid #ccc;
        }
        .topBorder{
            border-top: 1px solid #ccc;
        }
        input{
            vertical-align: top;
            width: 298px;
        }
        .box{
            width: 798px;
            height: 1000px;
            border: 1px solid #ccc;
            .threeLine {
                .left{
                    div:nth-child(1){
                        width: 100px;
                        text-align: center;
                        height: 60px;
                        line-height: 60px;
                    }
                    div:nth-child(2){
                        width: 298px;
                        input{
                            width:198px;
                        }
                    }
                }
                .right{
                    div:nth-child(1){
                        width: 100px;
                        text-align: center;
                        height: 60px;
                        line-height: 30px;
                    }
                    input:nth-child(1){
                        width: 298px !important;
                    }
                }
            }
        }
    }
</style>

