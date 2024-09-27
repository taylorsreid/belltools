<script setup lang="ts">
import { computed, nextTick, ref, Ref, VNodeRef } from 'vue';
import Layout from './Layout.vue'
import MainContent from './MainContent.vue';

const totalCash: Ref<number> = ref(undefined!)
const numberCaptains: Ref<number> = ref(0)
const numberBellman: Ref<number> = ref(0)

const bellmanCut = computed(() => {
    return totalCash.value / (numberBellman.value + (1.5 * numberCaptains.value))
})

const captainCut = computed(() => {
    return 1.5 * bellmanCut.value
})

const carryover = computed(() => {
    return totalCash.value - ((numberCaptains.value * Math.floor(captainCut.value) + (numberBellman.value * Math.floor(bellmanCut.value))))
})

// auto focus on total cash input field
const totalCashElement: VNodeRef = ref()
nextTick(() => {
    totalCashElement.value.focus()
})

</script>

<template>
    <Layout>
        <h1>Cut Calculator</h1>
        <MainContent>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label for="totalCash">Total Cash</label>
                        </td>
                        <td>
                            $ <input type="number" id="totalCash" class="rightNumbers" step="1" min="0" v-model="totalCash" ref="totalCashElement" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="numberCaptains">Number of Captains</label>
                        </td>
                        <td>
                            &nbsp;&nbsp;&nbsp;<input type="number" id="numberCaptains" class="rightNumbers" step="1" min="0" v-model="numberCaptains" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="numberBellman">Number of Bellman</label>
                        </td>
                        <td>
                            &nbsp;&nbsp;&nbsp;<input type="number" id="numberBellman" class="rightNumbers" step="1" min="0" v-model="numberBellman" />
                        </td>
                    </tr>
                    <tr :hidden="isNaN(captainCut) || captainCut === Infinity || numberCaptains < 1">
                        <td>Captain's Cut</td>
                        <td>
                            $ <input type="number" disabled :value="Math.floor(captainCut)" />
                        </td>
                    </tr>
                    <tr :hidden="isNaN(bellmanCut) || bellmanCut === Infinity || numberBellman < 1">
                        <td>Bellman's Cut</td>
                        <td>
                            $ <input type="number" disabled :value="Math.floor(bellmanCut)" />
                        </td>
                    </tr>
                    <tr :hidden="isNaN(carryover) || carryover <= 0">
                        <td>Carryover</td>
                        <td>
                            $ <input type="number" disabled :value="carryover" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </MainContent>
    </Layout>
</template>

<style scoped>
input {
    text-align: right;
    width: 10em;
    color: black;
    size: 10%;
    background-color: white;
}
</style>