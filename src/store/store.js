import {
    createStore
} from 'vuex'
import storeModule from './storeModule'

export default createStore({
    modules: {
        storeModule
    },
});