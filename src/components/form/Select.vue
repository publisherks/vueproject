<template>
    <div class="input-box">
        <div
            class="select-input"
            :class="{ open : setup.isOpen }"
            v-on:click="setup.isOpen = !setup.isOpen; position($event)"
        >
            <input
                type="text"
                :value="setup.input"
                :placeholder="props.placeholder"
                readonly
            >
            <a
                class="icon"
                v-on:click="inputFocus($event)"
            ></a>
        </div>
        <div
            ref="selectItems"
            class="select-items"
            :class="{ top : setup.top === true }"
        >
            <ul>
                <li v-if="props.defaultValue.length !== 0">
                    <a
                        v-on:click="setup.isOpen = false; select(defaultValue)"
                    >
                        {{ props.defaultValue.text }}
                    </a>
                </li>
                <li
                    v-for="(item, index) in props.datas"
                    v-bind:key="`select${index}`"
                >
                    <a
                        v-on:click="setup.isOpen = false; select(item)"
                    >{{ item.text }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    import { reactive, defineEmits, defineProps, ref, nextTick, computed } from "vue";

    const props = defineProps({
        datas: {
            type: Array,
            default() {
                return [];
            }
        },
        value: {},
        isDefault : {
            type : Boolean,
            default : false,
        },
        defaultValue : {
            type: Array,
            default() {
                return [];
            }
        },
        placeholder : {
            type : String,
            default : "검색"
        }
    });
    
    const emit = defineEmits(["update"]);

    const setup = reactive({
        isOpen : false,
        top    : {
            type: Boolean,
            default : false
        },
        input  : computed(() => props.value?.text),
    });

    const inputFocus = (event) => {
        event.target.previousSibling.focus();
    };

    const select = (item) => {
        emit('update:value', item);
        setup.input = item.text;
    }

    const selectItems = ref(null);

    const position = (event) => {
        nextTick(() => {
            if(window.innerHeight - (event.target.getBoundingClientRect().top + event.target.getBoundingClientRect().height) < selectItems.value.getBoundingClientRect().height ) {
                setup.top = true;
            }
        });
    };
</script>

<style scoped>

</style>
