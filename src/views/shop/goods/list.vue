<template>
    <div class="bg-white" style="margin:-20px; margin-top:-1rem;margin-bottom: 0!important;">
        <div class="px-3">
            <el-tabs v-model="tabIndex" @tab-click="handleClick">
                <el-tab-pane :label="tab.name"
                v-for="( tab, tabI ) in tabs" :key='tabI'>
					<buttonSearch ref='buttonSearch' placeholder='要搜索的商品名称' @search='searchEvent'>
						<!-- 左边 -->
						<template #left>
							<router-link :to="{ name:'shop_goods_create' }">
								<el-button type="success" size="small">发布商品</el-button>
							</router-link>
							
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
                         :data="tableData[tabI].list"
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
						   label="商品状态"
						   align="center">
						   <template slot-scope='scope'>
							   <el-button type="success" size="mini">审核通过</el-button>
							   <el-button type="danger" size="mini" class="ml-0 mt-2">审核拒绝</el-button>
						   		 <!-- <el-button :type=" scope.row.status === 1 ? 'success' : 'danger'" size="mini" 
									plain @click='changeStatus(scope.row)'>{{ scope.row.status === 0 ? '下架' : '上架' }}</el-button> -->
						   </template>
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
						   align="center"
						   width="150">
						   <template slot-scope='scope'>
							   <el-button-group>
								   <el-button size="mini" type="primary" plain>修改</el-button>
								   <el-button size="mini" type="danger" plain @click='deleteItem(scope.$index)'>删除</el-button>
							   </el-button-group>
						   </template>
						 </el-table-column>
                       </el-table>
				   <el-footer class="d-flex px-0 position-fixed bg-white"
				    style="bottom:0;left:200px;right:0;z-index:999">

						<div class="d-flex align-items-center pl-3" style="flex:1">
							<el-pagination
								:current-page="tableData[tabIndex].currentPage"
								:page-sizes="[100, 200, 300, 400]"
								:page-size="100"
								layout="total, sizes, prev, pager, next, jumper"
								:total="400">
							</el-pagination>
						</div>
					</el-footer>
				   
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
		 tableData: [ ],
		  multipleSelection:[]
    }),
	created() {
		this.__getData()
	},
    methods:{
		
		// 生成list数据
		__getData(){
			
			for( let i = 0; i < this.tabs.length;i++ ){
				// console.log(this.tableData);
				this.tableData.push({
					currentPage:1,
					list:[]
				})
				
				// 循环填充假数据
				for( let j = 0; j < 20;j++ ){
					this.tableData[i].list.push(
					{
						id:j,
						title:'商品名字'+ i + '-' + j,
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
					})
				}
			}
		},
		// 上下架
		changeStatus(item){
			item.status = item.status === 1 ? 0 : 1;
		},
		// 删除列表指定一项
		deleteItem( index ){
			 this.$confirm('此操作将永久删除该项, 是否继续?', '温馨提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'error'
			        }).then(() => {
						this.tableData[this.tabIndex].list.splice(index,1)
			          this.$message({
			            type: 'success',
			            message: '删除成功!'
			          });
			        })
			
		},	
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
