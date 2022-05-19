<template>
    <div class="widget">
        <div class="top">
            {{ name }}
        </div>
        <div class="con">
            <div class="chart-box">
                <canvas ref="lineChart"></canvas>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { reactive, defineProps, onMounted, ref, nextTick, watch } from "vue";
    import { covidInfState, covidDecideState } from "@/js/api/covidApi";
    import Chart from 'chart.js/auto';
    import zoomPlugin from 'chartjs-plugin-zoom';
    import { state as layoutState } from "@/js/pattern/singleton/Layout";
    import { hexToRgb, isEmpty, getRandomColor } from "@/js/common/common";

    Chart.register(zoomPlugin);

    let chart = {};
    let color = {
        grid: layoutState.isTheme === "default" ? "#ffffff" : "#000000",
        tick: layoutState.isTheme === "default" ? "#9d98a4" : "#706c75",
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
        click: 0,
    })

    const lineChart = ref(null);

    onMounted(async () => {
        getData();
        setup.setInterval = setInterval(async () => {
            await getData();
        }, 600000);
        nextTick(() => {
            initChart()
        });
    })

    const getData = async () => {
        const request = {
            params: {
                startCreateDt: $moment("20200101").format("YYYYMMDD"),
                endCreateDt: $moment().format("YYYYMMDD")
            }
        }

        const res = await covidInfState(request);

        // const res2 = await covidDecideState()

        if (res.data.response.header.resultCode !== '00') {
            clearInterval(setup.setInterval);
        }

        console.log(res);

        let items = Object.values(res.data.response.body.items.item.reverse());

        if (isEmpty(setup.data)) {
            setup.data = items.map((item, index, arr) => {
                return { 
                    date : $moment(item.createDt).format("YY/MM/DD"),
                    decideCnt : arr[index-1] ? item.decideCnt - arr[index-1].decideCnt : item.decideCnt,
                    deathCnt : arr[index-1] ? item.deathCnt - arr[index-1].deathCnt : item.deathCnt,
                    totalDecideCnt : item.decideCnt,
                    totalDeathCnt : item.deathCnt,
                };
            });
        }

        if (isEmpty(setup.chartData)) {            
            setup.chartData = [ ...setup.data ];
        } else {
            if ( Object.entries(setup.chartData).toString() !== Object.entries(setup.data).toString() ) {
                const result = setup.data.filter(i => !setup.chartData.includes(i));
                result.map((item) => {
                    setup.chartData.push(item);
                })
            }
        }
    }

    const initChart = () => {
        let option = {
            maintainAspectRatio: false,
            responsive: true,
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 12,
                        fontColor: color.tick,
                        lineWidth: 0,
                    }
                },
                zoom: {
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        drag: {
                            enabled: true,
                        },
                        mode: 'x',
                    },
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        borderColor: `rgba(${hexToRgb(color.grid)}, .1)`,
                    },
                    ticks: {
                        font: {
                            size: 12,
                            weight: 'bold',
                            color: color.tick,
                        },
                    },
                },
                y: {
                    grid: {
                        borderColor: `rgba(${hexToRgb(color.grid)}, .1)`,
                        color: `rgba(${hexToRgb(color.grid)}, .1)`,
                        drawBorder: true
                    },
                    beginAtZero: true,
                    ticks: {
                        font: {
                            size: 12,
                            weight: 'bold',
                            color: color.tick,
                        },
                        callback: (val) => {
                            let result = "";
                            for (let i = 0; i < val.toString().length; i++) {
                                if ( i === 3 ) {
                                    result = val.toString().substring(0, 1) + '천';
                                } else if ( i > 3) {
                                    result = val.toString().substring(0, i-3) + '만';
                                }
                            }
                            
                            return result;
                        }
                    },
                    min: 0,
                }
            },
            transitions: {
                zoom: {
                    animation: {
                        duration: 300,
                    },
                },
            },
            onClick() {
                setup.click += 1;

                setTimeout(() => {
                    if (setup.click > 1) {
                        chart.resetZoom();
                    }

                    setup.click = 0;
                }, 300);
            },
        };
        chart = new Chart(lineChart.value, {
            data: {
                labels: [],
                datasets: [
                    {
                        label: "확진자 수",
                        data: [],
                        borderColor: getRandomColor('#0000ff', 10),
                        backgroundColor: getRandomColor('#0000ff', 10),
                        pointRadius: 0,
                        key: "decideCnt",
                    },
                    {
                        label: "사망자 수",
                        data: [],
                        borderColor: getRandomColor('#ff0000', 10),
                        backgroundColor: getRandomColor('#ff0000', 10),
                        pointRadius: 0,
                        key: "deathCnt",
                    },
                    {
                        label: "누적 확진자 수",
                        data: [],
                        borderColor: getRandomColor('#FF00FF', 10),
                        backgroundColor: getRandomColor('#FF00FF', 10),
                        pointRadius: 0,
                        key: "totalDecideCnt",
                    },
                    {
                        label: "누적 사망자 수",
                        data: [],
                        borderColor: getRandomColor('#FFA500', 10),
                        backgroundColor: getRandomColor('#FFA500', 10),
                        pointRadius: 0,
                        key: "totalDeathCnt",
                    }
                ]
            },
            options: option,
            type: 'line'
        })
    }

    const updateChart = () => {
        if (isEmpty(chart) === true) {
            return ;
        }

        chart.data.labels = [];
        chart.data.datasets.map((i) => i.data = []);

        setup.chartData.map((item, index) => {
            chart.data.labels.push(item.date)

            chart.data.datasets.map((i) => {
                if( i.key in item ) {
                    i.data.push(item[i.key])
                }
            })
        });

        chart.update();
    }

    watch(() => setup.chartData, (val, oldVal) => {
        if (val === oldVal) {
            console.log('return');
            return;
        }

        updateChart();
    },{
        deep: true
    });

    watch(() => layoutState.isTheme, (val) => {
        chart.destroy();
        color.grid = val === "default" ? "#ffffff" : "#000000";
        nextTick(() => {
            initChart()
            updateChart();
        });
    })
</script>
