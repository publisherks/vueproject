<template>
    <div class="widget">
        <div class="top">
            {{ name }}
        </div>
        <div class="con">
            <chart-pie
            />
        </div>
        <loading
            v-show="loadingStatus.covidGenAgeCaseStatus"
        />
    </div>
</template>
<script setup>
    import { reactive, defineProps, onMounted, ref, nextTick, watch } from "vue";
    import { covidGenAgeCaseInf } from "@/js/api/covidApi";
    import { state as loadingStatus, setLoding } from "@/components/Loading/state";
    import Loading from "@/components/Loading/Loading";
    import { isEmpty } from "@/js/common/common";

    import ChartPie from "@/views/dashboard/chart/Pie"
    
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

        const res = await covidGenAgeCaseInf(request);

        if (res.data.response.header.resultCode !== '00') {
            clearInterval(setup.setInterval);
        }

        console.log(res);

        let items = Object.values(res.data.response.body.items.item.reverse());

        if (isEmpty(setup.data)) {
        }
    }
</script>
