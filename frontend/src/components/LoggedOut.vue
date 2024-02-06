<script setup lang="ts">
import { Ref, ref } from 'vue';
const email:Ref<string> = ref('')
const password:Ref<string> = ref('')

const emit = defineEmits(['loginAttempt'])
</script>

<template>
    <form @submit="(e) => {e.preventDefault(); emit('loginAttempt', email, password)} ">
        <div><label for="email">Email</label></div>
        <div><input v-model="email" type="email" id="email"></div>
    
        <div><label for="password">Password</label></div>
        <div><input v-model="password" type="password" id="password"></div>
        <button type="submit">Login</button>
    </form>
</template>

<style scoped>
    form {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -50%);
    }
</style>