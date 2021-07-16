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
    />
    </div>
    <Pagination 
        v-if="props.type === 'col'"
        :count="pageCount"
        :pagingCount="props.pagingCount"
        v-model:pageNum="setup.pageNum"
    />
</template>
<script setup>
    import ColListTable from "./ColList";
    import RowListTable from "./RowList";
    import { defineProps, reactive, computed } from "vue";

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
    });

    const setup = reactive({
        data: computed(() => props.datas),
        pageNum: 1,
    });

    const pageCount = computed(() => {
        let totalCount = props.datas.length,
            listSize   = props.limit,
            page       = Math.floor((totalCount - 1) / listSize) + 1;

        return page;
    });

    const paginatedData = computed(() => {
        const start = (setup.pageNum - 1) * props.limit,
              end   = start + props.limit;

        return setup.data.slice(start, end);
    });

</script>
