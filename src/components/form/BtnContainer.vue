<template>
    <div
        class="btn-box"
        :class="{
            'ml-auto' : props.align === 'right',
            'mr-auto' : props.align === 'left',
            'flex-c' : props.align === 'center',
        }"
    >
        <slot />
    </div>
</template>
<script setup>
    import { defineProps } from "vue";

    const props = defineProps({
        // 버튼 좌우 여부
        align: {
            type: String,
            default: "",
        }
    });
</script>
