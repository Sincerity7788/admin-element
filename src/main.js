import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js'

// 引入全局配置文件
import $conf from './common/config/config';

Vue.config.productionTip = false;

// 挂在到vue的原型上
Vue.prototype.$conf = $conf;

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
