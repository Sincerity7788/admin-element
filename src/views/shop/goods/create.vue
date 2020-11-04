<template>
    <div class="bg-white shop_create" style="margin:-20px; margin-top:-1rem;margin-bottom: 0!important;padding-left:20px">
        <div style="position:absolute;top:0;left:200px;height:55px;" class="d-flex align-items-center">
            <router-link :to="{ name:'shop_goods_list' }" >
                <el-button size="mini">返回列表</el-button>
            </router-link>
        </div>
        <el-tabs v-model="tabIndex" @tab-click="handleClick">
            <el-tab-pane label="基础设置" >
                <el-form ref="form" label-width="80px">
                    <el-form-item label="商品名称">
                        <el-input class="w-50" :value="title" size="small"
                         @input="vModel('title',$event)"
                        placeholder="请输入商品名称 不超过60个字符"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类">
                        <el-cascader
                          size="small"
                             :value="category"
                             @input="vModel('category',$event)"
                            :options="options"
                            @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="商品描述">
                        <el-input :value="desc" @input="vModel('desc',$event)"
                         type="textarea" size="small"
                        class="w-50" placeholder="请输入商品描述"></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位">
                        <el-input :value="unit"  class="w-50" size="small"
                        @input="vModel('unit',$event)"
                        placeholder="请输入商品单位"></el-input>
                    </el-form-item>
                    <el-form-item label="总库存">
                        <el-input :value="stock"  type="number" size="small"
                        @input="vModel('stock',$event)" class="w-25">
                             <template slot="append">件</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="库存预警">
                        <el-input :value="min_stock"  type="number" size="small" 
                         @input="vModel('min_stock',$event)"
                        class="w-25">
                             <template slot="append">件</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="库存显示">
                        <el-radio-group :value="display_stoce"
                         @input="vModel('display_stoce',$event)"
                         size="small">
                            <el-radio :label="1" border>是</el-radio>
                            <el-radio :label="0" border>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否上架">
                        <el-radio-group :value="status" 
                        @input="vModel('status',$event)" size="small">
                            <el-radio :label="1" border>放入仓库</el-radio>
                            <el-radio :label="0" border>立即上架</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="运费模板">
                        <el-select :value="express" size="small" 
                        @input="vModel('express',$event)" placeholder="请选择运费模板">
                            <el-option label="模板一" value="模板一"> </el-option>
                            <el-option label="模板二" value="模板二"> </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品规格" >
                <!-- 规格选项 -->
                <el-form label-width="80px">
                     <el-form-item label="商品规格">
                         <el-radio-group :value="skus_type" size="small"
                          @input="vModel('skus_type',$event)">
                            <el-radio-button :label="1" border>单一规格</el-radio-button>
                            <el-radio-button :label="0" border>多规格</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <!-- 单一规格 -->
                <template v-if="skus_type === 1">
                    <el-form label-width="80px" class="w-25">
                        <el-form-item label="市场价格">
                            <el-input type='number' size="small" :value="oprice" 
                            @input="vModel('oprice',$event)">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="销售价格">
                            <el-input type='number' size="small" :value="pprice"
                            @input="vModel('pprice',$event)">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="成本价格">
                            <el-input type='number' size="small" :value="cprice"
                            @input="vModel('cprice',$event)">
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="商品重量">
                            <el-input type='number' size="small" :value="weight"
                            @input="vModel('weight',$event)">
                                <template slot="append">公斤</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="商品体积">
                            <el-input type='number' size="small" :value="volume"
                            @input="vModel('volume',$event)">
                                <template slot="append">立方米</template>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </template>
                <!-- 多规格 -->
                <template v-else>
                  <!-- 规格卡片 -->
                 
                <el-form label-width="80px">
                        <el-form-item label="添加规格">
                             <skuCard v-for="( item, cardIndex ) in sku_card_data"
                              :key='cardIndex' :total='sukCardTotal' :item='item' 
                              :cardIndex='cardIndex'></skuCard>
                            <el-button size="mini" type="success" 
                            @click="addSkuCard">添加规格</el-button>
                        </el-form-item>
                    </el-form>

                    <el-form label-width="80px"> 
                      <el-form-item label="批量设置">
                          <el-button type="text">销售价</el-button>
                          <el-button type="text">市场价</el-button>
                          <el-button type="text">成本价</el-button>
                          <el-button type="text">库存</el-button>
                          <el-button type="text">体积</el-button>
                          <el-button type="text">重量</el-button>
                      </el-form-item>
                      <el-form-item label='规格设置'>规格设置</el-form-item>
                    </el-form>
                </template>
                
            </el-tab-pane>
            <el-tab-pane label="商品属性" >商品属性 </el-tab-pane>
            <el-tab-pane label="媒体设置" >媒体设置 </el-tab-pane>
            <el-tab-pane label="商品详情" >商品详情 </el-tab-pane>
            <el-tab-pane label="折扣设置" >折扣设置 </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
// 导入规格卡片
import skuCard from '@/components/shop/goods/suk-card.vue';
// 导入vuex的方法
import { mapState, mapMutations } from 'vuex';
    export default{
        data:()=>({
            tabIndex:0,// 顶部菜单栏切换默认下标
            
            options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        }),
        components:{
          skuCard
        },
        computed:{
            ...mapState({
                skus_type: state => state.goods_create.skus_type,// 多规格还是单规格
                title: state => state.goods_create.title,// 商品标题
                category: state => state.goods_create.category,// 商品分类
                desc: state => state.goods_create.desc,// 商品描述
                unit: state => state.goods_create.unit,// 商品单位
                stock: state => state.goods_create.stock,// 总库存
                min_stock: state => state.goods_create.min_stock,// 库存预警
                display_stoce: state => state.goods_create.display_stoce,// 库存显示
                status: state => state.goods_create.status,//是否上架
                express: state => state.goods_create.express,// 运费模板
                oprice: state => state.goods_create.oprice,// 市场价格
                pprice: state => state.goods_create.pprice,// 销售价格
                cprice: state => state.goods_create.cprice,// 成本价格
                weight: state => state.goods_create.weight,// 重量
                volume: state => state.goods_create.volume,// 体积
                sku_card_data: state => state.goods_create.sku_card_data
            }),
            // 获取卡片总数
            sukCardTotal(){
              // console.log(this.sku_card_data.length)
                return this.sku_card_data.length
            },
        },
        mounted(){
        },
        methods:{
            ...mapMutations(['addSkuCard', 'vModelState']),
            // 替换v-model事件
            vModel( key, value ){
              this.vModelState( { key, value } )
            },
            
            // 顶部菜单栏切换事件
            handleClick(){

            },
            // 三级联动选择器
            handleChange(){

            }
        }
    }
</script>

<style>
.shop_create .el-form-item{
    margin-bottom: 15px;
}
</style>