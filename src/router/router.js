import Main from "../pages/Main"
import TrackCatalogue from "../pages/TrackCataloguePage"
import Catalogue from "../pages/CataloguePage"
import TrackCreatePage from "@/pages/TrackCreatePage"
import TrackViewer from "@/pages/page-viewers/TrackViewer"
import TrackUpdateViewer from "@/pages/page-viewers/TrackUpdateViewer"
import Page404 from "@/pages/Page404"
import {createRouter, createWebHistory} from "vue-router"

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/tracks',
        component: TrackCatalogue,
    },
    {
        path: '/tracks/create',
        component: TrackCreatePage
    },
    {
        path: '/catalogue',
        component: Catalogue,
    },
    {
        path: '/tracks/:id',
        component: TrackViewer
    },
    {
        path: '/tracks/:id/update',
        component: TrackUpdateViewer
    },
    //Обязательно поместить пути /404 и " * " в конец списка роутов
    {
        path: '/404',
        name: 'NotFound',
        component: Page404
    },
    {
        path: '/:catchAll(.*)',
        redirect: { name: 'NotFound' }
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;
