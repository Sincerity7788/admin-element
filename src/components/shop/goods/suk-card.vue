<template>
    <el-form label-width="80px">
         <el-form-item label="添加规格">
            <div class="card mb-3" style="line-height:1.2" 
            v-for="( item, index ) in sku_card_data" :key='index'>
                <div class="card-header d-flex align-items-center">
                    <span>规格项：</span>
                    <el-input size="mini" style="width:200px"
                    :value="item.name" @input="vModel('name', index, $event)">
                        <el-button slot='append' icon="el-icon-more"></el-button>
                    </el-input>
                    <el-radio-group size="mini" style="margin-bottom:-10px;" 
                    :value='item.type' class="ml-2 mr-auto"
                    @input="vModel('type', index, $event)">
                        <el-radio :label="0">无</el-radio>
                        <el-radio :label="1">颜色</el-radio>
                        <el-radio :label="2">图片</el-radio>
                    </el-radio-group>
                    <el-button icon="el-icon-top" size="mini"></el-button>
                    <el-button icon="el-icon-bottom" size="mini"></el-button>
                    <el-button size="mini" type="text"
                    @click="delSkuCard(index)">删除</el-button>
                    
                </div>
                <div class="card-body">
                    <div>
                        <el-button icon="el-icon-plus" size="mini" type="text">添加规格值</el-button>
                    </div>
                </div>
            </div>
            <el-button size="mini" type="success" 
            @click="addSkuCard">添加规格</el-button>
        </el-form-item>
    </el-form>
</template>
    
<script>
// 导入vuex
import { mapState, mapMutations } from 'vuex'
    export default{
        computed:{
            ...mapState({
                sku_card_data: state => state.goods_create.sku_card_data
            })
        },
        methods:{
            ...mapMutations(['addSkuCard', 'delSkuCard', 'vModelSkuCard']),
            // 需改卡片内容
            vModel( key, index, value ){
                this.vModelSkuCard({ key, index, value })
            }
        }
    }
</script>

<style>

</style>
