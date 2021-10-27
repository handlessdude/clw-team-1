import Main from "../pages/Main"
import TrackCatalogue from "../pages/TrackCataloguePage"
import TrackPage from "../pages/TrackPage"
import Catalogue from "../pages/CataloguePage"
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
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;