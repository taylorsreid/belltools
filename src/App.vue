<script setup lang="ts">
import PocketBase from 'pocketbase';
import { ComputedRef, Ref, computed, onBeforeMount, ref, watch } from 'vue';
import apiUrl from './apiUrl'
import { ApiResponse, Flight } from '../types';

const pb: PocketBase = new PocketBase(apiUrl);
const email: Ref<string> = ref('')
const password: Ref<string> = ref('')
const isLoggedIn: Ref<boolean> = ref(pb.authStore.isValid)
const name: Ref<string> = ref(localStorage.getItem('name') ?? '')
const hideScheduled: Ref<boolean> = ref(true)
const hideLanded: Ref<boolean> = ref(true)
const hideCancelled: Ref<boolean> = ref(true)
const sortBy: Ref<string> = ref('eta')
let apiResponse = ref() as Ref<ApiResponse>

let authData: any;

async function getApiResponse(): Promise<ApiResponse> {
    if (localStorage.getItem('apiResponse') !== null) {
        const a:ApiResponse = JSON.parse(localStorage.getItem('apiResponse')!)
        apiResponse.value = a
        return a
    }
    else {
        let results = await fetch(pb.buildUrl('api/flights'), {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + pb.authStore.token
            }
        })
        if (results.ok) {
            const response = await results.json()
            localStorage.setItem('apiResponse', JSON.stringify(response))
            apiResponse.value = response
            return response
        }
        else {
            throw new Error(await results.json());
        }
    }
}

async function login(e: Event) {
    e.preventDefault()
    authData = await pb.collection('users').authWithPassword(email.value, password.value);
    isLoggedIn.value = pb.authStore.isValid
    name.value = authData.record.name
    localStorage.setItem('name', authData.record.name)
}

function logout() {
    pb.authStore.clear()
    localStorage.clear()
}

const getFilteredSortedFlights:ComputedRef<Array<Flight>> = computed(() => {
    const filtered = apiResponse.value.data.filter((f:Flight) => {
        if (hideScheduled.value && hideLanded.value && hideCancelled.value) {
            return !(f.flight_status === 'scheduled' || f.flight_status === 'landed' || f.flight_status === 'cancelled')
        }
        if (hideScheduled.value && hideCancelled.value) {
            return !(f.flight_status === 'scheduled' || f.flight_status === 'cancelled')
        }
        if (hideLanded.value && hideCancelled.value) {
            return !(f.flight_status === 'landed' || f.flight_status === 'cancelled')
        }
        if (hideScheduled.value && hideLanded.value) {
            return !(f.flight_status === 'scheduled' || f.flight_status === 'landed')
        }
        if (hideScheduled.value) {
            return !(f.flight_status === 'scheduled')
        }
        if (hideLanded.value) {
            return !(f.flight_status === 'landed')
        }
        if (hideCancelled.value) {
            return !(f.flight_status === 'cancelled')
        }
        else {
            return true
        }
    })

    // return filtered
    const sorted = () => {
        switch (sortBy.value) {
            case 'origin':
                return filtered.sort((a, b) => { return a.departure.airport.localeCompare(b.departure.airport) })
            case 'airline':
                return filtered.sort((a, b) => { return a.airline.name.localeCompare(b.airline.name) })
            default: // ETA
                return filtered.sort((a, b) => { return new Date(a.arrival.estimated).getTime() - new Date(b.arrival.estimated).getTime() })
        }
    }
    return sorted()
})

onBeforeMount(async () => {
    if (isLoggedIn.value) {
        await getApiResponse()
        
    }
})

watch(isLoggedIn, async (newValue: boolean) => {
    if (newValue) {
        getApiResponse()
    }
})

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
    <button @click="logout">Logout</button>

    <h1>Lani - Flight Tracking</h1>

    <div v-if="isLoggedIn">

        <hr>

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
            <tr v-for="(e, i) in getFilteredSortedFlights" :key="i" >

                <td>{{ e.flight.iata }}</td>
                <td>{{ e.departure.airport }}</td>
                <td>{{ e.airline.name }}</td>
                <td>
                    <span v-if="e.flight_status !== 'landed'">{{ e.arrival.estimated.substring(11, 16) }}</span> <!-- casting the string to a date causes Javascript to do an incorrect timezone conversion -->
                </td>
                <td :style="getDelayStyle(e.departure.delay)">
                    <span v-if="e.departure.delay">{{ e.departure.delay }}</span>
                    <span v-else>0</span>
                </td>
                <td :style="getStatusStyle(e.flight_status)">
                    {{ e.flight_status }}
                    <span v-if="e.flight_status === 'landed'">
                        @ {{ e.arrival.actual.substring(11, 16) }}
                    </span>
                </td>
                
            </tr>
        </table>
    </div>

    <div v-else>
        <form @submit="login">

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