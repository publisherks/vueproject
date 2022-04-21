<template>
    <div class="title-box mb-30">
        <h2 class="main-title">{{ props.title }}</h2>
    </div>
    <v-table
        class="mb-30"
        type="row"
        :column="setup.rowTable.column"
        :datas="setup.rowTable.datas"
        :width="setup.rowTable.width"
        :columnCount="setup.rowTable.columnCount"
    />
    <div class="title-box mb-20">
        <h2 class="sub-title">내용</h2>
    </div>
    <div class="view-box"
        v-html="setup.data.content"
    >
    </div>
    <btn-group
        align="right"
        class="mt-15"
    >
        <btn
            text="목록으로"
            kind="cancel"
            iconCls="far fa-long-arrow-left"
            :fn="back"
        />
        <btn
            text="삭제"
            kind="delete"
            iconCls="far fa-trash-alt"
            class="ml-15"
            :fn="del"
        />
        <btn
            text="수정"
            kind="sub1"
            iconCls="fal fa-edit"
            class="ml-15"
            :fn="modify"
        />
    </btn-group>
</template>
<script setup>
    import { reactive, defineProps, onMounted } from "vue";
    import { postsList, postsDelete } from "@/js/api/postsApi";
    import { setMessageModal } from "@/js/pattern/singleton/Modal";
    import { useRoute, useRouter } from "vue-router";

    const route  = useRoute();
    const router = useRouter();

    const props = defineProps({
        title: {
            type: String,
            default: "",
        }
    });

    const setup = reactive({
        data : {
            content : '',
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
        postsView();
    })

    const postsView = async () => {
        const request = {
            params: {
                id: route.params.postsIdx,
            }
        }

        const postsResponse = await postsList(request);

        postsResponse?.data?.map((item) => ([
            setup.rowTable.datas.field1 = item?.title,
            setup.rowTable.datas.field2 = item?.name,
            setup.rowTable.datas.field3 = item?.createdAt,
            setup.data.content = item?.content?.split('\n').join('<br />'),
        ]))
    }

    const back = () => {
        router.push({ name: 'Posts' })
    }

    const del = async () => {
        const request = {
            params: {
                id: route.params.postsIdx,
            }
        }

        const postsResponse = await postsDelete(route.params.postsIdx);

        let message = "삭제 되었습니다."
        let callback = () => {
            router.push({ name: 'Posts' });
        }
        messagePopup(message, callback)
    }

    const modify = () => {
        router.push({
            name: "PostsChange",
            params: {
                postsIdx: route.params.postsIdx
            }
        })
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
</script>