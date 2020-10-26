<template>
	<div>
		<div class="d-flex align-items-center">
		    <!-- 左边 -->
		   <slot name="left"></slot>
		    <!-- 右边 -->
		    <div class="ml-auto" v-show="!superSelect">
				<slot>
					<el-input :placeholder="placeholder" v-model="keyword"
					style="width: 150px;" size="small" class="mr-2"></el-input>
					<el-button size="small" type="info" @click='$emit("search",keyword)'>搜索</el-button>
					<el-button size="small" @click="superSelect = true" >高级搜索</el-button>
				</slot>
		        
		    </div>
		    
		</div>
		<el-card class="box-card my-3 bg-light" v-show="superSelect">
		        <div slot="header" class="clearfix" style="margin:-10px;">
		            <span>高级搜索</span>
		            <el-button style="float: right; padding: 3px 0" 
		            @click="closeSuperSearch" type="text">收起</el-button>
		        </div>
		        <div>
		            <slot name="form"></slot>
		        </div>
		    </el-card>
	</div>
</template>

<script>
	export default{
		props:{
			placeholder:{
				type: String,
				default:''
			}
		},
		data:() => ( {
			keyword:'',
			superSelect: false,
		} ),
		methods:{
			// 关闭高级搜索事件
			closeSuperSearch(){
				this.superSelect = false
			}
		}
	}
</script>

<style>
</style>
