<template>
    <div class="chart-box">
        <canvas ref="pieChart"></canvas>
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
    import Chart from "chart.js/auto";
    import ChartDataLabels from 'chartjs-plugin-datalabels';
    import { state as layoutState } from "@/js/pattern/singleton/Layout";
    import { hexToRgb, isEmpty, getRandomColor } from "@/js/common/common";

    let chart = {};
    let color = {
        tick: layoutState.isTheme === "default" ? "#ffffff" : "#706c75",
        pie1: getRandomColor("#0000FF", 10),
        pie2: getRandomColor("#ff0000", 10),
    };

    const props = defineProps({
        datas: {
            type: Array,
            default() {
                return [];
            },
        },
        type: Number,
    });

    const setup = reactive({
        label: "",
    })

    const TYPE = computed(() => {
        let type = "";
        switch (props.type) {
            case 1:
                type = "confCase";
                break;
            case 2:
                type = "death";
                break;
        }

        return type;
    });

    const pieChart = ref(null);

    onMounted(() => {
        nextTick(initChart);
    });

    const initChart = () => {
        let option = {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: false,
                tooltip: false,
                datalabels: {
                    align: "center",
                    anchor: "center",
                    textAlign: "center",
                    color: color.tick,
                    display: "auto",
                    formatter: (value, context) => {
                        let percent = props.datas[context.dataIndex][props.type === 1 ? "confCaseRate" : "deathRate"];
                        let label = `${context.chart.data.labels[context.dataIndex]}\n${value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} (${percent}%)`;
                        let meta = context.chart.getDatasetMeta(0).data[context.dataIndex];
                        return meta.hidden ? '' : label;
                    }
                }
            },
            layout: {
                padding: {
                    top: 20
                }
            },
        };
        chart = new Chart(pieChart.value, {
            data: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        borderWidth: 4,
                        borderColor: [ color.pie1, color.pie2 ],
                        backgroundColor: [ color.pie1, color.pie2 ],
                    },
                ],
            },
            options: option,
            plugins: [
                ChartDataLabels,
                {
                    afterUpdate({data: chart = {}} = {}) {
                        if ( isEmpty(setup.label) === true) {
                            setup.label = getLabelHTML(chart.labels, chart.datasets);
                        }
                    },
                },
            ],
            type: "pie",
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

            chart.data.labels.push(item.gubun)

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
        nextTick(() => {
            initChart()
            updateChart(TYPE.value);
        });
    })
</script>