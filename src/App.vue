<script setup lang="ts">
import PocketBase, { ClientResponseError } from 'pocketbase';
import { Ref, ref } from 'vue';
import apiUrl from './apiUrl'
import Home from './components/Home.vue'
import LoggedOutView from './components/LoggedOut.vue';
import Layout from './components/Layout.vue';
import About from './components/About.vue'
import Account from './components/Account.vue'

const pb: PocketBase = new PocketBase(apiUrl);
const isLoggedIn: Ref<boolean> = ref(pb.authStore.isValid)
const currentPage: Ref<string> = ref('home')
const errorMessage: Ref<string> = ref('')

async function login(email:string, password:string) {
    try {
        await pb.collection('users').authWithPassword(email, password);
        isLoggedIn.value = pb.authStore.isValid
        errorMessage.value = ''
    } catch (error) {
        if (error instanceof ClientResponseError) {
            if (error.status === 400) {
                errorMessage.value = 'Incorrect email and password.'
            }
            else {
                errorMessage.value = error.message
            }
        }
    }
}

function logout() {
    pb.authStore.clear()
    localStorage.clear()
    isLoggedIn.value = false
}

function navigate(target:string) {
    if (target === 'logout') {
        logout()
        currentPage.value = 'home'
    } else {
        currentPage.value = target
    }
}
</script>

<template>
    <Suspense>
        <div>
            <div v-if="pb.authStore.model?.email === 'demouser@example.com'" id="demoBanner">You are viewing Lani in demo mode. Data will be static.</div>
            <Layout v-if="isLoggedIn" :user="pb.authStore.model" @nav="navigate">
                <Home v-if="currentPage === 'home'" />
                <About v-if="currentPage === 'about'" />
                <Account v-if="currentPage === 'account'" />
        </Layout>
        </div>
    </Suspense>
    <LoggedOutView v-if="!isLoggedIn" @login-attempt="login" :error-message="errorMessage" />
</template>

<style scoped>
    #demoBanner {
        width: 100%;
        background-color: red;
        color: white;
        text-align: center;
        font-size: larger;
    }
</style>