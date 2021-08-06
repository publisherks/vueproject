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
                    option : {},
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
                }
            },
            datas: {
                field1 : "",
                field2 : "",
                field3 : "",
            },
            width: {
                title: "10%",
                content: "23.3%",
            },
            columnCount: 3
        },

        searchData: [{
            userId : "",
            title : "",
            body : "",
        }],
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

    const onSearch = () => {

        let searchDatas = [];

        searchDatas = setup.datas.filter(item => {
            let searchItem;
            if(setup.searchData.title && !item.title.toLowerCase().includes(setup.searchData?.title?.toLowerCase())) {
                console.log(item)
                return item;
                if(setup.searchData.body && !item.body.toLowerCase().includes(setup.searchData?.body?.toLowerCase())) {
                    console.log(item)
                    return item;
                }
            }
            return searchItem;
        })

        console.log(setup.searchData?.title?.toLowerCase(), setup.searchData?.body?.toLowerCase(), searchDatas)

        setup.lists.datas = searchDatas?.map(({title, body, userId}, index) => ({
            id : index + 1,
            title : title,
            body : body,
            userId : setup.users.find(item => item.id === userId)?.name
        })).reverse();
    }

    const postsLists = async () => {
        const request = {
            params: {
                userId: setup.searchData.userId,
            }
        }
        const response = await postsList(request);

        setup.datas = response?.data;

        setup.lists.datas = setup?.datas?.map(({title, body, userId}, index) => ({
            id : index + 1,
            title : title,
            body : body,
            userId : setup.users.find(item => item.id === userId)?.name
        })).reverse();
    }

    setup.search.column.field1.option = computed(() => 
        setup.users?.map(({id, name}) => ({
            value : id,
            text : name
        }))
    );

    // const search = (val, type) => {
    //     console.log(val, [setup.searchData.length === 0 ? setup.datas : setup.searchData]);

    //     let datas = setup.searchData.length === 0 ? setup.datas : setup.searchData;

    //     datas.filter(item => {
    //         switch (type) {
    //             case "userId" :
    //                 if (item.userId === val.value) {
    //                     console.log('userId', val.value)
    //                     setup.searchData.push(item);
    //                 }
    //                 break;
    //             case "title" :
    //                 if (item.title.indexOf(val) !== -1) {
    //                     console.log('title', val)
    //                     setup.searchData.push(item);
    //                 }
    //                 break;
    //             case "body" :
    //                 if (item.body.indexOf(val) !== -1) {
    //                     console.log('body', val)
    //                     setup.searchData.push(item);
    //                 }
    //                 break;
    //         }
    //     });

    //     console.log('search', setup.searchData)
    //     // postsLists();
        

    //     setup.lists.datas = setup.searchData?.map(({title, body, userId}, index) => ({
    //         id : index+1,
    //         title : title,
    //         body : body,
    //         userId : setup.users.find(item => item.id === userId)?.name
    //     })).reverse();
    // }

    watch(() => setup.search.datas.field1, (val) => {
        setup.searchData.userId = val.value;

        postsLists();
    })

    watch(() => setup.search.datas.field2, (val) => {
        setup.searchData.title = val;

        onSearch();
    })

    watch(() => setup.search.datas.field3, (val) => {
        setup.searchData.body = val;

        onSearch();
    })
</script>
