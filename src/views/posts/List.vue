<template>
    <div class="title-box mb-30">
        <h2 class="main-title">{{ props.title }}</h2>
    </div>
    <v-container class="mb-30">
        <v-row>
            <v-col cols="4" class="pr-10">
                <v-input
                    class="pull"
                    :placeholder="`제목`"
                    v-model:value="setup.search.datas.field1"
                />
            </v-col>
            <v-col cols="8" class="pl-10">
                <v-input
                    class="pull"
                    :placeholder="`내용`"
                    v-model:value="setup.search.datas.field2"
                />
            </v-col>
        </v-row>
    </v-container>
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
        v-model:selectItem="setup.selectItem"
        :limit="10"
    />
</template>
<script setup>
    import { reactive, defineProps, onMounted, computed, watch } from "vue";
    import { postsList } from "@/js/api/postsApi";
    import { useRoute, useRouter } from "vue-router";
    import { reg }  from "@/js/common/common";

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
                    width : "25%",
                    option : {
                        ellipsis : true,
                        ellipsisLine : 1,
                    },
                },
                content : {
                    align : "left",
                    label : "내용",
                    width : "*",
                    option : {
                        ellipsis : true,
                        ellipsisLine : 1,
                    },
                },
                name : {
                    align : "center",
                    label : "작성자",
                    width : "10%",
                },
                createdAt : {
                    align : "center",
                    label : "작성일",
                    width : "6%",
                },
            },
            datas: [],
            views: true,
        },

        datas : [],

        search: {
            datas: {
                field1 : undefined,
                field2 : undefined,
            },
        },

        selectItem: {},
    })

    onMounted(async () => {
        postsLists();
    })

    const postsLists = async () => {
        const request = {
            params: {
                userId: setup.search?.datas?.field1?.value > 0 ? setup.search?.datas?.field1?.value : undefined,
            }
        }
        const response = await postsList(request);

        let schFilter = {
            title : setup.search.datas.field1 || "",
            content : setup.search.datas.field2 || "",
        }

        setup.datas = setup.search.datas.field1 || setup.search.datas.field2 ? [
            ...response?.data.filter((item) => {
                if (reg(schFilter.title) === false && reg(schFilter.content) === false) {
                    let title = new RegExp(schFilter.title);
                    let content = new RegExp(schFilter.content);
                    return title.test(item.title) && content.test(item.content)
                }
            })] : response?.data;

        setup.lists.datas = [
            ...setup?.datas?.map(({id, title, name, content, createdAt}, index) => ({
                id : id,
                index : index + 1,
                title : title,
                name : name,
                content : content?.split('\n')[0],
                createdAt : $moment(createdAt).format('YYYY-MM-DD'),
            })).reverse()
        ];
    }

    const regist = () => {
        router.push({ name: "PostsRegist" })
    }

    watch(() => setup.search.datas.field1, (val) => {
        postsLists();
    })

    watch(() => setup.search.datas.field2, (val) => {
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
