<template>
    <div class="widget">
        <div class="top">
            {{ name }}
            <span class="info">* 확대 : 영역 드래그 | 초기화 : 더블클릭</span>
        </div>
        <div class="con">
            <chart-line
                :datas="setup.chartData"
            />
        </div>
        <loading
            v-show="loadingStatus.covidStatus"
        />
    </div>
</template>
<script setup>
    import { reactive, defineProps, onMounted, watch } from "vue";
    import { covidInfState } from "@/js/api/covidApi";
    import { isEmpty } from "@/js/common/common";
    import { state as loadingStatus, setLoding } from "@/components/Loading/state";
    import Loading from "@/components/Loading/Loading";

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
        setup.setInterval = setInterval(async () => {
            if ( String($moment().minutes()).substr(String($moment().minutes()).length -1, String($moment().minutes()).length) === '0' ) {
                await getData();
            }
        }, 60000);
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
