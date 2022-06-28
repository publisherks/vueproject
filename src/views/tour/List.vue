<template>
    <div class="title-box mb-30">
        <h2 class="main-title">{{ props.title }}</h2>
    </div>
    <v-container class="mb-30">
        <v-row>
            <v-col cols="4">
                <v-select
                    :datas="setup.areaOption"
                    v-model:value="setup.areaData"
                    :disabled="loadingStatus.tour"
                    placeholder="시도 선택"
                    class="pull"
                />
            </v-col>
            <v-col cols="4" class="pl-10">
                <v-select
                    :datas="setup.sggOption"
                    v-model:value="setup.sggData"
                    :disabled="loadingStatus.tour"
                    placeholder="시군구 선택"
                    class="pull"
                />
            </v-col>
            <v-col cols="4" class="pl-10">
                <v-select
                    :datas="setup.typeOption"
                    v-model:value="setup.typeData"
                    :disabled="loadingStatus.tour"
                    placeholder="콘텐츠 타입"
                    class="pull"
                />
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
        :placeholder="`시도를 선택해주세요`"
        :limit="10"
    />
    <ViewModal
        v-if="modalState.tourViewModal"
        :detailId="setup.detailId"
    />
</template>
<script setup>
    import { reactive, defineProps, onMounted, watch } from "vue";
    import { areaCode, areaBasedList } from "@/js/api/tourApi";
    import { state as loadingStatus, setLoding } from "@/components/Loading/state";
    import { isEmpty } from "@/js/common/common";
    import { useRouter } from "vue-router";
    import { state as modalState, setTourView } from "@/js/pattern/singleton/Modal";
    import ViewModal from "./modal/View.vue";

    const router = useRouter();

    const props = defineProps({
        title: {
            type: String,
            default: "",
        }
    });

    const setup = reactive({
        areaOption: [],
        areaData: {
            value: "",
            text: ""
        },
        sggOption: [],
        sggData: {
            value: "",
            text: ""
        },
        typeOption: [
            {
                value: 12,
                text: "관광지"
            },
            {
                value: 14,
                text: "문화시설"
            },
            {
                value: 15,
                text: "축제/공연/행사"
            },
            {
                value: 25,
                text: "여행코스"
            },
            {
                value: 28,
                text: "레포츠"
            },
            {
                value: 32,
                text: "숙박"
            },
            {
                value: 38,
                text: "쇼핑"
            },
            {
                value: 39,
                text: "음식점"
            },
        ],
        typeData: {
            value: "",
            text: ""
        },
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
        },
        detailId: {
            contId: "",
            typeId: ""
        },
        selectItem: {},
    })

    onMounted( async () => {
        areaList();
    });

    const areaList = async () => {
        const request = {
            params: {
                numOfRows: 17,
            }
        }
        
        const response = await areaCode(request);
        const data = response.data.response.body.items.item;

        setup.areaOption = data.map(({code, name}) => {
            return {
                value: code,
                text: name
            }
        })
    }
    
    const sggList = async (code) => {
        const request = {
            params: {
                areaCode: code,
                numOfRows: 100
            }
        }
        
        const response = await areaCode(request);
        const data = response.data.response.body.items.item;

        setup.sggOption = data.map(({code, name}) => {
            return {
                value: code,
                text: name
            }
        })
    }

    const list = async () => {
        if ( isEmpty(setup.areaData.value) && isEmpty(setup.sggData.value) ) {
            return;
        }

        let areaCode = setup.areaData.value,
            sggCode  = setup.sggData.value,
            typeCode = setup.typeData.value;

        setLoding("tour", true);

        const request = {
            params: {
                areaCode: areaCode ? areaCode : undefined,
                sigunguCode: sggCode ? sggCode : undefined,
                contentTypeId: setup.typeData.value ? setup.typeData.value : undefined,
                numOfRows: 10
            }
        }
        const response = await areaBasedList(request);
        const data = response.data.response.body.items.item;
        
        // console.log(data)

        setLoding("tour", false);

        setup.lists.datas = data.map((item, index) => ({
            Index : index + 1,
            contId : item.contentid,
            contTypeId : item.contenttypeid,
            image : item.firstimage2,
            title : item.title,
            addr1 : item.addr1,
            addr2 : item.addr2,
            tel : item.tel,
            zipcode : item.zipcode,
            readcount : item.readcount,
            createdtime : $moment(item.createdtime, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss"),
            modifiedtime : $moment(item.modifiedtime, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss")
        }))
    }

    watch(() => setup.areaData, (val) => {
        list()
        sggList(val.value)
    })

    watch(() => setup.sggData, (val) => {
        list()
    })

    watch(() => setup.typeData, (val) => {
        list()
    })

    watch(() => setup.selectItem, (val) => {
        if( isEmpty(val) ) {
            return
        }
        setup.detailId.contId = val.contId;
        setup.detailId.typeId = val.contTypeId;
        setTourView(true);
    })

    watch(() => modalState.tourViewModal, (val) => {
        if ( val === false) {
            setup.selectItem = {};
        }
    })
</script>