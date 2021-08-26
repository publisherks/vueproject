<template>
    <form
        @submit.prevent="onSave"
    >
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
    import { userList }  from "@/js/api/userApi";
    import { postsCreate, postsList, postsModify } from "@/js/api/postsApi";
    import { isEmpty }  from "@/js/common/common";
    import { setMessageModal } from "@/js/pattern/singleton/Modal";
    import { useRoute, useRouter } from "vue-router";

    const route  = useRoute();
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
                field1 : {
                    align: "left",
                    label: "제목",
                    type: "input",
                    placeholder: "제목을 입력하세요.",
                },
                field2: {
                    align: "center",
                    label: "작성자",
                    type: "select",
                    option : computed(() => setup.users?.map(({id, name}) => ({ value : id, text : name }))),
                },
                field3 : {
                    align: "left",
                    label: "내용",
                    type: "textarea",
                    placeholder: "내용을 입력하세요.",
                    regist: true,
                },
            },
            datas: {
                field1 : undefined,
                field2 : undefined,
                field3 : undefined,
            },
            width: {
                title: "10%",
                content: "90%",
            },
            columnCount: 1,
        },

        isModify: computed(() => !isEmpty(route?.params?.postsIdx)),
    })

    onMounted(async () => {
        await userLists();

        await modifyData();
    })

    const userLists = async () => {
        const response = await userList();

        setup.users = response?.data?.map(({id, name}) => ({
            id: id,
            name: name
        }))
    }

    const modifyData = async () => {
        if (setup.isModify) {
            const request = {
                params: {
                    id: route.params.postsIdx,
                }
            }

            const postsResponse = await postsList(request);

            postsResponse?.data?.map((item) => ([
                setup.data.datas.field2 = {
                    text : setup?.users?.find(i => i.id === item.userId)?.name,
                    value : setup?.users?.find(i => i.id === item.userId)?.id,
                },
                setup.data.datas.field1 = item?.title,
                setup.data.datas.field3 = item?.body,
            ]))
        }
    }
    
    const onSave = async () => {
        const request = {
            userId: setup.data.datas.field2.value,
            title: setup.data.datas.field1,
            body: setup.data.datas.field3,
        }

        let response = "",
            message = "";

        if (setup.isModify) {
            response = await postsModify(route?.params?.postsIdx, request);
        } else {
            response = await postsCreate(request);
        }
        

        let callback = undefined

        if (response?.data) {
            message = setup.isModify ? "수정 되었습니다." : "등록 되었습니다."
            callback = () => {
                router.push({ name: 'Posts' });
            }
        } else {
            message = setup.isModify ? "수정 실패 하였습니다." : "등록 실패 하였습니다."
        }

        messagePopup(message, callback)
    }

    const messagePopup = (message, callback) => {
        setMessageModal({
            status: true,
            message: message,
            callback: () => {
                callback();
            }
        });
    };

    const back = () => {
        router.push({ name: 'Posts' })
    }
</script>
