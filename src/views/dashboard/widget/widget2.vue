<template>
    <div class="widget">
        <div class="top">
            {{ name }}
        </div>
        <div class="con">
            <div class="flex-c">
                <tab-btn
                    :datas="setup.termTab"
                    :value="setup.term.value"
                    v-model:value="setup.term"
                />
                <tab-btn
                    class="ml-20"
                    :datas="setup.typeTab"
                    :value="setup.type.value"
                    v-model:value="setup.type"
                />
            </div>
            <chart-bar
                :datas="setup.chartData"
                :totalValue="totalValue"
                :type="setup.type.value"
            />
        </div>
    </div>
</template>
<script setup>
    import { reactive, defineProps, onMounted, watch, computed } from "vue";
    import { covidSidoInfState } from "@/js/api/covidApi";
    import { isEmpty } from "@/js/common/common";

    import ChartBar from "@/views/dashboard/chart/Bar"

    const props = defineProps({
        name: {
            type: String,
            default: "",
        }
    });

    const setup = reactive({
        data: [],
        chartData: [],
        datas: {
            today: [],
            week: [],
            all: [],
        },
        setInterval: "",
        total: {
            def: "",
            death: "",
            clear: "",
        },
        termTab: [
            {
                text: "오늘",
                value: 1,
                kind: "sub1",
                size: "small"
            },
            {
                text: "최근7일",
                value: 2,
                kind: "sub1",
                size: "small"
            },
            {
                text: "전체",
                value: 3,
                kind: "sub1",
                size: "small"
            }
        ],
        term: {
            text: "오늘",
            value: 1,
            kind: "sub1",
            size: "small"
        },
        typeTab: [
            {
                text: "확진자",
                value: 1,
                kind: "sub1",
                size: "small"
            },
            {
                text: "사망자",
                value: 2,
                kind: "sub1",
                size: "small"
            },
            {
                text: "격리해제",
                value: 3,
                kind: "sub1",
                size: "small"
            }
        ],
        type: {
            text: "확진자",
            value: 1,
            kind: "sub1",
            size: "small"
        },
    })

    const totalValue = computed(() => setup.type.value === 1 ? setup.totalDef : setup.type.value === 2 ? setup.totalDeath : setup.totalClear )

    onMounted(() => {
        getData(setup.term.value);
        setup.setInterval = setInterval(async () => {
            await getData(setup.term.value);
        }, 600000);
    })

    const getData = async (term) => {
        let today = $moment().format("YYYYMMDD");
        let startCreateDt;

        switch(term) {
            case 1:
                startCreateDt = $moment().subtract(1, 'd').format("YYYYMMDD");
                // startCreateDt = $moment("20220101").format("YYYYMMDD");
                break;
            case 2:
                startCreateDt = $moment().subtract(7, 'd').format("YYYYMMDD");
                break;
            case 3:
                startCreateDt = $moment("20200101").format("YYYYMMDD");
                break;
        }

        const request = {
            params: {
                startCreateDt: startCreateDt,
                endCreateDt: today
            }
        }

        const res = await covidSidoInfState(request);

        if (res.data.response.header.resultCode !== '00') {
            clearInterval(setup.setInterval);
        }

        let items = Object.values(res.data.response.body.items.item);
        let datas = {};

        if (isEmpty(setup.datas.today) && term === 1) {
            addData("today", items);
            datas = setup.datas.today;
        }

        if (isEmpty(setup.datas.week) && term === 2) {
            addData("week", items);
            datas = setup.datas.week;
        }

        if (isEmpty(setup.datas.all) && term === 3) {
            addData("all", items);
            datas = setup.datas.all;
        }

        console.log(items);

        // datas = items.map((item, index, arr) => {
        //     return {
        //         date: $moment(item.createDt).format("YY/MM/DD"),
        //         defCnt: item.defCnt,
        //         deathCnt: item.deathCnt,
        //         isolClearCnt: item.isolClearCnt,
        //         gubun: item.gubun
        //     }
        // });

        datas = groupBy(datas, 'date');
        setup.total.def = datas[Object.keys(datas)[0]].filter(item => item.gubun.includes("합계"))[0].defCnt - datas[Object.keys(datas)[Object.keys(datas).length - 1]].filter(item => item.gubun.includes("합계"))[0].defCnt || 0;
        setup.total.death = datas[Object.keys(datas)[0]].filter(item => item.gubun.includes("합계"))[0].deathCnt - datas[Object.keys(datas)[Object.keys(datas).length - 1]].filter(item => item.gubun.includes("합계"))[0].deathCnt || 0;
        setup.total.clear = datas[Object.keys(datas)[0]].filter(item => item.gubun.includes("합계"))[0].isolClearCnt - datas[Object.keys(datas)[Object.keys(datas).length - 1]].filter(item => item.gubun.includes("합계"))[0].isolClearCnt || 0;

        for (let i = 0; i < Object.keys(datas).length; i++ ) {
            if (i === Object.keys(datas).length - 1) {
                setup.data = datas[Object.keys(datas).sort()[i]].map((item, idx) => {
                    if( item.gubun === "합계") {
                        return;
                    }

                    let compare = datas[Object.keys(datas)[Object.keys(datas).length-1]][idx];
                    console.log(item.date, ' = ', item.isolClearCnt, compare.isolClearCnt, ((item.isolClearCnt || 0) - compare.isolClearCnt) || 0 )
                    
                    return {
                        defCnt: item.defCnt - compare.defCnt,
                        deathCnt: item.deathCnt - compare.deathCnt,
                        isolClearCnt: Math.abs((item.isolClearCnt || 0) - compare.isolClearCnt) || 0,
                        gubun: item.gubun
                    }
                });
            }
        }

        setup.data = setup.data.filter((item) => isEmpty(item) === false);

        setup.chartData = [ ...setup.data ];
    }

    const addData = (target, datas) => {
        setup.datas[target] = datas.map((item) => {
            return {
                date: $moment(item.createDt).format("YY/MM/DD"),
                defCnt: item.defCnt,
                deathCnt: item.deathCnt,
                isolClearCnt: item.isolClearCnt,
                gubun: item.gubun
            }
        });
    }
    
    const groupBy = (list, key) => {
        return list.reduce((rv, x) => {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }

    watch(() => setup.term, (val) => {
        getData(val.value);
    })
</script>
