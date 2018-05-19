<template>
	<div class = "conHeader">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in headerTil" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
	</div>
</template>
<script type="text/javascript">

	export default{
		data(){
			return{
			}
		},
		methods:{
			
		},
		mounted(){
			
		},
		computed: {
			headerTil: function() {
				console.log(this.$store.state.headerTil)
				return this.$store.state.headerTil;
			},
		},
	}
</script>
<style lang="less" scoped>
	
</style>