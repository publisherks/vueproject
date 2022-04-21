<template>
    <div id="wrap">
        <router-view />
    </div>
</template>

<script setup>
    import { reactive, watch, nextTick } from "vue";

    const setup = reactive({
        theme: "default"
    });

    watch(() => setup.theme, (value) => {
        nextTick(() => {
            document.querySelector("html").setAttribute("data-theme", value);
        });
    }, {
        immediate: true,
    });
</script>
