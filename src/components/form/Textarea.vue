<template>
    <div class="text-area">
        <textarea
            :placeholder="props.placeholder"
            :maxlength="maxlength"
            :value="props.value"
            :disabled="props.disabled"
            :class="{
                'cursor-d' : props.disabled
            }"
        >
        </textarea>
    </div>
</template>

<script setup>
    import { defineProps } from "vue";

    const props = defineProps({
        placeholder: {
            type: String,
            default: ""
        },
        maxlength: {
            type: Number
        },
        value: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        },
    });
</script>
