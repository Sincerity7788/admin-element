// 导入方法
import $util from '@/common/util.js';
export default{
    state: {
        skus_type:0,// 多规格还是单规格
        title:'',// 商品标题
        category:[],// 商品分类
        desc:'',// 商品描述
        unit:'',// 商品单位
        stock:0,// 总库存
        min_stock:0,// 库存预警
        display_stoce:0,// 库存显示
        status:0,//是否上架
        express:'',// 运费模板

        oprice:0,// 市场价格
        pprice:0,// 销售价格
        cprice:0,// 成本价格
        weight:0,// 重量
        volume:0,// 体积

        // 规格卡片
        sku_card_data:[
            {
                name:'', // 规格名称
                type:0, // 规格属性 0无 1颜色 2图片
                list:[
                    {
                        name:'名称',
                        color:'',
                        img:''
                    },
                    {
                        name:'名称',
                        color:'',
                        img:''
                    }
                ],// 规格属性列表
            }
        ]
    },
    mutations: {
        // 修改state中的值
        vModelState( state, { key, value } ){
            state[key] = value
        },
        // 添加规格卡片
        addSkuCard( state ){
            state.sku_card_data.push({
                name:'规格名称', // 规格名称
                type:0, // 规格属性 0无 1颜色 2图片
                list:[],// 规格属性列表 
            })
        },
        // 删除规格卡片
        delSkuCard( state, index ){
            state.sku_card_data.splice(index,1)
        },
        // 修改规格卡片
        vModelSkuCard( state, { key, index, value } ){
            state.sku_card_data[index][key] = value
        },
        // 规格卡片排序
        sortSkuCard( state, { action, index } ){
            $util[action]( state.sku_card_data ,index )
        },
        // 添加规格属性
        addSkuValue( state, index ){
            state.sku_card_data[index].list.push({
                name:'名称',
                color:'',
                img:''
            })
        },
        // 删除规格属性
        delSkuValue( state, { index1, index2 } ){
            state.sku_card_data[index1].list.splice(index2,1)
        },
        // 修改规格属性
        updateSkuValue( state, { cardIndex, index, key, value } ){
            state.sku_card_data[cardIndex].list[index][key] = value
        },
        // 排序规格卡片的规格属性列表
        sortSkuValue( state,{ cardIndex, list } ){
            state.sku_card_data[cardIndex].list = list
        }

    },
    actions: {
    },
    modules: {
    }
}