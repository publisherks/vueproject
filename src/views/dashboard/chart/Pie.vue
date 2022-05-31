<template>
    <div class="chart-box">
        <canvas ref="pieChart"></canvas>
    </div>
</template>

<script setup>
    import { reactive, defineProps, onMounted, ref, nextTick, watch, computed } from "vue";
    import Chart from 'chart.js/auto';
    import { state as layoutState } from "@/js/pattern/singleton/Layout";
    import { hexToRgb, isEmpty, getRandomColor } from "@/js/common/common";

    let chart = {};
    let color = {
        grid: layoutState.isTheme === "default" ? "#ffffff" : "#000000",
        tick: layoutState.isTheme === "default" ? "#9d98a4" : "#706c75",
        pie1: getRandomColor('#0000FF', 10),
        pie2: getRandomColor('#ff0000', 10),
    }

    const props = defineProps({
        datas: {
            type: Array,
            default() {
                return [];
            },
        },
    });

    const peiChart = ref(null);

    onMounted(() => {
        nextTick(initChart);
    });

    const initChart = () => {
        
    }

</script>