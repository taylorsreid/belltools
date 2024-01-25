<script setup lang="ts">
import { Ref, ref } from 'vue';
const email:Ref<string> = ref('')
const password:Ref<string> = ref('')

const emit = defineEmits(['loginAttempt'])
</script>

<template>
    <div class="centeredInPage">
        <form @submit="(e) => {e.preventDefault(); emit('loginAttempt', email, password)} ">

            <table>
                <tr>
                    <td>
                        <label for="email">Email</label>
                    </td>
                    <td>
                        <input v-model="email" type="email" id="email">
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="password">Password</label>
                    </td>
                    <td>
                        <input v-model="password" type="password" id="password">
                    </td>
                </tr>
            </table>

            <button type="submit">Login</button>

        </form>
    </div>
</template>