import PocketBase from 'pocketbase'
import apiUrl from './apiUrl';
import { Router, createRouter, createWebHashHistory } from 'vue-router'
import Flights from './components/Flights.vue';
import About from './components/About.vue';
import Account from './components/Account.vue';
import LoginRegister from './components/LoginRegister.vue';
import Cut from './components/Cut.vue';


const pb = new PocketBase(apiUrl)

const router:Router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'lights',
            path: '/flights',
            component: Flights,
        },
        {
            name: 'Login',
            path: '/login',
            component: LoginRegister,
            meta : {
                isPublic: true
            }
        },
        {
            name: 'Register',
            path: '/register',
            component: LoginRegister,
            meta: {
                isPublic: true
            }
        },
        {
            name: 'About',
            path: '/about',
            component: About
        },
        {
            name: 'Account',
            path: '/account',
            component: Account
        },
        {
            name: 'Cut',
            path: '/cut',
            component: Cut
        }
    ]
})

router.beforeEach((to) => {
    if (!to.meta.isPublic && !pb.authStore.isValid) {
        router.push('/login')
    }
});

export default router;