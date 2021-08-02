<template>
    <div class="paging-container">
        <div class="paging-box">
            <a
                href="#n"
                class="first"
                @click="pages.first"
            ></a>
            <a
                href="#n"
                class="prev"
                @click="pages.prev"
                v-if="props.count > 10"
            ></a>
            <a
                href="#n"
                v-for="(item, index) in pages.pageGroup"
                :key="item"
                :class="{
                    on : item === props.pageNum,
                    'ml-7' : index === 0,
                    'mr-7' : index === pages.pageGroup.length - 1
                }"
                @click="setup.currentPage = item"
            >{{ item }}</a>
            <a
                href="#n"
                class="next"
                @click="pages.next"
                v-if="props.count > 10"
            ></a>
            <a
                href="#n"
                class="last"
                @click="pages.last"
            ></a>
        </div>
    </div>
</template>
<script setup>
    import { defineProps, defineEmit, reactive, watch, computed, nextTick } from "vue";

    const props = defineProps({
        count: Number,
        pageNum: Number,
    });

    const setup = reactive({
        currentPage : props.pageNum,
        pageCount : 10,
    })

    const emit = defineEmit(["update"]);

    const pages = reactive({
        page: setup.currentPage - (setup.currentPage % setup.pageCount) + 1,
        pageGroup : computed(() => {
            let page = pages.page;
            if(setup.currentPage % setup.pageCount === 0) {
                page = setup.currentPage - setup.pageCount + 1;
            } else if (setup.currentPage % setup.pageCount === 1){
                page = setup.currentPage
            }
            return new Array(props.count - page + 1).fill().map((_, idx) => page + idx).slice(0, setup.pageCount);
        }),
        next : () => {
            let movePage = setup.currentPage;

            movePage += (setup.pageCount + 1) - (movePage % setup.pageCount === 0 ? setup.pageCount : movePage % setup.pageCount);

            if (movePage > props.count) {
                movePage = props.count;
            }

            setup.currentPage = movePage;
        },
        prev : () => {
            let movePage = setup.currentPage;

            movePage -= movePage % setup.pageCount === 0 ? setup.pageCount : movePage % setup.pageCount;

            if (movePage < 1) {
                movePage = 1;
            }

            setup.currentPage = movePage;
        },
        first : () => {
            setup.currentPage = 1;
        },
        last : () => {
            setup.currentPage = props.count;
        },
    });

    watch(() => setup.currentPage, value => {
        emit('update:pageNum', value)
    })
</script>
