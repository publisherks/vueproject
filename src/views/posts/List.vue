<template>
    <div class="title-box mb-30">
        <h2 class="main-title">{{ props.title }}</h2>
    </div>
    <v-table
        class="mb-30"
        type="row"
        :column="setup.search.column"
        :datas="setup.search.datas"
        :width="setup.search.width"
        :columnCount="setup.search.columnCount"
    />
    <div class="title-box mb-20">
        <h3 class="sub-title">게시판 목록</h3>
        <btn-group
            class="ml-auto"
        >
            <btn
                text="등록"
                kind="main"
                iconCls="far fa-sign-in"
                :fn="regist"
            />
        </btn-group>
    </div>
    <v-table
        class="mb-30"
        type="col"
        :column="setup.lists.column"
        :datas="setup.lists.datas"
        :views="setup.lists.views"
        v-model:selectItme="setup.selectItem"
        :limit="10"
    />
</template>
<script setup>
    import { reactive, defineProps, onMounted, computed, watch } from "vue";
    import { selectDefault }  from "@/js/common/common";
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
        lists: {
            column : {
                index : {
                    align : "center",
                    label : "No.",
                    width : "60px",
                },
                title : {
                    align : "left",
                    label : "제목",
                    width : "30%",
                },
                body : {
                    align : "left",
                    label : "내용",
                    width : "*",
                },
                userId : {
                    align : "center",
                    label : "작성자",
                    width : "10%",
                },
            },
            datas: [],
            views: true,
        },

        users : [],

        datas : [],

        search: {
            column : {
                field1 : {
                    align: "center",
                    label: "작성자",
                    type: "select",
                    option : computed(() => setup.users?.map(({id, name}) => ({ value : id, text : name }))),
                    isDefault : true,
                    defaultValue : selectDefault,
                },
                field2 : {
                    align: "left",
                    label: "제목",
                    type: "input",
                    placeholder: "제목을 입력하세요.",
                },
                field3 : {
                    align: "left",
                    label: "내용",
                    type: "input",
                    placeholder: "내용을 입력하세요.",
                },
            },
            datas: {
                field1 : undefined,
                field2 : undefined,
                field3 : undefined,
            },
            width: {
                title: "9%",
                content: "20%",
            },
            columnCount: 3,
        },

        selectItem : "",
    })

    onMounted(async () => {
        await userLists();

        postsLists();
    })

    const userLists = async () => {
        const response = await userList();

        setup.users = response?.data?.map(({id, name}) => ({
            id: id,
            name: name
        }))
    }

    const postsLists = async () => {
        const request = {
            params: {
                userId: setup.search?.datas?.field1?.value > 0 ? setup.search?.datas?.field1?.value : undefined,
            }
        }
        const response = await posts(request);

        let schFilter = {
            title : setup.search.datas.field2 || "",
            body : setup.search.datas.field3 || "",
        }

        setup.datas = setup.search.datas.field2 || setup.search.datas.field3 ? [
            ...response?.data.filter(item => 
                item.title.toLowerCase().indexOf(schFilter.title.toLowerCase()) !== -1 && item.body.toLowerCase().indexOf(schFilter.body.toLowerCase()) !== -1
            )] : response?.data;

        setup.lists.datas = [
            ...setup?.datas?.map(({id, title, body, userId}, index) => ({
                id : id,
                index : index + 1,
                title : title,
                body : body,
                userId : setup.users.find(item => item.id === userId)?.name,
            })).reverse()
        ];
    }

    function regist() {
        router.push({ name: "PostsRegist" })
    }


    watch(() => setup.search.datas.field1, (val) => {
        postsLists();
    })

    watch(() => setup.search.datas.field2, (val) => {
        postsLists();
    })

    watch(() => setup.search.datas.field3, (val) => {
        postsLists();
    })

    watch(() => setup.selectItem, (val) => {
        router.push({
            name: "PostsView",
            params: {
                postsIdx: val.id
            }
        })
    })
</script>
