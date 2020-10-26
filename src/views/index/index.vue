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
            <el-col :span='12' >
                <el-card class="box-card" style='height:370px' shadow='never'>
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <!-- 统计图表 -->
                    <div ref='index_tb_info' style="width: 100%;min-height: 280px">
                        
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 销售情况统计/ 单商品销售情况 -->
        <el-row :gutter='20' class="my-3 ">
            <el-col :span='12'>
                <el-card class="box-card" shadow='never'>
                    <div slot="header" class="clearfix">
                        <span>卡片名称</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <div>
                        <div class="border d-flex">
                            <p class="py-4 px-3 mb-0 bg-light text-muted">昨日销量</p>
                            <div class="d-flex flex-column" style="flex:1" >
                                <div class="d-flex align-items-center pl-3 border-bottom" style="flex:1">
                                    <span class="text-muted pr-2">订单量(件)</span>
                                    22
                                </div>
                                <div style="flex:1" class="d-flex align-items-center pl-3">
                                    <span class="text-muted pr-2">订单量(件)</span>
                                    22
                                </div>
                            </div>
                        </div>
                        <div class="border d-flex mt-3">
                            <p class="py-4 px-3 mb-0 bg-light text-muted">昨日销量</p>
                            <div class="d-flex flex-column" style="flex:1" >
                                <div class="d-flex align-items-center pl-3 border-bottom" style="flex:1">
                                    <span class="text-muted pr-2">订单量(件)</span>
                                    22
                                </div>
                                <div style="flex:1" class="d-flex align-items-center pl-3">
                                    <span class="text-muted pr-2">订单量(件)</span>
                                    22
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span='12'>
                <el-card class="box-card" shadow='never'>
                    <div slot="header" class="clearfix">
                        <span>单品销售排名</span>
                        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                    </div>
                    <el-table
                    :data="tableData"
                    height="165"
                    border
                    style="width: 100%">
                    <el-table-column
                    type='index'
                    label="#"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="商品名称">
                    </el-table-column>
                    <el-table-column
                    prop="num"
                    label="销量"
                    width='80'>
                    </el-table-column>
                </el-table>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// 导入echarts
import echarts from 'echarts';
    export default{
        data: () => ({
            tableData: [
                { name: '小天才手表', num: '12' },
                { name: '天王手表', num: '12' },
                { name: '浪琴手表', num: '12' },
                { name: '苹果手机', num: '12' },
                { name: '三星手机', num: '12' },
                { name: '小米手机', num: '12' },
                { name: '华为手机', num: '12' },
            ],
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
        },
        mounted(){
            this.init_tb()
        },
        methods:{
            // 初始化图表插件
            init_tb(){
                // 获取dom节点
                let myChart = echarts.init(this.$refs.index_tb_info)
 
                // 指定图表的配置项和数据
                let option =  {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '邮件营销',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '联盟广告',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '视频广告',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '直接访问',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name: '搜索引擎',
                            type: 'line',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            areaStyle: {},
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                    }
        }

    }
</script>


<style>
</style>
