import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import Multiselect from 'vue-multiselect'
import "vue-multiselect/dist/vue-multiselect.min.css";
import App from './App.vue'

Vue.component('multiselect', Multiselect);

const swapiModule = require('./plugins/swapi.js').default;
Object.defineProperty(Vue.prototype, '$swapi', { value: swapiModule });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
