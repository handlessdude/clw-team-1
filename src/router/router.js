import Main from "../pages/Main"
import Catalogue from "../pages/TrackCataloguePage"
import TrackPage from "../pages/TrackPage"
//import AllTracks from "../components/main-wrapper"
import {createRouter, createWebHistory} from "vue-router"

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/catalogue',
        component: Catalogue,
        /*children: [
            {
                path: 'all',
                component: AllTracks
            },
            /!*{
                path: 'mytracks',
                component: UserTracks
            }*!/
        ]*/
    },
    {
        path: '/catalogue/:id',
        component: TrackPage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;