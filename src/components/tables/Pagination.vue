<template>
    <div class="paging-container">
        <div class="paging-box">
            <a
                href="#n"
                class="prev"
                @click="setPage('prev')"
            ></a>
            <a
                href="#n"
                v-for="i in props.count"
                :key="i"
                :class="{ on : i === props.pageNum }"
                @click="$emit('update:pageNum', i)"
            >{{ i }}</a>
            <a
                href="#n"
                class="next"
                @click="setPage('next')"
            ></a>
        </div>
    </div>
</template>
<script setup>
    import { defineProps, defineEmit, reactive, watch } from "vue";

    const props = defineProps({
        count: Number,
        pageNum: Number,
    });

    const setup = reactive({
        curentPage : props.pageNum,
    })

    const emit = defineEmit(["update"]);

    const setPage = (direction) => {
        if( direction === 'prev' ) {
            setup.curentPage = setup.curentPage > 1 ? setup.curentPage - 1 : setup.curentPage = 1;
        } else {
            setup.curentPage = setup.curentPage < props.count ? setup.curentPage + 1 : setup.curentPage = props.count;
        }
    }

    watch(() => setup.curentPage, value => {
        emit('update:pageNum', value)
    })
</script>
