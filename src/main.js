import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'
import '../static/weui/weui.css'
const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
        'pages/logs/main',
        '^pages/index/main',
        'pages/bind/main',
        'pages/mySelf/main',
        'pages/proIndex/main',
        'pages/option/main',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#202022',
      navigationBarTitleText: '开天时代',
      navigationBarTextStyle: '#ffffff',
    },
      tabBar: {
          color: '#fff',
          selectedColor: '#fe3d3d',
          backgroundColor: '#232325',
          borderStyle: 'black',
          list: [
              {
                  pagePath: 'pages/proIndex/main',
                  text: '首页',
                  iconPath: '/static/images/tab_home_normol.png',
                  selectedIconPath: '/static/images/tab_home_selected.png'
              },
              {
                  pagePath: 'pages/select/main',
                  text: '自选',
                  iconPath: '/static/images/tab_optional_normal.png',
                  selectedIconPath: '/static/images/tab_optional_selected.png'
              },
              {
                  pagePath: 'pages/option/main',
                  text: '操盘',
                  iconPath: '/static/images/tab_stock_normol.png',
                  selectedIconPath: '/static/images/tab_stock_selected.png'

              },
              {
                  pagePath: 'pages/mySelf/main',
                  text: '我的',
                  iconPath: '/static/images/tab_mine_normol.png',
                  selectedIconPath: '/static/images/tab_mine_selected.png'
              }
          ]
      }
  }
}
