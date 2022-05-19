<template>
    <div class="widget">
        <div class="top">
            {{ name }}
        </div>
        <div class="con">
            <div class="chart-box">
                <!-- <canvas ref="pieChart"></canvas> -->
            </div>
        </div>
    </div>
</template>
<script setup>
    import { reactive, defineProps, onMounted, ref, nextTick, watch } from "vue";
    import { covidSidoInfState, covidDecideState } from "@/js/api/covidApi";
    import Chart from 'chart.js/auto';
    import { state as layoutState } from "@/js/pattern/singleton/Layout";
    
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
    })

    // const pieChart = ref(null);

    onMounted(async () => {
        // getData();
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
