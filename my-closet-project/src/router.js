import { createWebHistory, createRouter } from 'vue-router';
const root = '/closest'
const routes = [
    {
        path: root+"/",
        name: "Home",
        component: () => import('./views/Home.vue') 
    },
    {
        path: root+"/Tocloset",
        name: "closet",
        component: () => import('./views/ToCloset.vue')
    },
    {
        path: root+"/Opencloset/:sort",
        name: "open",
        component: () => import('./views/Gallery.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;