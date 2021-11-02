import Main from "@/pages/Main"
import TrackCatalogue from "@/pages/TrackCataloguePage"
import TrackPage from "@/pages/TrackPage"
import TrackCreatePage from "@/pages/TrackCreatePage"
//import TrackUpdatePage from "@/pages/TrackUpdatePage"
import TrackUpdateViewer from "@/pages/page-viewers/TrackUpdateViewer"
import Catalogue from "@/pages/CataloguePage"
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
        component: TrackPage
    },
    /*{
        path: '/tracks/:id/update',
        component: TrackUpdatePage
    },*/
    {
        path: '/tracks/:id/update',
        component: TrackUpdateViewer
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;