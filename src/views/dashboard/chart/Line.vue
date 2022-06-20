<template>
    <div class="chart-legend">
        <p
         v-for="(item, index) in setup.label"
         :key="`label${index}`"
         @click="labelClickEvent(item, index)"
         :class="{hidden : item.hidden === true}"
        >
            <i :style="{ backgroundColor:item.backgroundColor }"></i>
            {{item.label}}
        </p>
    </div>
    <div class="chart-box">
        <canvas ref="lineChart"></canvas>
    </div>
</template>

<script setup>
    import { reactive, defineProps, onMounted, ref, nextTick, watch } from "vue";
    import Chart from 'chart.js/auto';
    import zoomPlugin from 'chartjs-plugin-zoom';
    import { state as layoutState } from "@/js/pattern/singleton/Layout";
    import { hexToRgb, isEmpty, getRandomColor } from "@/js/common/common";

    Chart.register(zoomPlugin);

    let chart = {};
    let color = {
        grid: layoutState.isTheme === "default" ? "#ffffff" : "#000000",
        tick: layoutState.isTheme === "default" ? "#9d98a4" : "#706c75",
        legend: layoutState.isTheme === "default" ? "#ffffff" : "#000000",
        line1: getRandomColor('#0000FF', 10),
        line2: getRandomColor('#FF0000', 10),
        line3: getRandomColor('#FF00FF', 10),
        line4: getRandomColor('#FFA500', 10),
    }

    const props = defineProps({
        datas: {
            type: Array,
            default() {
                return [];
            },
        },
    });

    const setup = reactive({
        click: 0,
        label: "",
    })

    const lineChart = ref(null);

    onMounted(() => {
        nextTick(initChart);
    });

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
                legend: false,
                tooltip: {
                    boxWidth: 6,
                    boxHeight: 6,
                    boxPadding: 3,
                },
                zoom: {
                    zoom: {
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
                                } else {
                                    result = val;
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
                        borderColor: color.line1,
                        backgroundColor: color.line1,
                        borderWidth: 4,
                        pointRadius: 0,
                        key: "decideCnt",
                        hidden: false,
                    },
                    {
                        label: "사망자 수",
                        data: [],
                        borderColor: color.line2,
                        backgroundColor: color.line2,
                        borderWidth: 4,
                        pointRadius: 0,
                        key: "deathCnt",
                        hidden: false,
                    },
                    {
                        label: "누적 확진자 수",
                        data: [],
                        borderColor: color.line3,
                        backgroundColor: color.line3,
                        borderWidth: 4,
                        pointRadius: 0,
                        key: "totalDecideCnt",
                        hidden: true,
                    },
                    {
                        label: "누적 사망자 수",
                        data: [],
                        borderColor: color.line4,
                        backgroundColor: color.line4,
                        borderWidth: 4,
                        pointRadius: 0,
                        key: "totalDeathCnt",
                        hidden: true,
                    }
                ]
            },
            options: option,
            plugins: [
                {
                    afterUpdate({data: chart = {}} = {}) {
                        if ( isEmpty(setup.label) === true) {
                            setup.label = getLabelHTML(chart.datasets);
                        }
                    },
                },
            ],
            type: 'line'
        })
    }

    const updateChart = () => {
        if (isEmpty(chart) === true) {
            return ;
        }

        chart.data.labels = [];
        chart.data.datasets.map((i) => i.data = []);

        props.datas.map((item, index) => {
            chart.data.labels.push(item.date)

            chart.data.datasets.map((i) => {
                if( i.key in item ) {
                    i.data.push(item[i.key])
                }
            })
        });

        chart.update();
    }

    const getLabelHTML = (datasets = []) => {
        return datasets.filter(({label} = {}) => (label !== {})).map(({backgroundColor, label, hidden}) => {
            return {
                backgroundColor : backgroundColor,
                label : label,
                hidden : hidden,
            }
        })
    }

    const labelClickEvent = (item, index) => {
        let meta = chart.getDatasetMeta(index)
        item.hidden = !item.hidden;
        meta.hidden = item.hidden
        chart.update()
    }

    watch(() => props.datas, (val, oldVal) => {
        if (val === oldVal) {
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