<template>
    <div>
        <!-- 数据统计 -->
        <el-row :gutter='20' class="mt-3"> 
            <el-col :span='6' v-for='( item, index ) in counts' :key='index' >
                <el-card class="box-card" shadow='hover'>
                    <div class="d-flex align-items-center">
                        <i :class="[item.icon, item.color]"
                        class=" text-align-center border text-white mr-3 h4"
                         style="height:40px;width:40px;text-align:center;line-height:40px"></i>
                        <div>
                            <h4 class="mb-1">{{ item.num }}</h4>
                            <small class="text-muted">{{ item.desc }}</small>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 店铺信息/订单提示/ 统计图 -->
        <el-row :gutter='20' class="mt-3" > 
            <!-- 店铺信息 -->
            <el-col :span='12' class="d-flex flex-column" style='height:370px;justify-content:space-between'>
                <el-card shadow='never' class="box-card" v-for="( item, index ) in tips" :key='index'>
                    <div slot="header" class="clearfix">
                        <span>{{item.title}}</span>
                        <el-button style="float: right; padding: 3px 0" type="text">{{ item.desc }}</el-button>
                    </div>
                    <div class="row">
                        <div :class="item.list.length | getCol" v-for="( itema, indexa ) in item.list" :key='indexa'>
                            <button class="btn btn-light w-100">
                                <h4 class="mb-1">{{ itema.value }}</h4>
                                <small class="text-muted">{{ itema.name }}</small>
                            </button>
                        </div>
                    </div>
                </el-card>
                <!-- <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <div >
                        
                    </div>
                </el-card> -->
            </el-col>
            <el-col :span='12' style='height:370px'>
                <el-card class="box-card" >
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <div >
                        
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default{
        data: () => ({
            counts: [
                { icon: 'el-icon-user-solid', num: 30, desc:'关注人数(个)', color: 'bg-primary' },
                { icon: 'el-icon-s-finance', num: 40, desc:'订单总数(笔)', color: 'bg-success' },
                { icon: 'el-icon-s-order', num: 550, desc:'今日订单总金额(元)', color: 'bg-danger' },
                { icon: 'el-icon-s-data', num: 6660, desc:'本月销量(笔)', color: 'bg-warning' },
            ],// 数据统计信息
            tips: [
                {
                    title: '店铺及商品提示',
                    desc: '需要关注的店铺信息及待处理事项',
                    list: [
                        { name:'出售中', value: 11 },
                        { name:'待回复', value: 31 },
                        { name:'库存预警', value: 41 },
                        { name:'仓库中', value: 51 },
                    ]
                },
                {
                    title: '店铺及商品提示',
                    desc: '需要关注的店铺信息及待处理事项',
                    list: [
                        { name:'待付款', value: 8 },
                        { name:'待发货', value: 88 },
                        { name:'已发货', value: 9999 },
                        { name:'已收货', value: 6543 },
                        { name:'退款中', value: 0 },
                        { name:'待售后', value: 345 },
                    ]
                }
            ],// 店铺信息，商品提示
        }),
        filters:{
            getCol( total ){
                return `col-${12 / total}`
            }
        }
    }
</script>


<style>
</style>
