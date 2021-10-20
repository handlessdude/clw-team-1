import { createApp } from 'vue'
import App from './App.vue'
import store from "./store/store"
import components from '@/components/ui-components'

const app = createApp(App)

//global registration for simple reusable objects
components.forEach(component => {
    app.component(component.name, component)
})

app.use(store).mount('#app')

// import Vue from 'vue'
// import App from './App.vue'
// import store from './store'


// new Vue({
//     render: h => h(App),
//     store
// }).$mount('#app')
