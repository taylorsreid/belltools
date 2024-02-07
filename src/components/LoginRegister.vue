<script setup lang="ts">
import { AuthFormData, AuthMessage } from "../../types";
import PocketBase, { ClientResponseError } from "pocketbase";
import { Ref, ref } from 'vue';
import apiUrl from '../apiUrl';
import router from '../router';

const fd:Ref<AuthFormData> = ref({})

const pb = new PocketBase(apiUrl)
const am:Ref<AuthMessage> = ref({
    message: '',
    color: 'red'
})

async function handleAuth(e: Event) {
    e.preventDefault()
    try {
        if (router.currentRoute.value.name === 'Login') {
            await pb.collection('users').authWithPassword(fd.value.email!, fd.value.password!);
            router.push('/')
        }
        else if (router.currentRoute.value.name === 'Register') {
            const user = await pb.collection('users').create(fd.value)
            if (user) {
                am.value.color = 'green'
                am.value.message = 'Registration request sent.'
            }
        }
        else {
            throw new Error("IDK how you managed to do this but you did.");
        }
    } catch (error) {
        am.value.color = 'red'
        if (error instanceof ClientResponseError) {
            if (error.status === 400) {
                if (router.currentRoute.value.name === 'Login') {
                    am.value.message = 'Incorrect email and password.'
                }
                else if (router.currentRoute.value.name === 'Register') {
                    Object.keys(error.response.data).forEach(e => {
                        am.value.message += (error as ClientResponseError).response.data[e].message
                    })
                }
            }
            else if (error.status === 403 && router.currentRoute.value.name === 'Login') {
                am.value.color = 'yellow'
                am.value.message = 'Your account is still pending approval or has been disabled.'
            }
        }
        else {
            am.value.message = String(error)
        }
    }
}
</script>

<template>
    <h1 class="title">Lani</h1>
    
    <div id="container">
        <form @submit="handleAuth">
            <label for="email">Email:</label>
            <br>
            <input v-model="fd.email" type="email" id="email" required>
            <br>
            <br>
            <label for="password">Password:</label>
            <br>
            <input v-model="fd.password" type="password" id="password" required>
            <br>
            <template v-if="router.currentRoute.value.name === 'Register'">
                <br>
                <label for="passwordConfirm">Confirm Password</label>
                <br>
                <input v-model="fd.passwordConfirm" type="password" id="passwordConfirm" required>
                <br>
                <br>
                <label for="name">Name:</label>
                <br>
                <input v-model="fd.name" type="text" id="name" required>
                <br>
                <br>
                <label for="reasonNeeded">Reason account needed:</label>
                <br>
                <!-- @vue-ignore -->
                <textarea v-model="fd.reasonNeeded" name="reasonNeeded" id="reasonNeeded" cols="38" rows="10" placeholder="Due to the cost of using the FlightAware AeroAPI, all accounts must be approved. Optional but encouraged."></textarea>
            </template>
            <br>
            <button type="submit">{{ router.currentRoute.value.name }}</button>
        </form>
        <br>
        <RouterLink v-if="router.currentRoute.value.name === 'Login'" to="/register" class="routerLink" @click="am.message = ''">Need to register?</RouterLink>
        <RouterLink v-if="router.currentRoute.value.name === 'Register'" to="/login" class="routerLink" @click="am.message = ''">Return to login.</RouterLink>
        <div v-if="am.message" id="authMessage">{{ am.message }}</div>
    </div>

    <div id="github">
        <a href="https://github.com/taylorsreid/lani">
            <img src="../assets/GitHub_Logo.png" alt="">
        </a>
    </div>
        
</template>

<style scoped>
    #container {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 2.5%;
      border-radius: 1rem;
    }

    label, input {
        font-size: x-large;      
    }

    input {
        border: 1px solid black;
    }

    button {
        width: 100%;
        height: 2rem;
        background-color: skyblue;
        border: 0;
        border-radius: 1rem;
    }

    #authMessage {
        margin-top: 1rem;
        padding: 1rem;
        background-color: v-bind('am.color');
        border-radius: 1rem;
        text-align: center;
    }

    #github {
        position: absolute;
        bottom: 5%;
        left: 47%;
        div {
            margin-top: 7rem;
        }
    }

</style>