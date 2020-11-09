<template>
  <div id="app">
    <router-view></router-view>
    <el-dialog
      title="提示"
      :visible.sync="imageModel"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'app',
  // 依赖注入
  provide(){
    return{
      app: this
    }
  },
  data(){
    return{
      imageModel: false,
      callback: false
    }
  },
  components: {
  },
  methods:{
    // 取消按钮事件
    hide(){
      this.imageModel = false;
      this.callback = false
    },
    // 确定按钮
    confirm(){
      // 返回选中的url
      if( typeof this.callback === 'function' ){
        this.callback('这是数据')
      }
      // 关闭model
      this.hide()
    },
    // 开启弹框
    show(callback){
      this.imageModel = true;
      this.callback = callback;
    }
  }
}
</script>

<style>

</style>
