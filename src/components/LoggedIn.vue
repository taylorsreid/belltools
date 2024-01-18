<script setup lang="ts">
import { useFlightsStore } from '../stores';
const flightsStore = useFlightsStore()
await flightsStore.callApi()

import { storeToRefs } from 'pinia'
// @ts-ignore
const { apiResponse, hideScheduled, hideLanded, hideCancelled, sortBy } = storeToRefs(flightsStore)

const emit = defineEmits(['logoutClick'])

function getDelayStyle(delayInMinutes: number): string {
    if (delayInMinutes <= 0 || isNaN(delayInMinutes)) {
        return 'background-color: #129e00; color: white' // green
    }
    else if (delayInMinutes > 0 && delayInMinutes <= 15) {
        return 'background-color: #c5b100; color: white' // yellow
    }
    else {
        return 'background-color: #c50000; color: white' // red
    }
}

// disabled for now due to large paginated responses
function getStatusStyle(status: string) {
    switch (status) {
        case 'active':
            return 'background-color: #0026ff; color: white' //blue
        case 'landed':
            return 'background-color: #129e00; color: white' // green
        default:
            return 'background-color: #c50000; color: white' // red
    }
}
</script>

<template>

    <button @click="emit('logoutClick')" class="absoluteTopRight">Logout</button>

    <h1 style="text-align: center;">Lani - Active Flights</h1>

    <hr>
    
    <div class="centeredInPage">
        <label for="sortBy">Sort By </label>
        <select id="sortBy" v-model="sortBy">
            <option value="eta" selected>ETA</option>
            <option value="origin">Origin</option>
            <option value="airline">Airline</option>
        </select>
        |
        <label for="hideScheduled">Hide Scheduled</label>
        <input type="checkbox" id="hideScheduled" v-model="hideScheduled" checked>
        |
        <label for="hideLanded">Hide Landed</label>
        <input type="checkbox" id="hideLanded" v-model="hideLanded" checked>
        |
        <label for="hideCancelled">Hide Cancelled</label>
        <input type="checkbox" id="hideCancelled" v-model="hideCancelled" checked>

        <table>
            <tr>
                <th>Flight</th>
                <th>Origin</th>
                <th>Airline</th>
                <th>ETA</th>
                <th>Delay</th>
                <th>Status</th>
            </tr>
            <tr v-for="(e, i) in flightsStore.sortedFlights" :key="i">

                <td>{{ e.flight.iata }}</td>
                <td>{{ e.departure.airport }}</td>
                <td>{{ e.airline.name }}</td>
                <td>
                    <span v-if="e.flight_status !== 'landed'">{{ e.arrival.estimated.substring(11, 16) }}</span>
                    <!-- casting the string to a date causes Javascript to do an incorrect timezone conversion -->
                </td>
                <td :style="getDelayStyle(e.departure.delay)">
                    <span v-if="e.departure.delay">{{ e.departure.delay }}</span>
                    <span v-else>0</span>
                </td>
                <!-- disabled for now due to large paginated responses -->
                <!-- <td :style="getStatusStyle(e.flight_status)">
                    {{ e.flight_status }}
                    <span v-if="e.flight_status === 'landed'">
                        @ {{ e.arrival.actual.substring(11, 16) }}
                    </span>
                </td> -->

            </tr>
        </table>
    </div>
</template>