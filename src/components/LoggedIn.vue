<script setup lang="ts">
import { useFlightsStore } from '../stores';
import { Flight } from "../../types";

const flightsStore = useFlightsStore()
await flightsStore.callApi()

import { storeToRefs } from 'pinia'
// @ts-ignore
const { apiResponse, hideLanded, sortBy } = storeToRefs(flightsStore)

const emit = defineEmits(['logoutClick'])

function getVarianceStyle(flight:Flight): string {
    const varianceInMinutes = getVarianceInMinutes(flight)
    if (varianceInMinutes < 5 || isNaN(varianceInMinutes)) {
        return 'background-color: #129e00; color: white' // green
    }
    else if (varianceInMinutes >= 5 && varianceInMinutes <= 15) {
        return 'background-color: #c5b100; color: white' // yellow
    }
    else {
        return 'background-color: #c50000; color: white' // red
    }
}

function getStatusStyle(flight:Flight) {
    if(flight.actual_on) {
        return 'background-color: #0026ff; color: white' //blue
    }
    else {
        return 'background-color: #129e00; color: white' // green
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

    <button @click="emit('logoutClick')" class="absoluteTopRight">Logout</button>

    <h1 style="text-align: center;">Lani - Active Flights</h1>

    <hr>
    
    <div class="centeredInPage">

        <button @click="flightsStore.callApi()">Refresh</button>
        
        <label for="sortBy">Sort By </label>
        <select id="sortBy" v-model="sortBy">
            <option value="eta" selected>ETA</option>
            <option value="origin">Origin</option>
            <option value="flight">Flight</option>
        </select>
        |
        <label for="hideLanded">Hide Landed</label>
        <input type="checkbox" id="hideLanded" v-model="hideLanded" checked>

        <table>
            <tr>
                <th>Flight</th>
                <th>Origin</th>
                <th>ETA</th>
                <th>Variance</th>
                <th>Status</th>
            </tr>
            <tr v-for="(e, i) in flightsStore.filteredSortedFlights" :key="i">

                <td>{{ e.ident_iata }}</td>

                <td>{{ e.origin.name }}</td>

                <td>
                    <span v-if="e.predicted_on">{{ new Date(e.predicted_on).toTimeString().substring(0, 5) }}</span>
                </td>

                <td :style="getVarianceStyle(e)">
                    <span>{{ getVarianceInMinutes(e) }}</span>
                </td>

                <td :style="getStatusStyle(e)">
                    <span v-if="e.actual_on">
                        Landed @ {{ new Date(e.actual_on).toTimeString().substring(0, 5) }}
                    </span>
                    <span v-else>
                        Active
                    </span>
                </td>

            </tr>
        </table>
    </div>
</template>