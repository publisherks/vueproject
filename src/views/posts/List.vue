<template>
    <div class="title-box mb-30">
        <h2 class="main-title">{{ props.title }}</h2>
    </div>
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
    import { reactive, defineProps, onMounted, computed } from "vue";
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
    })

    onMounted(() => {
        userLists();

        postsLists();
    })

    const userLists = async() => {
        const response = await userList();

        setup.users = response?.data?.map(({id, name}) => ({
            id: id,
            name: name
        }))
    }

    const postsLists = async() => {
        const response = await postsList();

        setup.lists.datas = response?.data?.map(({id, title, body, userId}) => ({
            id : id,
            title : title,
            body : body,
            userId : setup.users.find(item => item.id === userId)?.name
        }))
    }

</script>
