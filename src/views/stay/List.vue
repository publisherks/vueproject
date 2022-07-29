<template>
    
    <div class="title-box mb-30">
        <h2 class="main-title">{{ props.title }}</h2>
    </div>
    <v-container class="mb-30">
        <v-row>
            <v-col cols="2">
                <v-select
                    :datas="setup.areaOption"
                    v-model:value="setup.areaData"
                    :disabled="loadingStatus.tour"
                    placeholder="시도 선택"
                    class="pull"
                />
            </v-col>
            <v-col cols="2" class="pl-10">
                <v-select
                    :datas="setup.sggOption"
                    v-model:value="setup.sggData"
                    :disabled="loadingStatus.tour"
                    placeholder="시군구 선택"
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
    <loading
        v-show="loadingStatus.tour"
        :fixed="true"
    />
</template>
<script setup>
    import { reactive, defineProps, onMounted, watch } from "vue";
    import { areaCode, stay } from "@/js/api/tourApi";
    import { state as loadingStatus } from "@/components/Loading/state";
    import { isEmpty } from "@/js/common/common";
    import { state as modalState, setTourView } from "@/js/pattern/singleton/Modal";
    import Loading from "@/components/Loading/Loading";
    import ViewModal from "@/components/Modal/TourViewModal.vue";

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
                    option: {
                        ellipsis: true,
                        ellipsisLine: 1,
                    }
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
            sggCode  = setup.sggData.value;

        const request = {
            params: {
                areaCode: areaCode ?? undefined,
                sigunguCode: sggCode ?? undefined,
                numOfRows: 10000
            }
        }
        const response = await stay(request);
        const data = response.data.response.body.items.item;
        const total = response.data.response.body.totalCount;
        
        if (total > 1) {
            setup.lists.datas = data?.map((item, index) => ({
                Index : index + 1,
                contId : item.contentid,
                contTypeId : item.contenttypeid,
                image : item.firstimage2,
                title : item.title,
                addr1 : item.addr1,
                addr2 : item.addr2,
                tel : item.tel?.includes("<a href") ? '' : item.tel,
                zipcode : item.zipcode,
                readcount : item.readcount,
                createdtime : $moment(item.createdtime, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss"),
                modifiedtime : $moment(item.modifiedtime, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss")
            }))
        } else {
            setup.lists.datas = [{
                Index : 1,
                contId : data.contentid,
                contTypeId : data.contenttypeid,
                image : data.firstimage2,
                title : data.title,
                addr1 : data.addr1,
                addr2 : data.addr2,
                tel : data.tel?.includes("<a href") ? '' : data.tel,
                zipcode : data.zipcode,
                readcount : data.readcount,
                createdtime : $moment(data.createdtime, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss"),
                modifiedtime : $moment(data.modifiedtime, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss")
            }];
        }

    }

     watch(() => setup.areaData, (val, oldVal) => {
        if ( val !== oldVal) {
            setup.sggData = { value: "", text: ""}
        }
        list()
        sggList(val.value)
    })

    watch(() => setup.sggData, (val) => {
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
