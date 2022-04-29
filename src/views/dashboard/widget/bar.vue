<template>
    <div class="widget">
        <div class="top">
            {{ name }}
        </div>
    </div>
</template>
<script setup>
    import { reactive, defineProps, onMounted, nextTick, watch } from "vue";
    
    const props = defineProps({
        name: {
            type: String,
            default: "",
        }
    });
</script>
