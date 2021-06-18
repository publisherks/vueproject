<template>
    <table>
        <colgroup>
            <col
                v-for="(value) in (columnCount * 2)"
                :key="`col${value}`"
                :width="props.width[(value % 2) === 1 ? 'title' : 'content']"
            />
        </colgroup>
        <tbody>
            <tr
                v-for="(value, index) in columns"
                v-bind:key="`columns${index}`"
            >
                <template
                    v-for="(key, columnIndex) in value"
                    v-bind:key="`columns${index}.column${columnIndex}`"
                >
                    <th
                        :class="{
                            'required' : column[key].required,
                            'required-text' : column[key].requiredText,
                        }"
                    >
                        {{ column[key].label }}
                    </th>
                    <td
                        :class="{
                            'align-l' : column[key].align === 'left',
                            'align-r' : column[key].align === 'right',
                            'align-c' : column[key].align === 'center',
                        }"
                    >
                        <template
                            v-if="!column[key].type && !column[key].children"
                        >
                            {{ setup.lists[key] }}
                        </template>
                        <v-input
                            class="pull"
                            v-if="column[key].type === 'input'"
                            :placeholder="column[key].placeholder"
                            v-model:value="setup.lists[key]"
                        />
                        <v-select
                            class="pull"
                            v-if="column[key].type === 'select'"
                            :datas="column[key].option"
                            v-model:value="setup.lists[key]"
                        />
                        <v-calendar
                            v-if="column[key].type === 'calendar'"
                            v-model:date="setup.lists[key]"
                        />
                    </td>
                </template>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
    import { computed, defineProps, reactive, inject, defineEmit } from "vue";

    const props = defineProps({
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

    const tableData = inject('table2', {})

    const emit = defineEmit(["update:date"], ["update:value"]);

    const setup = reactive({
        lists : computed(() => tableData.datas)
    });

    const column = computed(() => tableData.column);

    const columns = computed(() => {
        let columns = [],
            cols = [],
            count = 0;

        Object.entries(column.value).forEach(([key, value]) => {
            cols.push(key);

            count += Math.ceil((value.colspan ? value.colspan : 1) / 2);

            if (count >= props.columnCount) {
                columns.push(cols);

                cols = [];
                count = 0;
            }
        })

        if(cols.length !== 0) {
            columns.push(cols);
        }
        
        return columns;
    })

</script>
