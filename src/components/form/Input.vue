<template>
    <div
        class="input-box"
        :class="{ disabled : props.disabled }"
    >
        <input
            :type="props.type"
            :style="{
                'padding-right' : setup.padding
            }"
            :placeholder="props.placeholder"
            :disabled="props.disabled"
            :value="props.value"
            @input="setting($event.target.value.trim())"
        >
        <span
            class="text"
            v-if="props.text">
            {{ props.text }}
        </span>
        <a
            v-if="props.disabled !== true && setup.input !== ''"
            :class="props.iconType"
            :style="{
                'right' : setup.right
            }"
            @click="setting('')"
        ></a>
    </div>
</template>

<script setup>
    import { reactive , defineProps , watch } from "vue";

    const props = defineProps({
        placeholder : {
            type : String,
            default : "입력하세요."
        },
        type        : {
            type : String,
            default : "text",
        },
        text        : {
            type : String,
            default : "",
        },
        disabled    : {
            type : Boolean,
            default : false,
        },
        value       : {
            default : "",
        },
        iconType    : {
            type : String,
            default : "del"
        }
    });

    const setup = reactive({
        padding : "",
        right : "",
        input : "",
    });

    const emit = defineEmit(["update:value"]);

    const setting = (value) => {

        setup.input = value;

        emit('update:value', value)
    }

    watch(() => props.text, (val) => {
        if (val) {
            setup.right = (val.length * 15 + 10) + "px";
            setup.padding = ((val.length * 15) + 30) + "px";
        } else {
            setup.right = "";
            setup.padding = "";
        }
    }, {
        deep      : true,
        immediate : true,
    });

    watch(() => props.value, (value) => {
        setup.input = value;
    }, {
        immediate: true,
    });

</script>
