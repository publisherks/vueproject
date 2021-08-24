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
            @input="$emit('update:value', $event.target.value)"
        >
        </textarea>
    </div>
</template>

<script setup>
    import { defineProps, defineEmit } from "vue";

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

    const emit = defineEmit(["update:value"]);
</script>
