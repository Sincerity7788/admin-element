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
                name:'颜色', // 规格名称
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
            },
            {
                name:'大小', // 规格名称
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
        ],
        // 规格属性表格的表头数据
        ths: [
            { name: '商品规格', rowspan:1, colspan:1, width:'' },
            { name: 'sku图片', rowspan:2, colspan:1, width:'' },
            { name: '销售价', rowspan:2, colspan:1, width:'' },
            { name: '市场价', rowspan:2, colspan:1, width:'' },
            { name: '成本价', rowspan:2, colspan:1, width:'' },
            { name: '库存', rowspan:2, colspan:1, width:'' },
            { name: '体积', rowspan:2, colspan:1, width:'' },
            { name: '重量', rowspan:2, colspan:1, width:'' },
            { name: '编码', rowspan:2, colspan:1, width:'' },
        ]
    },
    getters:{
        // 过滤空数组
        getLabels( state ){
            return state.sku_card_data.filter( v => v.list.length )
        },
        // 获取表头
        tableThs( state, getters ){
            let length = getters.getLabels.length;
            state.ths[0].colspan = length;
            state.ths[0].rowspan = length ? 1 : 2;
            return state.ths
        },
        // 获取表格排序数据
        getTableData( state ){
            // 判断当前卡片数组是否为空
            if( !state.sku_card_data.length ){ return [] }

            // 声明一个数组
            let arr = [];
            // 遍历卡片数组，拿到下面的属性列表
            for( let i = 0, len = state.sku_card_data.length; i < len; i++ ){
                // 判断当前属性列表不为空
                if( state.sku_card_data[i].list.length ){
                    arr.push( state.sku_card_data[i].list )
                }
            }

            // 判断遍历后的数组是否为空
            if( !arr.length ){
                return []
            }
            let res = $util.cartesianProductOf(...arr);

            // 返回正确数组
            return res.map( v => {
                let obj = {
                    skus: v,
                    image:'',
                    pprice:0,
                    oprice:0,
                    cprice:0,
                    stock:0,
                    volume:0,
                    weight:0,
                    code:0
                }
                return obj
            } )
        }
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