export default {
    logo: '刘氏集团后台管理系统',
    navBar: {
        active: '0',// 顶部导航栏默认选中
        list: [
            { 
                name: '首页',
                subActive: '0',
                submenu:[
                    { 
                        name: '首页',
                        icon: 'el-icon-menu',
                        pathName: 'index'
                    },
                    { 
                        name: '相册管理',
                        icon: 'el-icon-picture',
                        pathName: 'image'
                    },
                    { 
                        name: '商品列表',
                        icon: 'el-icon-s-goods',
                        pathName: 'shop_goods_list'
                    }
                ]
            },
            { 
                name: '商品',
                subActive: '0',
                submenu:[
                    { 
                        name: '商品列表',
                        icon: 'el-icon-menu',
                        pathName: 'shop_goods_list'
                    }
                ]
            },
            { 
                name: '订单',
                subActive: '0',
                submenu:[
                    { 
                        name: '订单1',
                        icon: 'el-icon-menu'
                    },
                    { 
                        name: '订单2',
                        icon: 'el-icon-menu'
                    }
                ]
            },
            { 
                name: '会员',
                subActive: '0',
                submenu:[
                    { 
                        name: '会员1',
                        icon: 'el-icon-menu'
                    },
                    { 
                        name: '会员2',
                        icon: 'el-icon-menu'
                    }
                ]
            },
            { 
                name: '设置',
                subActive: '0',
                submenu:[
                    { 
                        name: '设置1',
                        icon: 'el-icon-menu'
                    },
                    { 
                        name: '设置2',
                        icon: 'el-icon-menu'
                    }
                ]
            },
        ],// 顶部导航栏菜单列表
    }
}