<template>
    <div class="title-box mb-30">
        <h2 class="main-title">{{ props.title }}</h2>
    </div>
    <div class="grid-stack">
        <div
            class="grid-stack-item"
            v-for="({x, y, w, h, id, data}  = {}) in setup.widgets"
            v-bind:key="`widgets${id}`"
            v-bind="{
                id: `widget${id}`,
                'gs-x': x,
                'gs-y': y,
                'gs-w': w,
                'gs-h': h
            }"
        >
            <div class="grid-stack-item-content box">
                <component
                    :is="getWidget(id)"
                    :name="data.label"
                />
            </div>
        </div>
    </div>
</template>
<script setup>
    import { reactive, defineProps, onMounted, nextTick } from "vue";
    import { GridStack } from "gridstack";
    import "gridstack/dist/h5/gridstack-dd-native";

    import WidgetLine from "@/views/dashboard/widget/widget1"
    import WidgetBar from "@/views/dashboard/widget/widget2"
    import WidgetPie from "@/views/dashboard/widget/widget3"

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

    const getWidget = (id) => {
        let type;

        switch(id) {
            case 1:
                type = WidgetLine;
                break;
            case 2:
                type = WidgetBar;
                break;
            case 3:
                type = WidgetPie;
                break;
        }
        return type;
    }
</script>

<style lang="sass" scoped>
@import "@/assets/scss/components/_gridstack.scss"
</style>
