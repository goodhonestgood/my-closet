import { createWebHistory, createRouter } from 'vue-router';

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import('./views/Home.vue') 
    },
    {
        path: "/Tocloset",
        component: () => import('./views/ToCloset.vue')
    },
    {
        path: "/Opencloset",
        component: () => import('./views/Gallery.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;