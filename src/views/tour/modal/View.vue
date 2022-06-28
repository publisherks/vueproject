<template>
    <div
        class="modal modal-overlay"
        v-on:click.self="modalCloseHook"
    >
        <div class="modal-contanier">
            <div class="modal-top">
                <h3 class="modal-title">{{ setup.title }}</h3>
                <a
                    href="#n"
                    class="close-btn"
                    v-on:click="modalCloseHook"
                >
                    <i class="fal fa-times"></i>
                </a>
            </div>
            <div class="modal-contents over-y-auto">
                <div class="img-box mb-30 p-0"
                    v-if="isEmpty(setup.data.image) === false"
                >
                    <img :src="setup.data.image" :alt="setup.title">
                </div>
                <div class="view-box mb-30 p-0"
                    v-html="setup.data.content"
                >
                </div>
                <template v-if="isEmpty(setup.infoTable.datas) === false">
                    <h4 class="sub-title mb-30">반복정보</h4>
                    <v-table
                        class="mb-30"
                        type="row"
                        :column="setup.infoTable.column"
                        :datas="setup.infoTable.datas"
                        :width="setup.infoTable.width"
                    />
                </template>
            </div>
            <div class="btn-box flex-c mt-30">
                <button
                    type="button"
                    class="btn btn-cancel"
                    v-on:click="modalCloseHook"
                >
                    <i class="fal fa-times"></i>닫기
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { state }       from "@/js/pattern/singleton/Modal";
    import { defineProps, reactive, onMounted } from "vue";
    import { isEmpty } from "@/js/common/common";
    import { detailCommon, detailIntro, detailInfo, detailImage } from "@/js/api/tourApi";
    import tourKey from '@/json/tour';
    import { state as loadingStatus, setLoding } from "@/components/Loading/state";
    import Loading from "@/components/Loading/Loading";
    import { useRoute, useRouter } from "vue-router";

    const route  = useRoute();
    const router = useRouter();

    const props = defineProps({
        detailId: Object
    });

    const setup = reactive({
        title: "",
        data : {
            image: '',
            content : '',
        },

        infoTable : {
            column : {},
            datas: {},
            width: {
                title: "25%",
                content: "75%",
            },
        },

        rowTable: {
            column : {
                field1 : {
                    align: "left",
                    label: "제목",
                    colspan: 3,
                },
                field2 : {
                    align: "left",
                    label: "작성자",
                },
                field3 : {
                    align: "left",
                    label: "등록일",
                },
            },
            datas: {
                field1 : undefined,
                field2 : undefined,
                field3 : undefined,
            },
            width: {
                title: "10%",
                content: "40%",
            },
            columnCount: 2,
        },

    });

    onMounted(async () => {
        detail();
    })

    const detail = async () => {

        setLoding("tour", true);
        
        let typeId = props.detailId.typeId;
        
        const request = {
            params: {
                contentId: props.detailId.contId,
                contentTypeId: typeId
            }
        }
        const commonRequest = {
            params: {
                ...request.params,
                defaultYN: "Y",
                firstImageYN: "Y",
                areacodeYN: "Y",
                catcodeYN: "Y",
                addrinfoYN: "Y",
                mapinfoYN: "Y",
                overviewYN: "Y",
            }
        }

        const commonRes = await detailCommon(commonRequest);
        const introRes = await detailIntro(request);
        const infoRes = await detailInfo(request);
        const imageRes = await detailImage(request);
        
        const commonData = commonRes.data.response.body.items.item;
        const introData = introRes.data.response.body.items.item;
        const infoData = infoRes.data.response.body.items.item;
        const infoDataTotal = infoRes.data.response.body.totalCount;
        const imageData = imageRes.data.response.body.items.item;
        
        setLoding("tour", false);

        // console.log("commonData = ", commonData,
        //             "introData = ", introData,
        //             "infoData = ", infoData,
        //             "imageData = ", imageData)

        console.log("infoData = ", infoData, infoDataTotal)

        setup.title = commonData.title;
        setup.data.image = commonData.firstimage;
        setup.data.content = `<h3 class="sub-title mb-10">개요</h3>${commonData.overview}`;

        let tourJson = tourKey.info.hasOwnProperty(typeId) ? tourKey.info[typeId] : tourKey.info['common'];

        console.log("tourJson = ", tourJson)

        if ( typeId === 25 || typeId === 32) {
            let idx = 0;
            if ( infoDataTotal > 1) {
                infoData?.map(item => {
                    infoDataSet(tourJson, item, ((Object.keys(tourJson).length * idx) + 1));
                    idx++;
                });
            } else {
                infoDataSet(tourJson, infoData, idx);
            }
        } else {
            if ( infoDataTotal > 1) {
                infoData?.map(item => {
                    commonInfoDataSet(tourJson, item);
                    idx++;
                });
            } else {
                commonInfoDataSet(tourJson, infoData);
            }
        }
    }

    const commonInfoDataSet = (json, obj) => {
        let field = "",
            label = "",
            datas = "";

        for (let key in json) {
            if ( key === "fldgubun") {
                field = `field${obj[key]}`;
            } else if ( key === "infoname") {
                label = obj[key];
            } else {
                datas = obj[key];
            }
        }

        setup.infoTable.column[field] = {
            align : "left",
            label : label
        }
        setup.infoTable.datas[field] = datas;
    }

    const infoDataSet = (json, obj, idx) => {
        for ( let key in obj) {
            if ( json.hasOwnProperty(key)) {
                console.log(json[key], idx)
                if ( key.includes("img") && !key.includes("alt")) {
                    setup.infoTable.column["field"+idx] = {
                        ...setup.infoTable.column["field"+idx],
                        type : "image"
                    }
                }
                setup.infoTable.column["field"+idx] = {
                    ...setup.infoTable.column["field"+idx],
                    align : "left",
                    label : json[key]
                }
                setup.infoTable.datas["field"+idx] = obj[key];
                idx++;
            }
        }
    }

    const modalCloseHook = () => {
        state.tourViewModal = false;
    };
</script>

<style lang="scss" scoped>
.modal-contanier {
    width: 600px;
    max-height: 90%;
}

.view-box {
    min-height: 100px;
}
</style>