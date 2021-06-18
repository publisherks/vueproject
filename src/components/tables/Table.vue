<template>
    <div
        class="tb-container"
        :class="props.type === 'row'? 'left-th' : ''"
    >
    <ColListTable
        v-if="props.type === 'col'"
        v-model:datas="props.datas"
    />
    <RowListTable
        v-if="props.type === 'row'"
        v-model:datas="props.datas"
        :width="props.width"
        :columnCount="props.columnCount"
    />
    </div>
</template>
<script setup>
    import ColListTable from "./ColList";
    import RowListTable from "./RowList";
    import { defineProps } from "vue";

    const props = defineProps({
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
        }
    });

</script>
