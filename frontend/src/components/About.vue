<script setup lang="ts">
import MainContent from './MainContent.vue';
</script>

<template>
    <h1 class="title">About</h1>
    <MainContent class="centered" width="fit-content">
        
        <h2 id="what">What</h2>
        <ul>
            <li>Lani is a simple dashboard for tracking arriving flights into Honolulu.</li>
        </ul>
        <hr>
        <h2 id="why">Why</h2>
        <ul>
            <li>Lani was created to assist in predicting tourist arrivals to hotels and to estimate the remaining work for the day.</li>
        </ul>
        <hr>
        <h2 id="who">Who</h2>
        <ul>
            <li>Created in 2024 by Taylor Reid for Hawaii&#39;s hotel workers.</li>
        </ul>
        <hr>
        <h2 id="where">Where</h2>
        <ul>
            <li>
                Made in Hawaii for Hawaii
                <br>
                <img src="../assets/Flag_of_Hawaii.svg" alt="Hawaii">
            </li>
        </ul>
        <hr>
        <h2 id="how">How</h2>
        <ul>
            <li><a href="https://www.flightaware.com/commercial/aeroapi/">FlightAware AeroAPI</a></li>
            <li><a href="https://github.com/docker">Docker</a></li>
            <li><a href="https://github.com/nginx/nginx">Nginx</a></li>
            <li><a href="https://github.com/pocketbase/pocketbase">Pocketbase</a></li>
            <li><a href="https://github.com/vuejs/core">Vue</a></li>
            <li><a href="https://github.com/vuejs/pinia">Pinia</a></li>
            <li><a href="https://github.com/prazdevs/pinia-plugin-persistedstate">pinia-plugin-persistedstate</a></li>
            <li><a href="https://github.com/microsoft/TypeScript">TypeScript</a></li>
        </ul>

    </MainContent>
</template>

<style scoped>
    li {
        margin-top: 1rem;
    }
</style>