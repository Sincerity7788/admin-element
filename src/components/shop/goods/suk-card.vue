<template>
    <div class="card mb-3" style="line-height:1.2" 
    >
        <div class="card-header d-flex align-items-center">
            <span>规格项：</span>
            <el-input size="mini" style="width:200px"
            :value="item.name" @input="vModel('name', cardIndex, $event)">
                <el-button slot='append' icon="el-icon-more"></el-button>
            </el-input>
            <el-radio-group size="mini" style="margin-bottom:-10px;" 
            :value='item.type' class="ml-2 mr-auto"
            @input="vModel('type', cardIndex, $event)">
                <el-radio :label="0">无</el-radio>
                <el-radio :label="1">颜色</el-radio>
                <el-radio :label="2">图片</el-radio>
            </el-radio-group>
            <!-- 上移 -->
            <el-button icon="el-icon-top" size="mini"
            :disabled='cardIndex === 0'
            @click="skuCardSort('moveUp',cardIndex)"></el-button>
            <!-- 下移 -->
            <el-button icon="el-icon-bottom" size="mini" 
            :disabled='total === ( cardIndex + 1 )'
            @click="skuCardSort('moveDown',cardIndex)"></el-button>
            <!-- 删除 -->
            <el-button size="mini" type="text"
            @click="delSkuCard(cardIndex)">删除</el-button>
            
        </div>
        <div class="card-body">
            <!-- 规格属性列表 -->
            <div class="d-flex align-items-center flex-wrap">
                <skuChildren :type='item.type' v-for="( itema, indexa ) in list" 
                :key="indexa" :item='itema' :index='indexa' :cardIndex="cardIndex" 
                v-dragging="{ item: itema, list: list, group: `skuItme${cardIndex}` }"/>
               
            </div>
            <!-- 添加规格属性 -->
            <div class="mt-3">
                <el-button icon="el-icon-plus" size="mini" type="text"
                @click="addSkuValue(cardIndex)">添加规格值</el-button>
            </div>
        </div>
    </div>
</template>
    
<script>
// 导入卡片属性列表item
import skuChildren from './sku-children.vue';
// 导入vuex
import { mapState, mapMutations } from 'vuex'
    export default{
        components:{
            skuChildren
        },
        props:{
            item:{
                type:Object
            },
            cardIndex:Number,
            total:Number
        },
        data(){
            return {
                list: this.item.list
            }
        },
        mounted(){
            this.$dragging.$on('dragend', (e) => {
                if(e.group === `skuItme${this.cardIndex}`){
                    this.sortSkuValue({
                        cardIndex:this.cardIndex,
                        list:this.list
                    })
                }
                
             })
        },
        methods:{
            ...mapMutations(['delSkuCard', 'vModelSkuCard','sortSkuCard',
            'addSkuValue','sortSkuValue']),
            // 需改卡片内容
            vModel( key, index, value ){
                this.vModelSkuCard({ key, index, value })
            },
            // 规格卡片排序
            skuCardSort(action, index){
                console.log(this.cardIndex)
                this.sortSkuCard( { action, index } )
            }
        }
    }
</script>

<style>

</style>
