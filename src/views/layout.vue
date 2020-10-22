<template>
    <div>
        <el-container style="overflow:hidden;height:100vh">
            <el-header style="background-color:#545c64" class="d-flex align-items-center">
                <a class="mb-0 mr-auto text-light">{{ $conf.logo }}</a>
                <el-menu
                :default-active="navBar.active"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item :index=" index | numTostring " v-for="( item, index ) in navBar.list" :key='index'>
                    {{ item.name }}
                </el-menu-item>
                <el-submenu index="100">
                    <template slot="title">
                        <el-avatar size="small" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                        董事长
                        </template>
                    <el-menu-item index="100-1">修改</el-menu-item>
                    <el-menu-item index="100-2">退出</el-menu-item>
                </el-submenu> </el-menu>
            </el-header>
            <el-container style="height:100%;">
                <el-aside width="200px" >
                     <el-menu
                        :default-active="submenu"
                         @select="sideSelect"
                         style="height:100%"
                        >
                        <el-menu-item :index=" index | numTostring " v-for="( item, index ) in submenuList" :key='index'>
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>

                    </el-menu>
                </el-aside>
                <el-main class="bg-light" style="padding-bottom:60px;position:relative">
                    <!-- 面包屑导航 -->
                    <div class="border-bottom mb-3 bg-white"
                     style="padding:20px;margin:-20px"
                     v-if='bran.length'
                     >
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item
                            v-for="( item, index ) in bran" :key='index'
                            :to="{ path: item.path }">{{ item.title }}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                     <!-- 主内容 -->
                    <router-view></router-view>
                    <!-- 长度到了一定位置，出现按回到顶部按钮 -->
                    <el-backtop target=".el-main" :bottom="100">

                        <div
                        style="height: 100%;
                            width: 100%;
                            background-color: #f2f5f6;
                            box-shadow: 0 0 6px rgba(0,0,0, .12);
                            text-align: center;
                            line-height: 40px;
                            color: #1989fa;"
                        >
                        UP
                        </div>
                    </el-backtop>

                </el-main>
            </el-container>
        </el-container>

    </div>

</template>


<script>
// 导入minxis组件
import common from '@/common/minxis/common.js';
export default {
    mixins:[ common ],
    data: () => ({
        navBar: [],// 全局导航菜单
        bran:[],// 面包屑数据
    }),
    watch:{
        '$route'(to, fotm){
            // 获取当前页面路由信息
            this.getRouteInfo();
            // 存储当前选中的下标
            localStorage.setItem('navActive',JSON.stringify( {
                top: this.navBar.active,
                left: this.submenu
            } ))
        }
    },
    created(){
        // 初始化导航栏菜单
        this.navBar = this.$conf.navBar;
        // 获取当前页面路由信息
        this.getRouteInfo();
        // 获取本地存储的菜单选中
        this.__initNavActive();
    },
    computed:{
        // 处理当前左侧菜单默认选中的下标
        submenu:{
            get(){
                return this.navBar.list[this.navBar.active].subActive || '0'
            },
            set( val ){
                this.navBar.list[this.navBar.active].subActive = val;
                // console.log(val)
            }
        },
        // 处理当前顶部菜单的内容
        submenuList(){
            return this.navBar.list[this.navBar.active].submenu || []
        }
    },
    methods:{
        // 侧边菜单栏点击事件
        sideSelect( key, keyPath ){
            // 修改对应左侧菜单栏的选中下标
            this.submenu = key;
            // 跳转路由
            this.$router.push( { name: this.submenuList[key].pathName } )
            // console.log( this.submenu )
        },
        // 顶部菜单栏点击事件
        handleSelect( key, keyPath ){
            if( key === '100-1' ){
                return console.log('修改资料')
            }
            if( key === '100-2' ){
                return console.log('退出')
            }
            // 修改当前顶部选中下标
            this.navBar.active = key;
            this.submenu = '0';
            // 跳转路由
            // console.log( this.navBar.active )
            this.$router.push( { name: this.submenuList[this.submenu].pathName } )

        },
        // 获取当前路由信息
        getRouteInfo(){

            // 保存当前路由信息
            let routeArr = this.$route.matched.filter( item => item.name );
            // 定义一个新数组保存处理好的路由信息
            let newRouteArr = [];
            // 循环处理路由信息
            routeArr.forEach( ( item, index ) => {
                // 判断当前路由是layout或者index
                if( item.name === 'layout' || item.name === 'index' ){ return }
                // 添加一项数据到新数组中
                newRouteArr.push({
                    name: item.name,// 路由名字
                    path: item.path,// 路由路径
                    title: item.meta.title// 路由别名
                })
             } );

            // 判断当前数组长度大于零，就给数组首位添加一个首页信息
            if ( newRouteArr.length ) {
                newRouteArr.unshift({
                    name: 'index',
                    path: '/index',
                    title: '后台首页'
                })

            }
            // 保存到data中
            this.bran = newRouteArr;


            // console.log(newRouteArr);
        },
        // 获取本地存储的菜单选中
        __initNavActive(){

            let r = localStorage.getItem('navActive');
            // 判断当前本地是否存储了下标
            if ( r ) {
                r = JSON.parse( r );
                this.submenu = r.left;
                this.navBar.active = r.top;
            }
        },
   }
}
</script>


<style>
::-webkit-scrollbar-track{
    background-color: rgba(0,0,0,.1);
    border-radius:0;
}
::-webkit-scrollbar{
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
}
::-webkit-scrollbar-thumb{
    cursor: pointer;
    border-radius: 5px;
    background-color: rgba(0,0,0,.25);
    transition: background-color .2s ease;
}
</style>
