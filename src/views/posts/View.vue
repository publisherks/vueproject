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
        v-html="setup.data.body"
    >
    </div>
    <btn-group
        align="right"
        class="mt-15"
    >
        <btn
            text="수정"
            kind="sub1"
            iconCls="fal fa-edit"
        />
        <btn
            text="삭제"
            kind="delete"
            iconCls="far fa-trash-alt"
            class="ml-15"
        />
        <btn
            text="목록으로"
            kind="cancel"
            iconCls="far fa-long-arrow-left"
            class="ml-15"
            :fn="listback"
        />
    </btn-group>
</template>
<script setup>
    import { reactive, defineProps, onMounted } from "vue";
    import { userList }  from "@/js/api/userApi";
    import { posts } from "@/js/api/postsApi";
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
            body : '',
        },

        rowTable: {
            column : {
                field1 : {
                    align: "left",
                    label: "제목",
                },
                field2 : {
                    align: "left",
                    label: "작성자",
                },
            },
            datas: {
                field1 : undefined,
                field2 : undefined,
            },
            width: {
                title: "10%",
                content: "90%",
            },
            columnCount: 1,
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

        const userResponse = await userList();
        const postsResponse = await posts(request);

        postsResponse?.data?.map((item) => ([
            setup.rowTable.datas.field1 = item.title,
            setup.rowTable.datas.field2 = userResponse?.data?.find(i => i.id === item.userId)?.name,
            setup.data.body = item.body.split('\n').join('<br />'),
        ]))
    }

    function listback() {
        console.log(11);
        router.push({ name: 'Posts' })
    }
</script>