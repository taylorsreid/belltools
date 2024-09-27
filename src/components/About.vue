<script setup lang="ts">
import Layout from './Layout.vue';
import MainContent from './MainContent.vue';
</script>

<template>
    <Layout>
        <h1>About</h1>
        <MainContent>

            <h2 id="what">What</h2>
            <ul>
                <li>Lani is a simple dashboard for tracking arriving flights into Honolulu.</li>
            </ul>
            <hr>
            <h2 id="why">Why</h2>
            <ul>
                <li>Lani was created to assist in predicting tourist arrivals to hotels and to estimate the remaining work for the day for hotel arrival staff.</li>
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
            <p>A demonstration account is available to test the app. The email is "demouser@example.com" and the password is "password".</p>
            <p>Unfortunately due to the cost of using the FlightAware AeroAPI, the demo account is restricted to using static test data and will not give realtime flight information.</p>
            <p>If you would like a real account, please fill out the registration form on the website along with an explanation of need.</p>
            <ul>
                <li><a href="https://www.flightaware.com/commercial/aeroapi/">FlightAware AeroAPI</a></li>
                <li><a href="https://github.com/docker">Docker</a></li>
                <li><a href="https://github.com/nginx/nginx">Nginx</a></li>
                <li><a href="https://github.com/pocketbase/pocketbase">Pocketbase</a></li>
                <li><a href="https://github.com/vuejs/core">Vue</a></li>
                <li><a href="https://github.com/vuejs/router">Vue Router</a></li>
                <li><a href="https://github.com/vuejs/pinia">Pinia</a></li>
                <li><a href="https://github.com/prazdevs/pinia-plugin-persistedstate">pinia-plugin-persistedstate</a></li>
                <li><a href="https://github.com/microsoft/TypeScript">TypeScript</a></li>
            </ul>

        </MainContent>
    </Layout>
</template>

<style scoped>
li {
    margin-top: 1rem;
}
</style>