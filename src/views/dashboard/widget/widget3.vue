<template>
    <div class="widget">
        <div class="top">
            {{ name }}
        </div>
        <div class="con">
            <div class="flex-c">
                <tab-btn
                    :datas="setup.typeTab"
                    :value="setup.type.value"
                    v-model:value="setup.type"
                />
            </div>
            <chart-pie
                :datas="setup.chartData"
                :type="setup.type.value"
            />
        </div>
        <loading v-show="loadingStatus.covidGenAgeCaseStatus" />
    </div>
</template>
<script setup>
    import { reactive, defineProps, onMounted, ref, nextTick, watch } from "vue";
    import { covidGenAgeCaseInf } from "@/js/api/covidApi";
    import { state as loadingStatus } from "@/components/Loading/state";
    import Loading from "@/components/Loading/Loading";
    import { isEmpty } from "@/js/common/common";

    import ChartPie from "@/views/dashboard/chart/Pie";

    const props = defineProps({
        name: {
            type: String,
            default: "",
        },
    });

    const setup = reactive({
        data: [],
        datas: {
            conf: [],
            death: [],
        },
        chartData: [],
        setInterval: "",
        typeTab: [
            {
                text: "확진자",
                value: 1,
                kind: "sub1",
                size: "small",
            },
            {
                text: "사망자",
                value: 2,
                kind: "sub1",
                size: "small",
            },
        ],
        type: {
            text: "확진자",
            value: 1,
            kind: "sub1",
            size: "small",
        },
    });

    onMounted(async () => {
        initData();
        setup.setInterval = setInterval(async () => {
            if (
                String($moment().minutes()).substr(
                    String($moment().minutes()).length - 1,
                    String($moment().minutes()).length
                ) === "0"
            ) {
                await initData();
            }
        }, 60000);
    });

    const initData = async () => {
        const request = {
            params: {
                startCreateDt: $moment().format("YYYYMMDD"),
                endCreateDt: $moment().format("YYYYMMDD"),
            },
        };

        const res = await covidGenAgeCaseInf(request);

        if (res.data.response.header.resultCode !== "00") {
            clearInterval(setup.setInterval);
        }

        let items = Object.values(res.data.response.body.items.item.reverse());

        if (isEmpty(setup.datas.conf)) {
            setup.datas.conf = items.map((item) => {
                if (item.gubun !== "남성" && item.gubun !== "여성") {
                    return;
                }

                return {
                    confCase: item.confCase,
                    confCaseRate: item.confCaseRate,
                    gubun: item.gubun,
                };
            }).filter((item) => isEmpty(item) === false);
        }

        if (isEmpty(setup.datas.death)) {
            setup.datas.death = items.map((item) => {
                if (item.gubun !== "남성" && item.gubun !== "여성") {
                    return;
                }

                return {
                    death: item.death,
                    deathRate: item.deathRate,
                    gubun: item.gubun,
                };
            }).filter((item) => isEmpty(item) === false);
        }

        setData(setup.type.value);
    };

    const setData = (type) => {
        let datas = {};

        switch (type) {
            case 1:
                datas = setup.datas.conf;
                break;
            case 2:
                datas = setup.datas.death;
                break;
        }

        setup.data = datas;

        setup.chartData = [...setup.data];
    };

    watch(() => setup.type, (val) => {
        setData(val.value);
    })
</script>
