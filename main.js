import Vue from 'vue'
import App from './App'

// 自定义导航栏组件
import hxNavbar from "./components/hx-navbar/hx-navbar"
Vue.component('hx-navbar',hxNavbar)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
