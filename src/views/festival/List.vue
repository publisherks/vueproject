<template>
    <div class="title-box mb-30">
        <h2 class="main-title">{{ props.title }}</h2>
    </div>
    <v-container class="mb-30">
        <v-row>
            <v-col cols="3">
                <v-calendar
                    class="pull"
                    v-model:date="setup.festivalDt"
                    @update:date="startDateChange($event)"
                    :placeholder="`행사 시작일을 선택해주세요.`"
                />
            </v-col>
            <v-col cols="3" class="pl-10">
                <v-calendar
                    class="pull"
                    v-model:date="setup.festivalEndDt"
                    @update:date="endDateChange($event)"
                    :placeholder="`행사 종료일을 선택해주세요.`"
                />
            </v-col>
            <v-col cols="3" class="pl-10">
            </v-col>
            <v-col cols="3" class="pl-10">
            </v-col>
        </v-row>
    </v-container>
    <v-table
        class="mb-30"
        type="col"
        :column="setup.lists.column"
        :datas="setup.lists.datas"
        :views="setup.lists.views"
        :loading="true"
        :loadingKey="loadingStatus.tour"
        v-model:selectItem="setup.selectItem"
        :placeholder="`행사 시작일을 선택해주세요.`"
        :limit="10"
    />
</template>
<script setup>
    import { reactive, defineProps, onMounted, watch } from "vue";
    import { areaCode, festival } from "@/js/api/tourApi";
    import { state as loadingStatus, setLoding } from "@/components/Loading/state";

    const props = defineProps({
        title: {
            type: String,
            default: "",
        }
    });

    const setup = reactive({
        festivalDt: { startDate: "", endDate: "" },
        festivalEndDt: { startDate: "", endDate: "" },
        lists: {
            column : {
                image : {
                    align : "center",
                    label : "이미지",
                    width : "100px",
                    type : "image"
                },
                title : {
                    align : "left",
                    label : "제목",
                    width : "*",
                    option : {
                        ellipsis : true,
                        ellipsisLine : 1,
                    },
                },
                addr1 : {
                    align : "center",
                    label : "주소",
                    width : "15%",
                },
                addr2 : {
                    align : "center",
                    label : "주소상세",
                    width : "8%",
                },
                tel : {
                    align : "center",
                    label : "전화번호",
                    width : "8%",
                },
                zipcode : {
                    align : "center",
                    label : "우편번호",
                    width : "5%",
                },
                readcount : {
                    align : "center",
                    label : "조회수",
                    width : "5%",
                },
                createdtime : {
                    align : "center",
                    label : "등록일",
                    width : "10%",
                },
                modifiedtime : {
                    align : "center",
                    label : "수정일",
                    width : "10%",
                },
            },
            datas: [],
            views: true,
            selectItem: {},
        },
    });

    const startDateChange = val => {
        if ( $moment(val.startDate).isAfter(setup.festivalEndDt.startDate)) {
            let diff = $moment.duration($moment(val.startDate).diff(setup.festivalEndDt.startDate)).asDays();
            setup.festivalDt.startDate = setup.festivalDt.endDate = $moment(val.startDate).subtract(diff, 'days').format("YYYY-MM-DD") || $moment().format("YYYY-MM-DD");
        } else {
            setup.festivalDt.startDate = setup.festivalDt.endDate = val.startDate;
        }
        festivalList();
    };

    const endDateChange = val => {
        if ( $moment(val.startDate).isBefore(setup.festivalDt.startDate)) {
            let diff = $moment.duration($moment(val.startDate).diff(setup.festivalDt.startDate)).asDays();
            setup.festivalEndDt.startDate = setup.festivalEndDt.endDate = $moment(val.startDate).add(Math.abs(diff), 'days').format("YYYY-MM-DD") || $moment().format("YYYY-MM-DD");
        } else {
            setup.festivalEndDt.startDate = setup.festivalEndDt.endDate = val.startDate;
        }
        festivalList();
    };

    const festivalList = async () => {
        const request = {
            params: {
                eventStartDate: setup.festivalDt.startDate,
            }
        }
        
        const response = await festival(request);
        const data = response.data.response.body.items.item;

        console.log(data);
    }
</script>