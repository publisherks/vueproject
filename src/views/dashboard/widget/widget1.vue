<template>
    <div class="widget">
        <div class="top">
            {{ name }}
        </div>
        <div class="con">
            <chart-line
                :datas="setup.chartData"
            />
        </div>
    </div>
</template>
<script setup>
    import { reactive, defineProps, onMounted, ref } from "vue";
    import { covidInfState } from "@/js/api/covidApi";
    import { isEmpty } from "@/js/common/common";

    import ChartLine from "@/views/dashboard/chart/Line"

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

    onMounted(() => {
        getData();
        // setup.setInterval = setInterval(async () => {
        //     await getData();
        // }, 600000);
    })

    const getData = async () => {
        const request = {
            params: {
                startCreateDt: $moment("20200101").format("YYYYMMDD"),
                endCreateDt: $moment().format("YYYYMMDD")
            }
        }

        const res = await covidInfState(request);

        // console.log(res);

        if (res.data.response.header.resultCode !== '00') {
            clearInterval(setup.setInterval);
        }

        let items = Object.values(res.data.response.body.items.item.reverse());

        setup.data = items.map((item, index, arr) => {
            return { 
                date : $moment(item.createDt).format("YY/MM/DD"),
                decideCnt : arr[index-1] ? item.decideCnt - arr[index-1].decideCnt : item.decideCnt,
                deathCnt : arr[index-1] ? item.deathCnt - arr[index-1].deathCnt : item.deathCnt,
                totalDecideCnt : item.decideCnt,
                totalDeathCnt : item.deathCnt,
            };
        });

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

    
</script>
