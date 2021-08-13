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
        :buttonCell="setup.search.buttonCell"
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
            />
        </btn-group>
    </div>
    <v-table
        class="mb-30"
        type="col"
        :column="setup.lists.column"
        :datas="setup.lists.datas"
        :limit="10"
    />
</template>
<script setup>
    import { reactive, defineProps, onMounted, computed, watch } from "vue";
    import { selectDefault }  from "@/js/common/common";
    import { userList }  from "@/js/api/userApi";
    import { postsList } from "@/js/api/postsApi";

    const props = defineProps({
        title: {
            type: String,
            default: "",
        }
    });

    const setup = reactive({
        lists: {
            column : {
                id : {
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
        },

        users : [],

        datas : [],

        search: {
            column : {
                field1 : {
                    align: "center",
                    label: "작성자",
                    type: "select",
                    option : option,
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
                field1 : "",
                field2 : "",
                field3 : "",
            },
            width: {
                title: "9%",
                content: "20%",
            },
            columnCount: 3,
            buttonCell : {
                width: "13%",
                align: "center",
                kind : "sub2",
                text : "검색",
                icon : "far fa-sign-in",
                fn : onSearch,
            }
        },

        searchDatas: {
            userId : undefined,
            title : undefined,
            body : undefined,
        },
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

    function onSearch() {
        postsLists();
    }

    const postsLists = async () => {
        const request = {
            params: {
                userId: setup.searchDatas?.userId,
            }
        }
        const response = await postsList(request);

        console.log(response)

        setup.datas = response?.data;

        setup.lists.datas = setup?.datas?.map(({title, body, userId}, index) => ({
            id : index + 1,
            title : title,
            body : body,
            userId : setup.users.find(item => item.id === userId)?.name
        })).reverse();
    }
    
    // setup.search.column.field1.option = [{
    //     value : 0,
    //     text : "All"
    // }];

    console.log(selectDefault);

    // setup.search.column.field1.option = computed(() => 
    //     {
    //         selectDefault
    //     },
    //     setup.users?.map(({id, name}) => ({
    //         value : id,
    //         text : name
    //     }))
    // )

    const option = computed(() => (
        {
            ...selectDefault
        },
        setup.users?.map(({id, name}) => ({
            value : id,
            text : name
        }))
    ))

    // setup.search.column.field1.option = computed(() => [
    //     ...setup.search.column.field1.option
    // ])


    watch(() => setup.search.datas.field1, (val) => {
        setup.searchDatas.userId = val.value;
    })

    watch(() => setup.search.datas.field2, (val) => {
        setup.searchDatas.title = val.value;
    })

    watch(() => setup.search.datas.field3, (val) => {
        setup.searchDatas.body = val.value;
    })
</script>
