// here we assemble modules and export the store
import { createStore } from 'vuex'
//import { storeModule } from './storeModule' why is that
import { trackCatalogueModule } from './modules/trackCatalogueModule'
import { trackPageModule } from './modules/trackPageModule'

export default createStore({
    state: {
        server: "https://tml6.rosatom.ru/api/tracks",
        xApiKeyTeacher: "4kcwkcksk0gwcs4kc0wo4gws0sgcswgcosc88ok4",
        userIdTeacher: 743441,
        xApiKeyStudent: "s8oogko8cckkwcs4ksws088wsccggok0k08s4oog",
        userIdStudent: 743436,
        /*TODO: replace with normal auth with axios and some method*/
        isTeacher: true,
    },
    modules: {
        trackCatalogue: trackCatalogueModule,
        trackPage: trackPageModule,
    },
});