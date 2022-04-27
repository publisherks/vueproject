<template>
    <div class="title-box mb-30">
        <h2 class="main-title">{{ props.title }}</h2>
    </div>
    <div class="grid-stack">
        <div
            class="grid-stack-item"
            v-for="({x, y, w, h} = {}, index) in setup.widgets"
            v-bind:key="`widgets${index}`"
            v-bind="{
                id: `widget${index}`,
                'gs-x': x,
                'gs-y': y,
                'gs-w': w,
                'gs-h': h
            }"
        >
            <div class="grid-stack-item-content box">
                item {{index}}
            </div>
        </div>
    </div>
</template>
<script setup>
    import { reactive, defineProps, onMounted, nextTick } from "vue";
    import { GridStack } from "gridstack";
    import "gridstack/dist/h5/gridstack-dd-native";
    import { widgetList } from "@/js/api/widgetApi";

    const props = defineProps({
        title: {
            type: String,
            default: "",
        }
    });

    const setup = reactive({
        grids: undefined,
        gridOption: {
            column: 12,
            float: true,
            disableResize: true,
            disableDrag:true,
        },
        widgets: []
    })

    onMounted(() => {
        widgetView();
    })

    const widgetView = async () => {

        const widgetRes = await widgetList();
        setup.widgets = widgetRes.data;
        nextTick(() => {
            initGridStack();
        });
    }

    const initGridStack = () => {
        setup.grids = GridStack.init(setup.gridOption);
        setup.grids.cellHeight(setup.grids.cellWidth());
    }
</script>

<style lang="sass" scoped>
@import "@/assets/scss/components/_gridstack.scss"
</style>
