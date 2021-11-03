import Main from "../pages/Main"
import TrackCatalogue from "../pages/TrackCataloguePage"
import TrackPage from "../pages/TrackPage"
import Catalogue from "../pages/CataloguePage"
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
        path: '/catalogue',
        component: Catalogue,
    },
    {
        path: '/tracks/:id',
        component: TrackPage
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