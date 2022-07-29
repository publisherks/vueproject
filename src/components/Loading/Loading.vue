<template>
    <div class="loading-box"
        :class="{ fixed: props.fixed }"
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
const props = defineProps({
    fixed: {
        type: Boolean,
        default () {
            return false;
        }
    }
})
</script>