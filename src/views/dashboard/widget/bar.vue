<template>
    <div class="widget">
        <div class="top">
            {{ name }}
        </div>
        <div class="con">
            <div class="chart-box">
                <canvas ref="barChart"></canvas>
            </div>
        </div>
        <div class="bot">
            <tab-btn
                :datas="setup.tabDatas"
                :value="setup.term.value"
                v-model:value="setup.term"
            />
        </div>
    </div>
</template>
<script setup>
    import { reactive, defineProps, onMounted, ref, nextTick, watch } from "vue";
    import { covidSidoInfState, covidDecideState } from "@/js/api/covidApi";
    import Chart from 'chart.js/auto';
    import { state as layoutState } from "@/js/pattern/singleton/Layout";
    import { hexToRgb, isEmpty } from "@/js/common/common";
    
    let chart = {};
    let color = {
        grid: layoutState.isTheme === "default" ? "#ffffff" : "#000000",
    }

    const props = defineProps({
        name: {
            type: String,
            default: "",
        }
    });

    const setup = reactive({
        data: [],
        chartData: [],
        setInterval: "",
        tabDatas: [
            {
                text: "전체",
                value: 1,
                kind: "sub1",
            },
            {
                text: "최근7일",
                value: 2,
                kind: "sub1",
            },
            {
                text: "오늘",
                value: 3,
                kind: "sub1",
            }
        ],
        term: {
            text: "전체",
            value: 1,
            kind: "sub1",
        },
    })

    // const barChart = ref(null);

    onMounted(async () => {
        getData();
        // setup.setInterval = setInterval(async () => {
        //     await getData();
        // }, 600000);
        nextTick(() => {
            initChart()
        });
    })

    const getData = async () => {
        const request = {
            params: {
                startCreateDt: $moment().format("YYYYMMDD"),
                endCreateDt: $moment().format("YYYYMMDD")
            }
        }

        const res = await covidSidoInfState(request);

        if (res.data.response.header.resultCode !== '00') {
            clearInterval(setup.setInterval);
        }

        console.log(res);

        let items = Object.values(res.data.response.body.items.item.reverse());

        if (isEmpty(setup.data)) {
        }
    }

    const initChart = () => {
    }
</script>
