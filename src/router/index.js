import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/App'
// 样例
import Calendar from '@/views/calendar/index'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Home,
        name: 'Home',
        children: [
            {
                path: 'index',
                component: Calendar,
                name: 'Calendar',
                alias: ''
            }
        ],
        props({query}){
            return {
                id: query.id,
                query: query,
                name: query.name
            }
        }
    },
]

const router = new VueRouter({
    mode: 'hash',
    routes,
})

export default router
