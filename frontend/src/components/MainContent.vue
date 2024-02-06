<script setup lang="ts">
    defineProps({
        class: String
    })
</script>

<template>
    <br>
    <br>
    <div :class="class" id="resultsBackground">
        <slot />
    </div>
</template>

<style scoped>
    #resultsBackground {
        background-color: white;
        width: 80%;
        border-radius: 40px;
        padding: 1%;
    }
</style>