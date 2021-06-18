<template>
    <div
        class="btn-box"
        :class="{
            'align-r' : props.align === 'right',
            'align-l' : props.align === 'left',
            'align-c' : props.align === 'center',
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
