import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'

const swapiModule = require('./plugins/swapi.js').default;
Object.defineProperty(Vue.prototype, '$swapi', { value: swapiModule });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
