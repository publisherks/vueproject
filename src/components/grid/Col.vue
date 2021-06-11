<template>
    <div :class="type">
        <slot />
    </div>
</template>
<script setup>
    import { defineProps, computed } from "vue";

    const props = defineProps({
        cols: {
            type: String,
            default: "",
        }
    });

    const type = computed(() => { return props.cols ? `col-${props.cols}` : 'col'});
</script>
