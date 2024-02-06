<script setup lang="ts">

import MainContent from './MainContent.vue';
import PocketBase from 'pocketbase'
import apiUrl from '../apiUrl';

const pb: PocketBase = new PocketBase(apiUrl)

const daily:string = await pb.collection('daily_requests_per_person').getFirstListItem('')
    .then((record) => { return record.total })
    .catch(() => { return 0 })

const weekly:string = await pb.collection('weekly_requests_per_person').getFirstListItem('')
    .then((record) => { return record.total })
    .catch(() => { return 0 })

const monthly:string = await pb.collection('monthly_requests_per_person').getFirstListItem('')
    .then((record) => { return record.total })
    .catch(() => { return 0 })

const total:string = await pb.collection('total_requests_per_person').getFirstListItem('')
    .then((record) => { return record.total })
    .catch(() => { return 0 })
</script>

<template>
    <h1 class="title">My Account</h1>
    <MainContent class="centeredText" width="fit-content">
        <table class="centeredText" id="resultsTable">
            <tr>
                <td>Name:</td>
                <td>{{ pb.authStore.model?.name }}</td>
            </tr>
            <tr>
                <td>Email:</td>
                <td>{{ pb.authStore.model?.email }}</td>
            </tr>
            <tr>
                <td>User Since:</td>
                <td>{{ new Date(pb.authStore.model?.created).toLocaleDateString() }}</td>
            </tr>
            <tr>
                <td>Requests today:</td>
                <td>{{ daily }}</td>
            </tr>
            <tr>
                <td>Requests this week:</td>
                <td>{{ weekly }}</td>
            </tr>
            <tr>
                <td>Requests this month:</td>
                <td>{{ monthly }}</td>
            </tr>
            <tr>
                <td>Total Requests:</td>
                <td>{{ total }}</td>
            </tr>
        </table>
    </MainContent>
</template>