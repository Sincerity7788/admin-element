<template>

    <table class="table table-sm table-bordered">
        <thead>
        <tr>
            <th scope="col" class="text-center"
            :colspan="th.colspan" :rowspan="th.rowspan" style="vertical-align:middle"
            v-for="( th, thi ) in tableThs" :key="thi"
            >{{ th.name }}</th>
        </tr>
        <tr>
            <th scope="col" class="text-center" 
            v-for="( th, thi ) in getLabels" :key="thi"
            >{{ th.name }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="( item, index ) in list" :key="index">
            <th scope="row" v-for="( sku, skuI ) in item.skus"
            :key="skuI" class="text-center">{{ sku.name }}</th>
            <td width='100' class="text-center">
                <span class="btn btn-light border"><i class="el-icon-plus"></i></span>
            </td>
            <td width='100'>
                <input type="number" class="text-center form-control" v-model="item.pprice">
            </td>
            <td width='100'>
                <input type="number" class="text-center form-control" v-model="item.oprice">
            </td>
            <td width='100'>
                <input type="number" class="text-center form-control" v-model="item.cprice">
            </td>
            <td width='100'>
                <input type="number" class="text-center form-control" v-model="item.stock">
            </td>
            <td width='100'>
                <input type="number" class="text-center form-control" v-model="item.volume">
            </td>
            <td width='100'>
                <input type="number" class="text-center form-control" v-model="item.weight">
            </td>
            <td width='100'>
                <input type="text" class="text-center form-control" v-model="item.code">
            </td>
        </tr>
        </tbody>
    </table>    
</template>

<script>
// 引入vuex
import { mapGetters, mapState } from 'vuex'
export default{
    computed:{
        ...mapGetters(['tableThs','getTableData','getLabels']),
        ...mapState({
            sku_card_data: state => state.goods_create.sku_card_data
        }),
        
    },
    data(){
        return {
            list:[]
        }
    },
    watch: {
        getTableData( newValue, oldValue ){
            this.list = newValue
        }
    },
    mounted(){
        this.list = this.getTableData;
    }
}



</script>


<style>

</style>

