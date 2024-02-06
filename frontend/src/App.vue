<script setup lang="ts">
import PocketBase from 'pocketbase';
import { Ref, ref } from 'vue';
import apiUrl from './apiUrl'
import LoggedInView from './components/LoggedIn.vue'
import LoggedOutView from './components/LoggedOut.vue';

const pb: PocketBase = new PocketBase(apiUrl);
const isLoggedIn: Ref<boolean> = ref(pb.authStore.isValid)
const name: Ref<string> = ref(localStorage.getItem('name') ?? '')

let authData: any;

async function login(email:string, password:string) {
    authData = await pb.collection('users').authWithPassword(email, password);
    isLoggedIn.value = pb.authStore.isValid
    name.value = authData.record.name
    localStorage.setItem('name', authData.record.name)
}

function logout() {
    pb.authStore.clear()
    localStorage.clear()
    isLoggedIn.value = false
}

</script>

<template>

    <Suspense>
        <LoggedInView v-if="isLoggedIn" @logout-click="logout" />
    </Suspense>
    <LoggedOutView v-if="!isLoggedIn" @login-attempt="login" />
    
</template>