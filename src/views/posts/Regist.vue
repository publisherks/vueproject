<template>
    <form @submit.prevent="onSave">
        <div class="title-box mb-30">
            <h2 class="main-title">{{ props.title }}</h2>
        </div>
        <v-table
            class="mb-30"
            type="row"
            :column="setup.data.column"
            :datas="setup.data.datas"
            :width="setup.data.width"
            :columnCount="setup.data.columnCount"
        />
        <btn-group
            align="right"
            class="mt-15"
        >
            <btn
                text="취소"
                kind="cancel"
                iconCls="fal fa-times"
                :fn="back"
            />
            <btn
                type="submit"
                :text="setup.isModify ? '수정' : '등록'"
                :kind="setup.isModify ? 'sub1' : 'main'"
                :iconCls="setup.isModify ? 'fal fa-edit' : 'far fa-sign-in'"
                class="ml-15"
            />
        </btn-group>
    </form>
</template>
<script setup>
    import { reactive, defineProps, onMounted, computed } from "vue";
    import { postsCreate, postsList, postsModify } from "@/js/api/postsApi";
    import { isEmpty } from "@/js/common/common";
    import { setMessageModal } from "@/js/pattern/singleton/Modal";
    import { useRoute, useRouter } from "vue-router";

    const route = useRoute();
    const router = useRouter();

    const props = defineProps({
        title: {
            type: String,
            default: "",
        },
    });

    const setup = reactive({
        users: [],

        data: {
            column: {
                field1: {
                    align: "left",
                    label: "제목",
                    type: "input",
                    placeholder: "제목을 입력하세요.",
                },
                field2: {
                    align: "left",
                    label: "닉네임",
                    type: "input",
                    placeholder: "닉네임을 입력하세요.",
                },
                field3: {
                    align: "left",
                    label: "내용",
                    type: "textarea",
                    placeholder: "내용을 입력하세요.",
                    regist: true,
                    colspan: 3,
                },
            },
            datas: {
                field1: undefined,
                field2: undefined,
                field3: undefined,
            },
            width: {
                title: "10%",
                content: "40%",
            },
            columnCount: 2,
        },

        isModify: computed(() => !isEmpty(route?.params?.postsIdx)),
    });

    onMounted(async () => {
        await modifyData();
    });

    const modifyData = async () => {
        if (setup.isModify) {
            const request = {
                params: {
                    id: route.params.postsIdx,
                },
            };

            const postsResponse = await postsList(request);

            postsResponse?.data?.map((item) => [
                (setup.data.datas.field1 = item?.title),
                (setup.data.datas.field2 = item?.name),
                (setup.data.datas.field3 = item?.content),
            ]);
        }
    };

    const onSave = async () => {
        const request = {
            title: setup.data.datas.field1,
            name: setup.data.datas.field2,
            content: setup.data.datas.field3,
            createdAt: $moment().format("YYYY-MM-DD hh:mm:ss"),
        };

        let response = "",
            message = "",
            callbackData = "";

        if (!setup.data.datas?.field1) {
            message = "제목은 필수입니다."
        } else if (!setup.data.datas?.field2) {
            message = "닉네임은 필수입니다."
        } else if (!setup.data.datas?.field3) {
            message = "내용은 필수입니다."
        } else {
            if (setup.isModify) {
                console.log(route?.params?.postsIdx, request);
                response = await postsModify(route?.params?.postsIdx, request);
            } else {
                response = await postsCreate(request);
            }

            message = setup.isModify ? "수정 되었습니다." : "등록 되었습니다.";
            callbackData = response.data.id
            // callback = () => {
            //     console.log(response);
            //     router.push({
            //         name: "PostsView",
            //         params: {
            //             postsIdx: response.data.id,
            //         },
            //     });
            // };
        }

        messagePopup(message, callbackData);
    };

    const messagePopup = (message, callbackData) => {
        setMessageModal({
            status: true,
            message: message,
            callback: () => {
                router.push({
                    name: "PostsView",
                    params: {
                        postsIdx: callbackData,
                    },
                });
            },
        });
    };

    const back = () => {
        router.push({
            name: setup.isModify ? "PostsView" : "Posts",
            params: {
                postsIdx: route?.params?.postsIdx,
            },
        })
    };
</script>
