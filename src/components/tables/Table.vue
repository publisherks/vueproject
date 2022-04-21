<template>
    <div
        class="tb-container"
        :class="[
            $attrs.class,
            { 'left-th' : props.type === 'row' }
        ]"
    >
    <ColListTable
        v-if="props.type === 'col'"
        :column="props.column"
        :datas="paginatedData"
        :views="props.views"
        v-model:selectItme="setup.selectItem"
        @btn-event="btnClick($event)"
    />
    <RowListTable
        :class="[
            $attrs.class,
            { 'left-th' : props.type === 'row' }
        ]"
        v-if="props.type === 'row'"
        :width="props.width"
        :columnCount="props.columnCount"
        :column="props.column"
        :datas="props.datas"
        :buttonCell="props.buttonCell"
    />
    </div>
    <Pagination 
        v-if="props.type === 'col'"
        :count="pageCount"
        :pagingCount="pagingCount"
        v-model:pageNum="setup.pageNum"
    />
</template>
<script setup>
    import ColListTable from "./ColList";
    import RowListTable from "./RowList";
    import { defineProps, reactive, computed, defineEmits, watch } from "vue";

    const props = defineProps({
        column : {
            type: Object,
            default() {
                return {}
            }
        },
        datas : {
            type: Object,
            default() {
                return {}
            }
        },
        type : {
            type: String
        },
        width : {
            type: Object,
            default() {
                return {}
            }
        },
        columnCount : {
            type: Number,
            default: 0
        },
        limit: {
            type: Number,
            default: 10,
        },
        views : {
            type: Boolean,
            default: false,
        },
        selectItem : {
            type: Object,
            default() {
                return {}
            }
        },
        pageNum: {
            type: Number,
            default: 1,
        }
    });

    const setup = reactive({
        data: computed(() => props.datas),
        pageNum: props.pageNum,
        selectItem: '',
    });

    const pageCount = computed(() => {
        let totalCount = props.datas.length,
            listSize   = props.limit,
            page       = Math.floor((totalCount - 1) / listSize) + 1;

        return page;
    });

    const emit = defineEmits(['update:selectItme', 'btnEvent', 'update:pageNum'])

    const paginatedData = computed(() => {
        const start = (setup.pageNum - 1) * props.limit,
              end   = start + props.limit;

        return setup.data.slice(start, end);
    });

    watch(() => setup.selectItem, (val) => {
        emit('update:selectItme', val)
    })

    watch(() => setup.pageNum, (val) => {
        emit('update:pageNum', val)
    })

    watch(() => props.pageNum, (val) => {
        setup.pageNum = val
    })

    const btnClick = (data) => {
        emit('btnEvent', data)
    }
</script>
