import PocketBase from 'pocketbase'
import apiUrl from './apiUrl';
import { Router, createRouter, createWebHashHistory } from 'vue-router'
import Home from './components/Home.vue';
import About from './components/About.vue';
import Account from './components/Account.vue';
import LoginRegister from './components/LoginRegister.vue';


const pb = new PocketBase(apiUrl)

const router:Router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'Home',
            path: '/',
            component: Home,
            meta : {
                isPublic: false
            }
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
            component: About,
            meta: {
                isPublic: false
            }
        },
        {
            name: 'Account',
            path: '/account',
            component: Account,
            meta: {
                isPublic: false
            }
        }
    ]
})

router.beforeEach((to) => {
    if (!to.meta.isPublic && !pb.authStore.isValid) {
        router.push('/login')
    }
});

export default router;