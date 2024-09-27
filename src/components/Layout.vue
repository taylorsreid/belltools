<script setup lang="ts">
import PocketBase from 'pocketbase'
import apiUrl from '../apiUrl';
const pb = new PocketBase(apiUrl);

function logout() {
    pb.authStore.clear()
    localStorage.clear()
}
</script>

<template>
    <ul id="navbar">
        <li><RouterLink to="/flights" class="routerLink">Flights</RouterLink></li>
        <li><RouterLink to="/cut" class="routerLink">Cut</RouterLink></li>
        <li><RouterLink to="/about" class="routerLink">About</RouterLink></li>
        <li class="dropdown">
            <a class="dropbtn">{{ pb.authStore.model?.name }} &#9660;</a>
            <div class="dropdown-content">
                <RouterLink to="/account">My Account</RouterLink>
                <RouterLink to="/login" @click="logout">Logout</RouterLink>
            </div>
        </li>
    </ul>

    <slot />
</template>

<style scoped>
#navbar {
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

li, .dropbtn, .routerLink {
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
    border-radius: 10px;
}

.dropdown-content {
    display: none;
    position: absolute;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border-radius: 10px;
}

.dropdown-content a {
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
}

.dropdown:hover .dropdown-content {
    display: block;
}

a:visited {
    color: white;
}
</style>