<template>
    <div
        class="check-box"
        :class="{
            disabled: disabled,
            required: required,
            'w-100 h-100': pull
        }"
    >
        <label
            :class="{
                'w-100 h-100 flex-c': pull
            }"
        >
            <input
                type="checkbox"
                :disabled="disabled"
                :required="required"
                :checked="props.checked"
            />
            <i
                class="icon"
                :class="{
                    'mr-0': !props.label
                }"
            ></i>
            {{ props.label }}
        </label>
    </div>
</template>
<script setup>
    import { defineProps } from "vue";

    const props = defineProps({
        label: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        checked: {
            type: Boolean,
            default: false
        },
        pull: {
            type: Boolean,
            default: false
        }
    });
</script>
