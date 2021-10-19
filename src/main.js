import {
    createApp
} from 'vue'
import App from './App.vue'
import store from "./store/store"



createApp(App).use(store).mount('#app')

// import Vue from 'vue'
// import App from './App.vue'
// import store from './store'


// new Vue({
//     render: h => h(App),
//     store
// }).$mount('#app')