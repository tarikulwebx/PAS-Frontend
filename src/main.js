import Vue from 'vue'
import VueCompositionAPI, { createApp, h } from '@vue/composition-api'
// import "./registerServiceWorker";
import App from './App.vue';
import router from './router';
import store from './store';


// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

// Make BootstrapVue available throughout your project
// Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin)

Vue.use(VueCompositionAPI)

const app = createApp({
  router,
  store,
  render: () => h(App)
})

app.mount('#app')
