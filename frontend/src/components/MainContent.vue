<script setup lang="ts">
    defineProps({
        class: String,
        width: {
            type: String,
            default: '80%'
        }
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
        width: v-bind(width);
        border-radius: 40px;
        padding: 1%;
    }
</style>