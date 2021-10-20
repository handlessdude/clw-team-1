// here we assemble modules and export the store

import { createStore } from 'vuex'
import storeModule from './storeModule'

export default createStore({
    modules: {
        storeModule
    },
});