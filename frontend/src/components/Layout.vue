<script setup lang="ts">
import { AuthModel } from 'pocketbase';
import { PropType } from 'vue';


defineProps({
    user: Object as PropType<AuthModel>
})

const emit = defineEmits({
    nav: String
})
</script>

<template>
    <ul class="navbar">
        <li><a href="#" @click="emit('nav', 'home')">Home</a></li>
        <li>&nbsp;</li>
        <li><a href="#" @click="emit('nav', 'about')">About</a></li>
        <li class="dropdown">
            <a class="dropbtn">{{ user?.name }}  &#9660;</a>
            <div class="dropdown-content">
                <a href="#" @click="emit('nav', 'account')">My Account</a>
                <a href="#" @click="emit('nav', 'logout')">Logout</a>
            </div>
        </li>
    </ul>

    <slot />
</template>

<style scoped>

.navbar {
    list-style-type: none;
    padding: 0;
    overflow: hidden;
    width: 90%;
    margin: auto;
    text-align: center;
    font-family: 'Poppins', sans-serif;
}

li {
    float: left;
}

li a, .dropbtn {
    display: inline-block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: x-large;
}

li.dropdown {
    float: right;
}

.dropdown-content a:hover {
    background-color: lightblue;
    border-radius: 10px;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border-radius: 10px;
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
}

.dropdown:hover .dropdown-content {
    display: block;
}
</style>