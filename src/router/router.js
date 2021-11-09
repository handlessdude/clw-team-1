import Main from "@/pages/Main"
import TrackCatalogue from "@/pages/TrackCataloguePage"
import TrackViewer from "@/pages/page-viewers/TrackViewer"
import TrackCreatePage from "@/pages/TrackCreatePage"
import TrackUpdateViewer from "@/pages/page-viewers/TrackUpdateViewer"
import TrackList from "@/components/track-list"
import myTrackList from "@/components/myTrack-list"
import Catalogue from "@/pages/CataloguePage"
import Page404 from "@/pages/Page404"
import AddStudent from "@/pages/addStudentPage"
import {createRouter, createWebHistory} from "vue-router"
import store from "@/store/store.js"

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/tracks',
        component: TrackCatalogue,
        children: [{
            path: '/tracks/catalogue',
            component: TrackList,
        },
        {
            path: '/tracks/my-catalogue',
            component: myTrackList,
        },
    ]
    },
    {
        path: '/tracks/:id/add-student',
        component: AddStudent,
        meta: {
            requiresAuth: true,
          },
    },
    {
        path: '/tracks/create',
        component: TrackCreatePage,
        meta: {
            requiresAuth: true,
          },
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
        component: TrackUpdateViewer,
        meta: {
            requiresAuth: true,
          },
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


router.beforeEach((to, from, next) => {
    if (to.matched.some((route) => route.meta?.requiresAuth)) {
      if (store.state.actualUser.roles.includes('teacher')) {
        next();
      } else {
        next("/404");
      }
    } else {
      next();
    }
  });

export default router;
