<template>
    <div
        class="tb-container"
        :class="[
            $attrs.class,
            { 
                'left-th' : props.type === 'row',
                'pos-rel' : props.loading
            }
        ]"
    >
        <ColListTable
            v-if="props.type === 'col'"
            :column="props.column"
            :datas="paginatedData"
            :views="props.views"
            :placeholder="props.placeholder"
            v-model:selectItem="setup.selectItem"
            @btn-event="$emit('btnEvent', $event)"
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
    import { defineProps, reactive, computed, defineEmits, watch } from "vue";
    import ColListTable from "./ColList";
    import RowListTable from "./RowList";

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
            default: 1
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
        },
        placeholder: {
            type: String,
            default: "",
        },
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

    const emit = defineEmits(['update:selectItem', 'btnEvent', 'update:pageNum'])

    const paginatedData = computed(() => {
        const start = (setup.pageNum - 1) * props.limit,
              end   = start + props.limit;

        return setup.data.slice(start, end);
    });

    watch(() => setup.selectItem, (val) => {
        emit('update:selectItem', val)
    })

    watch(() => props.selectItem, (val) => {
        setup.selectItem = val;
    })

    watch(() => setup.pageNum, (val) => {
        emit('update:pageNum', val)
    })

    watch(() => props.pageNum, (val) => {
        setup.pageNum = val
    })
</script>
