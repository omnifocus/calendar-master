import Vue from 'vue'
import App from './App.vue'
import router from './router'
import less from 'less'
import { Button,Cell, CellGroup,Icon,Field,Tabbar,
  TabbarItem,Toast,Search,RadioGroup,Radio,Uploader,
  DatetimePicker,Overlay,Grid, GridItem,Col, Row,Checkbox, CheckboxGroup   } from 'vant';
import "amfe-flexible"; 
import plugins from './plugin'; // 自定义插件
import store from './store'
import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(less)
// Vue.use(store)
Vue.use(plugins)
Vue.use(Button).use(Cell).use(CellGroup).use(Icon).use(Field)
.use(Tabbar).use(TabbarItem).use(Toast).use(Search).use(RadioGroup)
.use(Radio).use(Uploader).use(DatetimePicker).use(Overlay).use(Grid).use(GridItem)
.use(Col).use(Row).use(Checkbox).use(CheckboxGroup)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
