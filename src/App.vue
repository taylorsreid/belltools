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
        <Layout v-if="isLoggedIn" :user="pb.authStore.model" @nav="navigate">
            <Home v-if="currentPage === 'home'" />
            <About v-if="currentPage === 'about'" />
            <Account v-if="currentPage === 'account'" />
        </Layout>
    </Suspense>
    <LoggedOutView v-if="!isLoggedIn" @login-attempt="login" :error-message="errorMessage" />
</template>