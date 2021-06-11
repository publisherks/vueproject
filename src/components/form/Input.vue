<template>
    <div
        class="input-box"
        :class="{ disabled: $attrs.readonly }"
        v-bind="props.boxAttr">
        <!-- {{ $attrs }} -->
        <input
            :ref="el => setRef(el)"
            v-bind="{
                type: $attrs.type === 'number' ? 'text' : $attrs.type,
                placeholder: $attrs.placeholder,
                maxlength: $attrs.maxlength,
                required: $attrs.required,
                oninvalid: $attrs.oninvalid,
                pattern: $attrs.pattern,
                readonly: $attrs.readonly,
                autocomplete: $attrs.autocomplete,
                value: $attrs.type === 'number' ? comma(setup.input) : setup.input 
            }"
            oninput="setCustomValidity('')"
            :style="{
                'padding-right': setup.padding
            }"
            @input="inputEvent($event,$attrs)"
        />
        <span
            class="text"
            v-if="props.text">
            {{ props.text }}
        </span>
        <a
            href="#"
            class="del"
            tabindex="-1"
            :style="{
                right: setup.right
            }"
            @click="
                $emit('update', '');
                $event.target.previousElementSibling.focus();
            "
            v-if="$attrs.value && !$attrs.readonly"
        ></a>
    </div>
</template>

<script setup>
    // import { focusRef } from "@/js/parttern/singleton/Focus";
    import { reactive, defineProps, watch, defineEmit } from "vue";

    
    const emit = defineEmit(["update"]);
    const props = defineProps({
        text: {
            type: String,
            default: ""
        },
        focus: {
            type: Number
        },
        boxAttr: {
            type: Object,
        },
        value: {}
    });

    const setup = reactive({
        padding: "",
        right: "",
        input: ""
    });

    const setRef = el => {
        if (!props.focus) {
            return null;
        }
        // focusRef[props.focus] = el;
    };

    const inputEvent = (event,attrs) => {

        setup.input = event.target.value;

        if(attrs.type === "number") {
            setup.input = comma(uncomma(setup.input));
            return emit("update", uncomma(setup.input)); 
        }

        emit("update", setup.input);
    };

    const uncomma = (str) => {
        str = String(str);
        if(str.includes(".")) {
            // 소수점 1000 단위 Comma -> 1,000.256656
            str = str.split(".");
            str[0] = str[0].replace(/[^\d]+/g, "");
            return str.join("."); 
        } else {
            // 1000 단위 Comma -> 1,000
            return str.replace(/[^\d]+/g, "");
        }
    };

    const comma = (str) => {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    };

    watch(() => props.value, value => {
        setup.input = value;
    },{
        immediate: true,
    });
    
    watch(
        () => props.text,
        val => {
            if (val) {
                setup.right = val.length * 15 + 10 + "px";
                setup.padding = val.length * 15 + 30 + "px";
            } else {
                setup.right = "";
                setup.padding = "";
            }
        },
        {
            deep: true,
            immediate: true
        }
    );
</script>
