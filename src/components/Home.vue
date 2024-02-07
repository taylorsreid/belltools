<script setup lang="ts">
import { useFlightsStore } from '../stores';
import { Flight } from "../../types";

const flightsStore = useFlightsStore()
await flightsStore.callApi()

import { storeToRefs } from 'pinia'
import MainContent from './MainContent.vue';
import Layout from './Layout.vue';
// @ts-ignore
const { apiResponse, hideLanded, sortBy } = storeToRefs(flightsStore)

function getVarianceStyle(flight:Flight): string {
    const varianceInMinutes = getVarianceInMinutes(flight)
    if (varianceInMinutes <= 0 || isNaN(varianceInMinutes)) {
        return 'background-color: #0026ff; color: white' // green
    }
    else if (varianceInMinutes > 0 && varianceInMinutes <= 15) {
        return 'background-color: #c5b100; color: white' // yellow
    }
    else {
        return 'background-color: #c50000; color: white' // red
    }
}

function getStatusStyle(flight:Flight) {
    if(flight.actual_on) {
        return 'background-color: #129e00; color: white' // green
    }
    else {
        return 'background-color: #0026ff; color: white' //blue
    }
}

function getVarianceInMinutes(flight:Flight): number {
        if (flight.predicted_off && flight.actual_off) {
            return Math.round((new Date(flight.actual_off).getTime() - new Date(flight.predicted_off).getTime()) / 60000)
        }
        else {
            return 0
        }
    }
</script>

<template>
    <Layout>
        <h1 class="title">Arriving Flights</h1>

        <div class="centeredText">
            <button @click="flightsStore.callApi()">Refresh</button>
            <span style="padding: 5rem;">|</span>
            <label for="sortBy">Sort By </label>
            <select id="sortBy" v-model="sortBy">
                <option value="eta" selected>ETA</option>
                <option value="city">City</option>
                <option value="airport">Airport</option>
                <option value="flight">Flight</option>
            </select>
            <span style="padding: 5rem;">|</span>
            <label for="hideLanded">Hide Landed</label>
            <input type="checkbox" id="hideLanded" v-model="hideLanded">
        </div>

        <MainContent class="centeredText">
            <table class="centeredText" id="resultsTable">
                <tr>
                    <th>Flight</th>
                    <th>City</th>
                    <th>Airport</th>
                    <th>ETA</th>
                    <th>Status</th>
                    <th>Delay</th>
                </tr>
                <tr v-for="(e, i) in flightsStore.filteredSortedFlights" :key="i">

                    <td>{{ e.ident_iata }}</td>

                    <td>{{ e.origin.city }}</td>

                    <td>{{ e.origin.name }} </td>

                    <td>
                        <span v-if="e.predicted_on">{{ new Date(e.predicted_on).toTimeString().substring(0, 5) }}</span>
                    </td>

                    <td :style="getStatusStyle(e)">
                        <span v-if="e.actual_on">
                            Landed @ {{ new Date(e.actual_on).toTimeString().substring(0, 5) }}
                        </span>
                        <span v-else>
                            In Air
                        </span>
                    </td>

                    <td :style="getVarianceStyle(e)">
                        <span v-if="getVarianceInMinutes(e) > 0">{{ getVarianceInMinutes(e) }} minutes</span>
                        <span v-else>On Time</span>
                    </td>

                </tr>
            </table>
        </MainContent>
    </Layout>
</template>