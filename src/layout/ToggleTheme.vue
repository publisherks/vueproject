<template>
    <div class="toggle-box ml-auto">
        <input 
            type="checkbox" 
            id="themeInput"
            :checked="layoutState.isTheme === 'default'"
            @change="toggle(layoutState.isTheme)"
        />
        <label for="themeInput">
            <div class="handle"></div>
        </label>
    </div>
</template>

<script setup>
    import { watch, nextTick } from "vue";
    import { state as layoutState, setIsTheme } from "@/js/pattern/singleton/Layout";

    const toggle = (theme) => {
        setIsTheme(theme === 'default' ? 'light' : 'default')
    }

    watch(() => layoutState.isTheme, (value) => {
        nextTick(() => {
            document.querySelector("html").setAttribute("data-theme", value);
        });
    }, {
        immediate: true,
    });
</script>
