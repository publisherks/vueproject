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
                    v-if="!isEmpty(setup.data.image)"
                >
                    <img :src="setup.data.image" :alt="setup.title">
                </div>
                <div class="view-box mb-30 p-0"
                    v-html="setup.data.content"
                >
                </div>
                <template v-if="!isEmpty(setup.introTable.datas)">
                    <h4 class="sub-title mb-30">상세정보</h4>
                    <v-table
                        class="mb-30"
                        type="row"
                        :column="setup.introTable.column"
                        :datas="setup.introTable.datas"
                        :width="setup.introTable.width"
                    />
                </template>
                <template v-if="!isEmpty(setup.infoTable.datas)">
                    <h4 class="sub-title mb-30">반복정보</h4>
                    <v-table
                        class="mb-30"
                        type="row"
                        :column="setup.infoTable.column"
                        :datas="setup.infoTable.datas"
                        :width="setup.infoTable.width"
                    />
                </template>
                <template v-if="!isEmpty(setup.mapInfo)">
                    <h4 class="sub-title mb-30">지도보기</h4>
                    <div class="img-box mb-30 p-0" ref="map"></div>
                </template>
                <template v-if="!isEmpty(setup.imageData)">
                    <h4 class="sub-title mb-30">이미지정보</h4>
                    <div class="img-box mb-10 p-0"
                        v-for="(item, index) in setup.imageData"
                        :key="`img${index}`"
                    >
                        <img :src="item" :alt="setup.title">
                    </div>
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
    import { defineProps, reactive, onMounted, ref, onUnmounted } from "vue";
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

        introTable : {
            column : {},
            datas: {},
            width: {
                title: "25%",
                content: "75%",
            },
        },

        imageData: [],

        mapInfo: {},
    });

    const map = ref(null);

    onMounted(async () => {
        detail();
    });

    onUnmounted(() => {
        removeScript()
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
        const imageDataTotal = imageRes.data.response.body.totalCount;
        
        setLoding("tour", false);

        setup.title = commonData.title;
        setup.data.image = commonData.firstimage;
        setup.data.content = `<h3 class="sub-title mb-10">개요</h3>${commonData.overview}`;
        if (commonData.addr1) {
            setup.introTable.column["field0"] = {
                ...setup.introTable.column["field0"],
                align: "left",
                label: "주소"
            }
            setup.introTable.datas["field0"] = `${commonData.addr1 ?? ''} ${commonData.addr2 ?? ''}`;
        }
        setup.mapInfo = {
            mapx: commonData.mapx,
            mapy: commonData.mapy,
            mlevel: commonData.mlevel
        }

        let tourInfoJson = tourKey.info.hasOwnProperty(typeId) ? tourKey.info[typeId] : tourKey.info['common'];
        let tourintroJson = tourKey.intro[typeId];

        if ( typeId === 25 || typeId === 32) {
            let idx = 0;
            if ( infoDataTotal > 1) {
                infoData?.map(item => {
                    infoDataSet(tourInfoJson, item, ((Object.keys(tourInfoJson).length * idx) + 1));
                    idx++;
                });
            } else {
                infoDataSet(tourInfoJson, infoData, idx);
            }
        } else {
            if ( infoDataTotal > 1) {
                infoData?.map(item => {
                    commonInfoDataSet(tourInfoJson, item);
                });
            } else {
                commonInfoDataSet(tourInfoJson, infoData);
            }
        }

        introDataSet(tourintroJson, introData, commonData.homepage)

        
        if ( imageDataTotal > 1) {
            imageData?.map(item => {
                imageDataSet(item);
            });
        } else {
            imageDataSet(imageData);
        }

        initMap()
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

    const introDataSet = (json, obj, homepage) => {
        let idx = 1;
        for ( let key in obj) {
            if ( !isEmpty(obj[key]) && json.hasOwnProperty(key) ) {
                setup.introTable.column["field"+idx] = {
                    ...setup.introTable.column["field"+idx],
                    align: "left",
                    label: json[key]
                }

                let data = key.includes('date') ? $moment(`${obj[key]}`).format("YYYY년 MM월 DD일") : obj[key];
                setup.introTable.datas["field"+idx] = data;
                idx++;
            }
        }
        
        if(homepage) {
            setup.introTable.column["field"+idx] = {
                ...setup.introTable.column["field"+idx],
                align: "left",
                label: "링크"
            }
            setup.introTable.datas["field"+idx] = `${homepage}`;
        }
    }

    const imageDataSet = (obj) => {
        for ( let key in obj) {
            if (key.includes('origin')) {
                setup.imageData.push(obj[key]);
            }
        }
    }

    const initMap = () => {
        const script = document.createElement("script");
        /* global kakao */
        script.src = `http://dapi.kakao.com/v2/maps/sdk.js?appkey=7dcf33b691a54853298f468dc5f0b0d0&autoload=false`;
        script.setAttribute("key", "kakaomap");
        document.head.appendChild(script);
        script.onload = () => kakao.maps.load(createMap);
    }

    const createMap = () => {
        const container = map.value;
        const options = {
            center: new kakao.maps.LatLng(setup.mapInfo.mapy, setup.mapInfo.mapx),
            level: setup.mapInfo.mlevel,
        };

        const maps = new kakao.maps.Map(container, options);
        
        // 마커가 표시될 위치입니다 
        let markerPosition  = new kakao.maps.LatLng(setup.mapInfo.mapy, setup.mapInfo.mapx); 

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(maps);
    }

    const removeScript = () => {
        document.querySelector("script[key='kakaomap']").remove()
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