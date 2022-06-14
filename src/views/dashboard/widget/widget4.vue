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
            <chart-polar
                :datas="setup.chartData"
                :totalValue="totalValue"
                :type="setup.type.value"
            />
        </div>
        <loading
            v-show="loadingStatus.covidGenAgeCaseStatus"
        />
    </div>
</template>
<script setup>
    import { reactive, defineProps, onMounted, watch, computed } from "vue";
    import { covidGenAgeCaseInf } from "@/js/api/covidApi";
    import { state as loadingStatus } from "@/components/Loading/state";
    import Loading from "@/components/Loading/Loading";
    import { isEmpty } from "@/js/common/common";

    import ChartPolar from "@/views/dashboard/chart/polar"

    
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
            critical: [],
        },
        chartData: [],
        total: {
            conf: "",
            death: "",
        },
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
            {
                text: "치명률",
                value: 3,
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

    const totalValue = computed(() => setup.type.value === 1 ? setup.total.conf : setup.total.death )

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
                if (item.gubun === "남성" || item.gubun === "여성") {
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
                if (item.gubun === "남성" || item.gubun === "여성") {
                    return;
                }

                return {
                    death: item.death,
                    deathRate: item.deathRate,
                    gubun: item.gubun,
                };
            }).filter((item) => isEmpty(item) === false);
        }

        if (isEmpty(setup.datas.critical)) {
            setup.datas.critical = items.map((item) => {
                if (item.gubun === "남성" || item.gubun === "여성") {
                    return;
                }

                return {
                    criticalRate: item.criticalRate,
                    gubun: item.gubun,
                };
            }).filter((item) => isEmpty(item) === false);
        }

        console.log(setup.datas);
        setup.total.conf = setup.datas.conf.reduce((prev, cur) => { return prev += cur.confCase }, 0);
        setup.total.death = setup.datas.death.reduce((prev, cur) => { return prev += cur.death }, 0);

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
            case 3:
                datas = setup.datas.critical;
                break;
        }

        setup.data = datas.filter((item) => isEmpty(item) === false);

        setup.chartData = [...setup.data];
    };

    watch(() => setup.type, (val) => {
        setData(val.value);
    })
</script>