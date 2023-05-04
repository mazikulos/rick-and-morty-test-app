import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '', name: 'home', component: () => import('@/views/Home.vue') },
    {
        path: '/characters',
        name: 'characters',
        component: () => import('@/views/ViewCharacters.vue'),
    },
    {
        path: '/characters/:id',
        name: 'character',
        component: () => import('@/views/ViewCharacter.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('../views/ViewNotFound.vue'),
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router
