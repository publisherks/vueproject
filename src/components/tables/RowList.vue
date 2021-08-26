<template>
    <table>
        <colgroup>
            <col
                v-for="(value) in (columnCount * 2)"
                :key="`col${value}`"
                :width="props.width[(value % 2) === 1 ? 'title' : 'content']"
            />
            <col
                v-if="props.buttonCell?.width"
                :width="props.buttonCell.width"
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
                            :isDefault="column[key].isDefault"
                            :defaultValue="column[key].defaultValue"
                            :value="column[key].value"
                        />
                        <v-calendar
                            v-if="column[key].type === 'calendar'"
                            v-model:date="setup.lists[key]"
                        />
                        <v-textarea
                            class="pull"
                            v-if="column[key].type === 'textarea'"
                            :placeholder="column[key].placeholder"
                            v-model:value="setup.lists[key]"
                            :class="{
                                'regist-area' : column[key].regist
                            }"
                        />
                    </td>
                </template>
                <td
                    v-if="Object.keys(props.buttonCell).length !== 0"
                    :class="{
                        'align-l' : props.buttonCell.align === 'left',
                        'align-r' : props.buttonCell.align === 'right',
                        'align-c' : props.buttonCell.align === 'center',
                    }"
                >
                    <btn
                        :text="props.buttonCell.text"
                        :kind="props.buttonCell.kind"
                        :iconCls="props.buttonCell.icon"
                        :fn="props.buttonCell.fn"
                    />
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
    import { computed, defineProps, reactive, defineEmit } from "vue";

    const props = defineProps({
        column: {
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
        buttonCell : {
            type: Array,
            default() {
                return {}
            }
        }
    });

    const emit = defineEmit(["update:date"], ["update:value"]);

    const setup = reactive({
        lists : computed(() => props.datas)
    });

    const column = computed(() => props.column);

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
