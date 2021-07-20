<template>
    <router-view/>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
    console.log(process.env)
})
</script>

<style lang="scss">
    @import "@/assets/scss/main.scss";
</style>
