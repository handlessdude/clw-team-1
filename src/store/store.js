// here we assemble modules and export the store
import { createStore } from 'vuex'
//import { storeModule } from './storeModule' why is that
import { trackCatalogueModule } from './modules/trackCatalogueModule'
import { trackPageModule } from './modules/trackPageModule'
import { sidebarModule } from './modules/sidebarModule'
import { userinfoModule } from './modules/userinfoModule'
import { configModule } from './modules/configModule'
import { addUserModule } from './modules/addUserModule'
import axios from "axios";

export default createStore({
    state: () => ({
        server: "https://tml6.rosatom.ru",
        serverApi: "https://tml6.rosatom.ru/api/",
        tracksUrl: "https://tml6.rosatom.ru/api/tracks",
        trackUrl: "https://tml6.rosatom.ru/api/track",
        searchUrl: "https://tml6.rosatom.ru/api/search",
        searchUser: "https://tml6.rosatom.ru/api/search/users",
        getDep: "https://tml6.rosatom.ru/api/corporation/departments",
        getComp: "https://tml6.rosatom.ru/api/corporation/companies",
        xApiKeyTeacher: "4kcwkcksk0gwcs4kc0wo4gws0sgcswgcosc88ok4",
        userIdTeacher: 743441,
        xApiKeyStudent: "s8oogko8cckkwcs4ksws088wsccggok0k08s4oog",
        userIdStudent: 743436,
        actualUser: {},
        actualList: 'catalog',
        activeModalWindow: false

    }),
    getters: {
        /*server: state => state.server,
        trackUrl: state => state.trackUrl,
        xApiKeyTeacher: state => state.xApiKeyTeacher,
        xApiKeyStudent: state => state.xApiKeyStudent,*/
        serverAccess: state => axios.create({
            baseURL: state.serverApi,
            headers: {
                "X-API-Key": state.xApiKeyTeacher
            }
        }),
        getUserInfo: state => state.actualUser,
        getActualList: state => state.actualList,
    },
    mutations: {
        setActualUser(state, user) {
            state.actualUser = user
        },
        setActualList(state, list) {
            state.actualList = list
        },
        setModalWindow(state, set) {
            state.activeModalWindow = set
        }

    },
    modules: {
        trackCatalogue: trackCatalogueModule,
        trackPage: trackPageModule,
        sidebar: sidebarModule,
        configs: configModule,
        userList: userinfoModule,
        addUser: addUserModule,
    },
});
