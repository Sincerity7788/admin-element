let routes =  [
    {
      path:'/',
      name:'layout',
      redirect:{ name:'index' },
      component:'layout',
      children:[
        {
          // path:'index',
          // name:'index',
          meta: { title: '后台首页' },
          component: 'index/index'
        },
        {
          meta: { title: '商品列表' },
          component: 'shop/goods/list'
        }
      ]
    },
    {
      // path:'/login',
      // name:'login',
      component: 'login/index'
    },
    {
        path:'*',
        redirect: { name: 'index' }
    }
  ]

// 获取routes
let getRoutes = () => {
    // 自动生成路由
    crateRoute(routes)
    return routes
}

// 自动生成路由
function crateRoute( arr ){
    // 循环处理路由
    for( let i = 0, len = arr.length; i < len; i++ ){
        // 判断当前是否有component
        if( !arr[i].component ){ return }
        let val = getValue( arr[i].component );
        
        // 生成path
        arr[i].path = arr[i].path || `/${val}`;
        // 生成name
        arr[i].name = arr[i].name || val.replace( /\//g, '_' );
        // 获取component
        let component = import(`@/views/${arr[i].component}.vue`);
        // 赋值给当前的component
        arr[i].component = () => component;
        // 判断当前是否有子路由
        if ( arr[i].children && arr[i].children.length ) {
            crateRoute( arr[i].children )
        }
    }
    
}

// 去除path的index结尾
function getValue( str ){

  // 拿到str最后一个/的索引位置
  let index = str.lastIndexOf('/');
  // 拿到str最后一个/后面的内容
  let val = str.substring(index + 1, str.length);
  // console.log(val)
  // 判断当前取到的值是不是等于index
  if ( val === 'index' ) {
    return str.substring( index, -1 );
  }
  return str

}


  export default getRoutes()