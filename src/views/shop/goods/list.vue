<template>
    <div class="bg-white" style="margin:-20px; margin-top:-1rem;">
        <div class="px-3">
            <el-tabs v-model="tabIndex" @tab-click="handleClick">
                <el-tab-pane :label="tab.name"
                v-for="( tab, tabI ) in tabs" :key='tabI'>
					<buttonSearch placeholder='要搜索的商品名称' @search='searchEvent'>
						<!-- 左边 -->
						<template #left>
							<el-button type="success" size="small">发布商品</el-button>
							<el-button type="danger" size="small">批量删除</el-button>
						</template>
						<template #form>
							<el-form inline :model="form">
							    <el-form-item label="商品名称" class="mb-0" >
							        <el-input placeholder="商品名称"
							        v-model="form.name" size="small"></el-input>
							    </el-form-item>
							     <el-form-item label="商品编码" class="mb-0" >
							        <el-input placeholder="商品编码" 
							        v-model="form.code" size="small"></el-input>
							    </el-form-item>
							    <el-form-item label="商品类型" class="mb-0" >
							        <el-select v-model="form.type" placeholder="请选择" size="small">
							            <el-option value="123"> 123</el-option>
							            <el-option value="123"> 123</el-option>
							            <el-option value="123"> 123</el-option>
							        </el-select>
							    </el-form-item>
							    <el-form-item label="商品分类" class="mb-0" >
							        <el-input placeholder="商品分类" 
							        v-model="form.category" size="small"></el-input>
							    </el-form-item>
							    <el-form-item class="mb-0">
							        <el-button size="small" type="info" @click="searchEvent">搜索</el-button>
							        <el-button size="small" @click="clearSearch">清空条件</el-button>
							    </el-form-item>
							</el-form>
						</template>
					</buttonSearch>
                   
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import buttonSearch from '@/components/common/button-search.vue'
export default{
	components:{
		buttonSearch
	},
    data:() => ({
        tabIndex:'0',// 选项卡默认选中 
        tabs:[
            { name:'审核中' },
            { name:'出售中' },
            { name:'已下架' },
            { name:'库存预警' },
            { name:'回收站' },
        ],
        superSelect:true,// 高级搜索是否展示
        form:{
           name: '',// 商品名称
           code: '',// 商品编码 
           type: '',// 商品分类
           category: '',// 商品类型
        }
    }),
    methods:{
        // 选项卡切换事件
        handleClick(tab, event){
            this.tabIndex = tab.index;
        },
        // 清空搜索条件
        clearSearch(){
            this.form = {
                name: '',// 商品名称
                code: '',// 商品编码 
                type: '',// 商品分类
                category: '',// 商品类型
            }
        },
        // 高级搜索事件
        searchEvent(){
            console.log('高级搜索')
        }
    }
}
</script>


<style>
</style>
