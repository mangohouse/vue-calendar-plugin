import Vue from 'vue'
import Router from 'vue-router'
import vueCalendar from '@/components/vueCalendar'
import index from '@/pages/index'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/index',
            name: 'index',
            component: index
        }
    ]
})