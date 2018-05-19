/*
 * @Author: zhengu.jiang 
 * @Date: 2018-05-14 18:19:13 
 * @Module: {权限弹框} 
 */

<template>
    <div>
        <el-dialog
            width="30%" height="150%" title="选择权限" :visible.sync="showRule"
            append-to-body>
            <div>
                <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                    <el-tab-pane v-for="(item,index) in nodes" :key="index" :label="item.name" :name="item.name">
                        <div class="el-checkbox-button el-checkbox-button--medium" @click="checkOn(rule)" v-bind:class="{'is-checked': rule.selected}" v-for="(rule,index) in item.child" :key="index + 'a'">
                            <span class="el-checkbox-button__inner" style="margin-top:10px;margin-right:10px">{{rule.name}}</span>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelRule">取 消</el-button>
                <el-button type="primary" @click="enterRule()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="添加账号" :visible.sync="showForm" @close="close">
            <el-form :model="form" label-width="100px" :rules="rules" ref="form" class="ruleForm">
                <el-form-item label="职位" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="rules">
                    <el-button type="primary" @click="chooseRule">添加权限</el-button>
                    <span>已选择{{chooseRules.length}}个权限</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            rules: {
                name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
                node_list: [{ required: true, message: '请选择权限', trigger: 'change' }]
            },
            tableData: [],
            form: {
                name: '',
                node_list: ''
            },
            showForm: false,
            showRule: false,
            // checkGroup: [],
            chooseRules: [],
            activeName2: '全部',
            nodes: [],
        }
    },
    props: ['dialogForm',"nodeList","edit",'rule'],
    created(){
        if(this.edit){
            this.form.name = this.rule.name;
            this.chooseRules = this.rule.node_list;
            this.form.node_list = this.rule.node_list.join(',')
        }
    },
    mounted(){
        let all = {name: '全部',child: []}
        this.showForm = this.dialogForm
        this.nodes = this.deepCopy(this.nodeList);
        if(this.edit){
            for(let i = 0; i < this.nodes.length; i++){
                for(let j = 0; j < this.nodes[i].child.length; j++){
                    this.chooseRules.filter((item)=>{
                        if(item == this.nodes[i].child[j].id){
                            this.nodes[i].child[j].selected = true
                        }
                    })
                }
            }
        }
    },
    methods: {
        deepCopy: function (item) {  
            var obj={};  
            obj=JSON.parse(JSON.stringify(item)); 
            return obj  
        },
        handleClick(tab, event) {
            let all = this.nodes[0].child;
            console.log(all)
            for(let i = 0; i < all.length; i++){
                for(let j = 1; j < this.nodes.length; j++){
                    for(let m = 0; m < this.nodes[j].child.length; m++){
                        if(tab.index === "0"){
                            if(all[i].id == this.nodes[j].child[m].id){
                                all[i].selected = this.nodes[j].child[m].selected;
                            }
                        }else{
                            if(all[i].id == this.nodes[j].child[m].id){
                                this.nodes[j].child[m].selected = all[i].selected;
                            }
                        }
                    }
                }
            }
        },
        //选择权限
        checkOn(item){
            item.selected = !item.selected;

        },
        cancel(){
            this.$emit('close','close');
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.tableData.push(this.form)
                    if(this.edit){
                        this.tableData[0].node_id = this.rule.id;
                        this.tableData[0].status = this.rule.status;
                    }
                    this.$emit('close','ok',this.tableData);
                } else {
                    return false;
                }
            });
        },
        close(){
            this.$emit('close','close');
        },
        chooseRule(){
            this.showRule = true;
        },
        enterRule(){
            this.showRule = false;
            this.chooseRules = [];
            for(let i = 0; i < this.nodes.length; i++){
                for(let j = 0; j < this.nodes[i].child.length; j++){
                    if(i === 0 && this.nodes[i].child[j].selected){
                        this.chooseRules.push(this.nodes[i].child[j].id)
                    }
                }
            }
            this.form.node_list = this.chooseRules.join(',');
        },
        cancelRule(){
            this.showRule = false;
        }
    }
}
</script>
<style >
    .el-checkbox-button__inner{
        border-left: 1px solid #bfcbd9;
    }
</style>

