<template>
    <div class="widget">
        <div class="top">
            {{ name }}
        </div>
        <div class="con">
            <div class="chart-box">
                <!-- <canvas ref="barChart"></canvas> -->
            </div>
        </div>
    </div>
</template>
<script setup>
    import { reactive, defineProps, onMounted, ref, nextTick, watch } from "vue";
    import { covidState, covidDecideState } from "@/js/api/covidApi";
    import Chart from 'chart.js/auto';
    import { state as layoutState } from "@/js/pattern/singleton/Layout";

    let chart = {};
    let color = {
        grid: layoutState.isTheme === "default" ? "#7f8185" : "#dedfe4",
    }

    const props = defineProps({
        name: {
            type: String,
            default: "",
        }
    });

    const setup = reactive({
        data: [],
    })

    const barChart = ref(null);

    onMounted(async () => {
        getData();
        nextTick(initChart);
    })

    const getData = async () => {
        const response = await covidState({
            params: {
                startCreateDt: $moment().format("20200101"),
                endCreateDt: $moment().format("YYYYMMDD")
            }
        });

        const res2 = await covidDecideState()

        console.log('covidDecideState ',res2?.data?.response);

        let totalDecideCnt = response?.data?.response?.body?.items?.item[0]?.decideCnt;
        let totalDeathCnt = response?.data?.response?.body?.items?.item[0]?.deathCnt;

        console.log('covidState ',response.data.response, totalDecideCnt, totalDeathCnt)

    }

    const initChart = () => {
        let data = {},
            option = {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: color['grid']
                        }
                    },
                    y: {
                        grid: {
                            color: color['grid'],
                            drawBorder: true
                        },
                        beginAtZero: true
                    }
                }
            };
        chart = new Chart(barChart.value, {
            data: {
                datasets: [
                    {

                    }
                ]
            },
            option: option,
            type: 'line'
        })
    }
</script>
