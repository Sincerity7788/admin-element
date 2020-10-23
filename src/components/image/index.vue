<template>
    <li class="list-group-item list-group-item-action d-flex align-items-center" 
    style="cursor:pointer"
    
    :class="{'active sum-active': active }"
    @click.stop="$emit('change',index)">
        <span>{{ item.name }}</span>
        <el-dropdown class="ml-auto" szie="small">
            <span class="btn btn-light">
                {{ item.num }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.stop.native='$emit("edit",{ item, index } )'>修改</el-dropdown-item>
                <el-dropdown-item @click.stop.native="$emit('del',index)">删除</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </li>
</template>

<script>
export default{
    props:{
        item: Object,
        index: Number,
        active: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>

</style>