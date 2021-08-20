<template>
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
</template>
<script setup>
    import { reactive, defineProps, computed } from "vue";
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
        data: {
            column: {
                field1: {
                    align: "center",
                    label: "작성자",
                    isDefault : true,
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
        }
    })
</script>
