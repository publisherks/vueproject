<template>
    <div class="title-box mb-30">
        <h2 class="main-title">{{ props.title }}</h2>
    </div>
    <v-container class="mb-30">
        <v-row>
            <v-col cols="12">
                <v-input
                    class="pull"
                    :placeholder="`청원명`"
                    v-model:value="setup.search.datas.field1"
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
        :limit="10"
        @btnEvent="onBtnEvent($event)"
    />
</template>
<script setup>
    import { reactive, defineProps, onMounted, onUnmounted, watch } from "vue";
    import { petitionMoorage } from "@/js/api/petitionApi";
    import { useRoute, useRouter } from "vue-router";
    import { isEmpty, reg }  from "@/js/common/common";

    const route  = useRoute();
    const router = useRouter();

    const props = defineProps({
        title: {
            type: String,
            default: "",
        }
    });

    const setup = reactive({
        lists: {
            column : {
                BILL_NO : {
                    align : "center",
                    label : "청원번호",
                    width : "100px",
                },
                BILL_NAME : {
                    align : "left",
                    label : "청원명",
                    width : "*",
                    option : {
                        ellipsis : true,
                        ellipsisLine : 1,
                    },
                },
                PROPOSER : {
                    align : "center",
                    label : "청원인",
                    width : "10%",
                    option : {
                        ellipsis : true,
                        ellipsisLine : 1,
                    },
                },
                APPROVER : {
                    align : "center",
                    label : "청원종류",
                    width : "6%",
                },
                PROPOSE_DT : {
                    align : "center",
                    label : "접수일",
                    width : "6%",
                },
                COMMITTEE_DT : {
                    align : "center",
                    label : "회부일",
                    width : "6%",
                },
                CURR_COMMITTEE : {
                    align : "center",
                    label : "소관위원회",
                    width : "13%",
                },
                LINK_URL : {
                    align: "center",
                    label: "링크",
                    width: "7%",
                    type: "button",
                    children: [
                        {
                            kind : "sub1",
                            text : "link",
                            icon : "far fa-sign-in",
                        }
                    ],
                },
            },
            datas: [],
            views: false,
        },
        
        search: {
            datas: {
                field1 : undefined,
            },
        },
        setInterval: "",
    });
    
    onMounted(async () => {
        await list();
        setup.setInterval = setInterval(() => {
            list();
        }, 600000);
    })

    onUnmounted(() => {
        clearInterval(setup.setInterval);
    });

    const list = async () => {
        const request = {
            params: {
                pIndex: 1,
            }
        }

        let schFilter = {
            BILL_NAME : setup.search.datas.field1 || "",
        }
        
        const response = await petitionMoorage(request);
        const data = response.data.nvqbafvaajdiqhehi[1].row;

        setup.datas = setup.search.datas.field1 ? [
            ...data?.filter((item) => {
                if (reg(schFilter.BILL_NAME) === false) {
                    let BILL_NAME = new RegExp(schFilter.BILL_NAME);
                    return BILL_NAME.test(item.BILL_NAME)
                }
            })] : data;

        setup.lists.datas = [
            ...setup?.datas?.map((item, index) => ({
                Index: index,
                BILL_NO : item.BILL_NO,
                BILL_NAME : item.BILL_NAME,
                PROPOSER : item.PROPOSER,
                APPROVER : item.APPROVER.includes("국민동의") ? '국민동의' : '의원소개',
                PROPOSE_DT : item.PROPOSE_DT,
                COMMITTEE_DT : item.COMMITTEE_DT,
                CURR_COMMITTEE : item.CURR_COMMITTEE,
                LINK_URL: item.LINK_URL
            }))
        ]

        if (isEmpty(data)) {
            clearInterval(setup.setInterval);
        }
        
    }
    
    const onBtnEvent = (item) => {
        let url = setup.lists.datas.find(el => el.Index === item.Index).LINK_URL;
        window.open(url, '_blank')
    }

    watch(() => setup.search.datas.field1, (val) => {
        list();
    })
</script>