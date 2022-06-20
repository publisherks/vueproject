<template>
    <div class="chart-box">
        <canvas ref="polarChart"></canvas>
    </div>
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
        polar1: getRandomColor('#FF0000', 10),
        polar2: getRandomColor('#FFA500', 10),
        polar3: getRandomColor('#FFD700', 10),
        polar4: getRandomColor('#00FF00', 10),
        polar5: getRandomColor('#228B22', 10),
        polar6: getRandomColor('#ADD8E6', 10),
        polar7: getRandomColor('#0000FF', 10),
        polar8: getRandomColor('#800080', 10),
        polar9: getRandomColor('#FF00FF', 10),
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

    const setup = reactive({
        label: "",
    })

    const TYPE = computed(() => {
        let type = '';
        switch(props.type) {
            case 1:
                type = "confCase";
                break;
            case 2:
                type = "death";
                break;
            case 3 :
                type = "criticalRate";
                break;
        }

        return type;
    })

    const polarChart = ref(null);

    onMounted(() => {
        nextTick(initChart);
    });

    const initChart = () => {
        let option = {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                r: {
                    pointLabels: {
                        display: true,
                        centerPointLabels: true,
                        font: {
                            size: 14,
                            weight: 'bold',
                            color: color.tick,
                        },
                    },
                    grid: {
                        borderColor: `rgba(${hexToRgb(color.grid)}, .1)`,
                        color: `rgba(${hexToRgb(color.grid)}, .1)`,
                    },
                    ticks: {
                        backdropColor: 'rgba(0, 0, 0, 0)',
                        font: {
                            size: 12,
                            weight: 'bold',
                            color: color.tick,
                        },
                        callback: (value) => {
                            let result = "";
                            for (let i = 0; i < Math.round(value).toString().length; i++) {
                                if ( i < 3 && i > 1 ) {
                                    result = value.toString().substring(0, 1) + '백';
                                } else if ( i === 3 ) {
                                    if ( value.toString().substring(1, i-1) === "5") {
                                        result = value.toString().substring(0, i-2) + "천" + value.toString().substring(1, i-1) + '백';
                                    } else {
                                        result = value.toString().substring(0, i-2) + '천';
                                    }
                                } else if ( i > 3) {
                                    if ( value.toString().substring(1, i-2) === "5") {
                                        result = value.toString().substring(0, i-3) + "." + value.toString().substring(1, i-2) + '만';
                                    } else {
                                        result = value.toString().substring(0, i-3) + '만';
                                    }
                                } else {
                                    result = value;
                                }
                            }
                            
                            return result;
                        }
                    },
                }
            },
            plugins: {
                legend: false,
                tooltip: {
                    boxWidth: 6,
                    boxHeight: 6,
                    boxPadding: 3,
                    callbacks: {
                        label: (context) => {
                            let label = context.label || "";
                            let value = context.formattedValue || "";

                            if (label) {
                                label += ': ';
                            }

                            if (value) {
                                label += value + "명";
                            }

                            return label;
                        }
                    }
                },
            },
            layout: {
                padding: {
                    top: 20
                }
            },
        };
        chart = new Chart(polarChart.value, {
            data: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        borderWidth: 4,
                        backgroundColor: [ color.polar1, color.polar2, color.polar3, color.polar4, color.polar5, color.polar6, color.polar7, color.polar8, color.polar9 ],
                        borderColor: [ color.polar1, color.polar2, color.polar3, color.polar4, color.polar5, color.polar6, color.polar7, color.polar8, color.polar9 ],
                    },
                ],
            },
            options: option,
            plugins: [
                {
                    afterUpdate({data: chart = {}} = {}) {
                        if ( isEmpty(setup.label) === true) {
                            setup.label = getLabelHTML(chart.labels, chart.datasets);
                        }
                        console.log('afterUpdate ', setup.label)
                    },
                }
            ],
            type: "polarArea",
        });
    };

    const updateChart = (type) => {
        if (isEmpty(chart) === true) {
            return;
        }

        chart.data.labels = [];
        chart.data.datasets.map((i) => (i.data = []));

        props?.datas?.map((item) => {
            if (isEmpty(item) === true) {
                return;
            }

            let gubun = '';
            if ( item.gubun.substr(2, 1) === " ") {
                gubun = item.gubun.replace(" ", "대");
            } else if ( item.gubun.substr(2, 1) === "-") {
                gubun = item.gubun.split("-")[0] + "대";
            } else {
                gubun = item.gubun + "세";
            }

            chart.data.labels.push(gubun)

            chart.data.datasets.map((i) => {
                i.data.push(item[type])
            })
        });

        chart.update();
    };

    const getLabelHTML = (labels, datasets) => {
        return labels.map((item, index) => ({
            label : item,
            backgroundColor : datasets[0].backgroundColor[index],
            hidden : false,
        }));
    }

    const labelClickEvent = (item, index) => {
        chart.toggleDataVisibility(index)
        item.hidden = !chart.getDataVisibility(index);
        chart.update()
    }

    watch(() => props.datas, (val, oldVal) => {
        if (val === oldVal) {
            return;
        }
            updateChart(TYPE.value);
        },
        {
            deep: true,
        }
    );

    watch(() => layoutState.isTheme, (val) => {
        chart.destroy();
        color.grid = val === "default" ? "#ffffff" : "#000000";
        nextTick(() => {
            initChart()
            updateChart(TYPE.value);
        });
    })
</script>