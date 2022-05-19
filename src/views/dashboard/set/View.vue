<template>
    <div class="title-box mb-30">
        <h2 class="main-title">{{ props.title }}</h2>
        <btn-group 
            class="ml-15"
        >
            <btn
                text="저장"
                kind="main"
                iconCls="fas fa-save"
                @click="saveGrid()"
            />
        </btn-group>
    </div>
    <div class="grid-stack">
        <div
            class="grid-stack-item"
            v-for="({x, y, w, h, id, data} = {}) in setup.widgets"
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
                    :is="getWidget(data.type)"
                    :name="data.label"
                />
            </div>
        </div>
    </div>
</template>
<script setup>
    import { reactive, defineProps, onMounted, nextTick, watch } from "vue";
    import { GridStack } from "gridstack";
    import "gridstack/dist/h5/gridstack-dd-native";
    import { isEmpty } from "@/js/common/common";
    import { widgetList, widgetModify } from "@/js/api/widgetApi";
    import { setMessageModal } from "@/js/pattern/singleton/Modal";
    import { useRouter } from "vue-router";

    import Bar from "@/views/dashboard/widget/bar"
    import Line from "@/views/dashboard/widget/line"
    import Pie from "@/views/dashboard/widget/pie"

    const router = useRouter();

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
        },
        widgets: [],
    })

    onMounted(() => {
        widgetView();
    })

    const widgetView = async () => {

        const widgetRes = await widgetList();
        setup.widgets = widgetRes.data;
        nextTick(() => {
            initGridStack();
            gridDrag();
        });
    }

    const initGridStack = () => {
        setup.grids = GridStack.init(setup.gridOption);
        setup.grids.cellHeight(setup.grids.cellWidth());
    }

    const gridDrag = () => {
        setup.grids.on('dragstop resizestop', (event, el) => {
            let node = el.gridstackNode;
            let id = parseInt(el.getAttribute('id').substr(6)) - 1;
            Object.entries(node).forEach((el) => {
                let key = el[0],
                    value = el[1];
                if(Object.keys(setup.widgets[id]).includes(key)) {
                    setup.widgets[id][key] = el[1];
                }
            })
        })
    }

    const saveGrid = async () => {
        const widgetRes = await widgetList();
        let idx = [];
        setup.widgets.forEach((el, index) => { 
            widgetRes.data.forEach(() => { 
                if(setup.widgets[index].x !== widgetRes.data[index].x
                    || setup.widgets[index].y !== widgetRes.data[index].y
                    || setup.widgets[index].w !== widgetRes.data[index].w
                    || setup.widgets[index].h !== widgetRes.data[index].h
                ) {
                    idx.push(index);
                }
            })
        })

        idx = idx.filter((value, index) => idx.indexOf(value) === index);
        console.log("idx", idx)
        
        let response = "",
            message = "";

        idx.forEach(async (e) => {
            let no = e + 1;
            const request = {
                x: setup.widgets[e].x,
                y: setup.widgets[e].y,
                w: setup.widgets[e].w,
                h: setup.widgets[e].h
            }
            response = await widgetModify(no, request);
        })

        message = "저장 되었습니다.";
        
        messagePopup(message);
    }

    const messagePopup = (message) => {
        setMessageModal({
            status: true,
            message: message,
            callback: () => {
                router.push({
                    name: "Dashboard",
                });
            }
        });
    };

    const getWidget = (type) => {
        const TYPE = type === 'Bar' ? Bar : type === 'Line' ? Line : Pie;
        return TYPE;
    }
</script>

<style lang="sass" scoped>
@import "@/assets/scss/components/_gridstack.scss"
</style>
