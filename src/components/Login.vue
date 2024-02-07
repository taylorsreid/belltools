<script setup lang="ts">
defineProps({
    errorMessage: String
})

import { Ref, ref } from 'vue';
const email:Ref<string> = ref('')
const password:Ref<string> = ref('')

const emit = defineEmits(['loginAttempt'])
</script>

<template>
    <h1 class="title">Lani</h1>
    
    <div id="container">
        <form @submit="(e) => {e.preventDefault(); emit('loginAttempt', email, password)} ">
            <label for="email">Email:</label>
            <br>
            <input v-model="email" type="email" id="email">
            <br>
            <br>
            <label for="password">Password:</label>
            <br>
            <input v-model="password" type="password" id="password">
            <br>
            <br>
            <button type="submit">Login</button>
        </form>
        <div v-if="errorMessage !== ''" id="errorMessage">{{ errorMessage }}</div>
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

    #errorMessage {
        margin-top: 1rem;
        padding: 1rem;
        background-color: red;
        border-radius: 1rem;
        text-align: center;
    }

    #github {
        position: absolute;
        top: 80%;
        left: 47%;
        div {
            margin-top: 7rem;
        }
    }
    
</style>