<template>
    <div
        class="loading-box"
        v-show="state.loadingStatus"
    >
        <div class="loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>

<script setup>
    import { state } from "@/components/Loading/state";
</script>
