import { createApp } from 'vue'
import App from './App.vue'
import store from "./store/store"
import router from "./router/router"
import components from './components/ui-components'
import directives from './directives';
import '@fortawesome/fontawesome-free/js/all'

const app = createApp(App)

//global registration for simple reusable objects
components.forEach(component => {
    app.component(component.name, component)
})
directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app.use(router).use(store).mount('#app')
