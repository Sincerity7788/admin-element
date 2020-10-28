<template>
    <div class="bg-white" style="margin:-20px; margin-top:-1rem;">
        <div class="px-3">
            <el-tabs v-model="tabIndex" @tab-click="handleClick">
                <el-tab-pane :label="tab.name"
                v-for="( tab, tabI ) in tabs" :key='tabI'>
					<buttonSearch ref='buttonSearch' placeholder='要搜索的商品名称' @search='searchEvent'>
						<!-- 左边 -->
						<template #left>
							<el-button type="success" size="small">发布商品</el-button>
							<el-button type="danger" size="small">批量删除</el-button>
							<el-button size="small">下架</el-button>
							<el-button size="small">上架</el-button>
							<el-button size="small">推荐</el-button>
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
                    <el-table border class="mt-3"
                         :data="tableData"
                         style="width: 100%" @selection-change="handleSelectionChange">
						  <el-table-column
						       type="selection"
						       width="45" align="center">
						     </el-table-column>
                         <el-table-column
                           label="商品"
                           width="380">
						   <template slot-scope='scope'>
							   <div class="media">
							     <img :src="scope.row.cover" style="width: 60px;height: 60px;" class="mr-3"  >
							     <div class="media-body">
							       <p class="mb-0">{{ scope.row.title }}</p>
							       <p class="mb-0">{{ scope.row.category }}</p>
							       <p class="mb-0">{{ scope.row.create_time }}</p>
							     </div>
							   </div>
						   </template>
                         </el-table-column>
                         <el-table-column
                           prop="type"
                           label="商品类型"
						   align="center">
                         </el-table-column>
                         <el-table-column
                           prop="sale_count"
                           label="商品销量"
						   align="center">
                         </el-table-column>
						 <el-table-column
						   prop="order"
						   label="商品排序"
						   align="center">
						 </el-table-column>
						 <el-table-column
						   prop="status"
						   label="商品状态"
						   align="center">
						 </el-table-column>
						 <el-table-column
                           prop="stock"
                           label="总库存"
						   align="center">
                         </el-table-column>
						 <el-table-column
						   prop="pprice"
						   label="价格(元)"
						   align="center">
						 </el-table-column>
						 <el-table-column
						   label="操作"
						   align="center">
						 </el-table-column>
                       </el-table>
				   
				   
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
        },
		 tableData: [
			 {
				title:'商品名字',
				cover:'https://img13.360buyimg.com/n7/jfs/t1/150526/26/3958/83972/5f9011b0E34f13e87/7eef266cecb887db.jpg',
				create_time:'2020-10-28',
				category:'手机',
				type:'普通商品',
				sale_count:200,
				order:100,
				status:1,
				stock:200,
				pprice: 1000,
				ischeck:1
			 }
		 ],
		  multipleSelection:[]
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
			this.$refs.buttonSearch[this.tabIndex].closeSuperSearch()
        },
        // 高级搜索事件
        searchEvent(){
            console.log('高级搜索')
        },
		// 表格多选事件
		handleSelectionChange(val) {
			this.multipleSelection = val;
		}
    }
}
</script>


<style>
</style>
