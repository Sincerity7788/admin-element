<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12 col-sm-9 col-md-7 col-lg-5 m-auto pt-5">
                    <div class="card mt-5">
                        <div class="card-header bg-white">
                            <h3 class="mb-0 text-center">刘氏集团后台管理系统</h3>
                        </div>
                        <div class="card-body">
                            <el-form :model='form' :rules='rules' ref='ruleForm'>
                                <el-form-item prop='userName'>
                                    <el-input v-model="form.userName" 
                                    size="medium" placeholder="请输入用户名"></el-input>
                                </el-form-item>
                                <el-form-item prop='passWord'>
                                    <el-input v-model="form.passWord" 
                                    size="medium" placeholder="请输入密码" type='password'></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button size="medium" class="w-100" 
                                    type='primary' @click="submit">立即登录</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data:() => ({
        form:{
            userName:'',
            passWord:''
        },
        rules:{
            userName: [ { required: true, message: '请输入用户名',trigger: 'blur' } ],
            passWord: [ { required: true, message: '请输入密码', trigger: 'blur' } ]
        }
    }),
    methods:{
        // 登录按钮事件
        submit(){
            // 通过form表单身上注入的验证方法，调用一次，验证表单输入的内容是否符合规则
            this.$refs.ruleForm.validate( e => {
                // 判断是否验证通过
                if ( !e ){ return }

                // 提交表单

                // 表单验证成功后跳转路由到首页
                this.$router.push( { name:'index' } );
            } )
        }
    }
}
</script>


<style>
</style>