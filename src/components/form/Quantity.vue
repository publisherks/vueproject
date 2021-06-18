<template>
    <div class="input-box quantity">
        <a
            href="#"
            class="minus"
            v-on:click="setup.value <= 0 ? 0 : setup.value -= 1">
            <i class="fal fa-minus"></i>
        </a>
        <input
            type="number"
            :value="setup.value">
        <a
            href="#"
            class="plus"
            v-on:click="setup.value += 1">
            <i class="fal fa-plus"></i>
        </a>
    </div>
</template>

<script setup>
    import { reactive } from "vue";

    const setup = reactive({
        value : 0,
    });
</script>