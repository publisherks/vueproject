<template>
    <div class="chart-box">
        <canvas ref="barChart"></canvas>
    </div>
</template>

<script setup>
    import { reactive, defineProps, onMounted, ref, nextTick, watch, computed } from "vue";
    import Chart from 'chart.js/auto';
    import ChartDataLabels from 'chartjs-plugin-datalabels';
    import { state as layoutState } from "@/js/pattern/singleton/Layout";
    import { hexToRgb, isEmpty, getRandomColor } from "@/js/common/common";

    let chart = {};
    let color = {
        grid: layoutState.isTheme === "default" ? "#ffffff" : "#000000",
        tick: layoutState.isTheme === "default" ? "#9d98a4" : "#706c75",
        bar1: getRandomColor('#0000FF', 10),
        bar2: getRandomColor('#FF0000', 10),
        bar3: getRandomColor('#3CB371', 10),
    }

    const props = defineProps({
        datas: {
            type: Array,
            default() {
                return [];
            },
        },
        totalValue: Number,
        type: Number,
    });

    const TYPE = computed(() => {
        let type = '';
        switch(props.type) {
            case 1:
                type = "defCnt";
                break;
            case 2:
                type = "deathCnt";
                break;
            case 3 :
                type = "isolClearCnt";
                break;
        }

        return type;
    })

    const setup = reactive({
        maxValue: computed(() => Math.ceil((Math.round(Math.max.apply(null, Object.values(props.datas).map(i => i[TYPE.value])) * 1.1) / 100)) * 100)
    })

    const barChart = ref(null);

    onMounted(() => {
        nextTick(initChart);
    })

    const initChart = () => {
        let option = {
            maintainAspectRatio: false,
            responsive: true,
            indexAxis: 'y',
            plugins: {
                legend: false,
                tooltip: false,
                datalabels: {
                    align: "end",
                    anchor: "end",
                    color: color.tick,
                    padding: {
                        left: 15
                    },
                    formatter: (value, context) => {
                        let percent = "";
                        if ( isEmpty(value) === false && isEmpty(props.totalValue) === false) {
                            percent = `(${(value / props.totalValue * 100).toFixed(1)}%)`;
                        }
                        return `${value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${percent}`;
                    }
                }
            },
            layout: {
                padding: {
                    right: 50
                }
            },
            scales: {
                x: {
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
                            for (let i = 0; i < Math.round(val).toString().length; i++) {
                                if ( i < 3 && i > 1 ) {
                                    result = val.toString().substring(0, 1) + '백';
                                } else if ( i === 3 ) {
                                    if ( val.toString().substring(1, i-1) === "5") {
                                        result = val.toString().substring(0, i-2) + "천" + val.toString().substring(1, i-1) + '백';
                                    } else {
                                        result = val.toString().substring(0, i-2) + '천';
                                    }
                                } else if ( i > 3) {
                                    if ( val.toString().substring(1, i-2) === "5") {
                                        result = val.toString().substring(0, i-3) + "." + val.toString().substring(1, i-2) + '만';
                                    } else {
                                        result = val.toString().substring(0, i-3) + '만';
                                    }
                                } else {
                                    result = val;
                                }
                            }
                            
                            return result;
                        }
                    },
                    barPercentage: 0.8,
                    categoryPercentage: 1,
                    min: 0,
                },
                y: {
                    grid: {
                        display: false,
                        borderColor: `rgba(${hexToRgb(color.grid)}, .1)`,
                    },
                    ticks: {
                        font: {
                            size: 11,
                            weight: 'bold',
                            color: color.tick,
                        },
                    },
                }
            },
        }
        chart = new Chart(barChart.value, {
            data: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        borderWidth: 0,
                        backgroundColor: color.bar1,
                    },
                ],
            },
            options: option,
            plugins: [ChartDataLabels],
            type: 'bar'
        })
    }

    const updateChart = (type) => {
        if (isEmpty(chart) === true) {
            return ;
        }

        chart.data.labels = [];
        chart.data.datasets.map((i) => i.data = []);

        // eslint-disable-next-line vue/no-mutating-props
        props?.datas?.sort((a, b) => a[type] > b[type] ? -1 : a[type] < b[type] ? 1 : 0).map(item => {
            if (isEmpty(item) === true) {
                return ;
            }

            chart.data.labels.push(item.gubun)

            chart.data.datasets.map((i) => {
                i.data.push(item[type])
            })
        });

        chart.options.scales.x.max = setup.maxValue === 0 ? 1 : setup.maxValue;

        chart.update();
    }

    watch(() => props.datas, (val, oldVal) => {
        if (val === oldVal) {
            return;
        }

        updateChart(TYPE.value);
    },{
        deep: true
    });

    watch(() => TYPE, (val) => {
        let barColor = '';
        if ( val.value === "defCnt" ) {
            console.log(val.value, color.bar1);
            barColor = color.bar1;
        } else if ( val.value === "deathCnt" ) {
        console.log(val.value, color.bar2);
            barColor = color.bar2;
        } else if ( val.value === "isolClearCnt" ) {
        console.log(val.value, color.bar3);
            barColor = color.bar3;
        }
        chart.data.datasets.map((i) => {
            i.backgroundColor = barColor;
        });
        console.log(val.value, color.bar2);
        nextTick(() => {
            updateChart(TYPE.value);
        });
    },{
        deep: true
    });

    watch(() => layoutState.isTheme, (val) => {
        chart.destroy();
        color.grid = val === "default" ? "#ffffff" : "#000000";
        nextTick(() => {
            initChart()
            updateChart(TYPE.value);
        });
    })
</script>
