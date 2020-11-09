<template>
    <div class="border rounded py-1 px-2 mr-2 
    position-relative d-flex align-items-center">
        <div  v-if="type !== 0">
            <!-- 颜色选择器 -->
            <el-color-picker v-if="type === 1" 
            size="mini"></el-color-picker>
            <!-- 图片选择器 -->
            <span class="btn btn-light border" @click="clooseImage" v-else>
                <i class="el-icon-plus"></i>
            </span>
        </div>
        <input :value='item.name' class="form-control text-center py-0 border-0" 
        style="width:80px" @input='updateSku( "name",$event.target.value)' />
        <span class="btn btn-light p-0 position-absolute" 
        style="line-height:1;top:-10px;right:-10px" @click=changeIndex>
            <i class="el-icon-circle-close"></i>
        </span>
    </div>
</template>

<script>
// 导入vuex
import { mapMutations } from 'vuex';
    export default{
        inject:['app'],
        props:{
            type:{
                type:Number,
                default:0
            },
            item:{
                type:Object
            },
            index:Number,
            cardIndex: Number
        },
        mounted(){
            // console.log(item)
        },
        methods:{
             ...mapMutations(['delSkuValue','updateSkuValue']),
             // 删除sku属性
            changeIndex(  ){
                let index1 = this.cardIndex;
                let index2 = this.index;
                this.delSkuValue({index1,index2})
            },
            // 修改sku属性
            updateSku( key, value){
                this.updateSkuValue({
                    cardIndex:this.cardIndex,
                    index:this.index,
                    key, 
                    value
                })
            },
            // 选择图片
            clooseImage(){
                this.app.show(this.resData)
            },
            // 接收结果的方法
            resData(res){
                console.log(res)
            }
        }   
    }
</script>

<style>

</style>
