<template>
    <div :class="type">
        <slot />
    </div>
</template>
<script setup>
    import { computed, defineProps } from "vue";

    const props = defineProps({
        cols: {
            type: String,
            default: "",
        }
    });

    const type = computed(() => { return props.cols ? `row-cols-${props.cols}` : 'row'});
</script>
