<template>
    <table>
        <colgroup>
            <col 
                v-for="(value, key) in columns"
                :key="`col-${key}`"
                :width="value.width"
            />
        </colgroup>
        <thead>
            <tr>
                <th
                    v-for="(value, key) in columns"
                    :key="`th-${key}`"
                >
                    {{ value.label }}
                </th>
            </tr>
        </thead>
        <tbody>
            <template
                v-if="isEmpty(setup.lists) === false"
            >
                <tr
                    v-for="(item, index) in setup.lists"
                    :key="`tr-${index}`"
                >
                    <td
                        v-for="(value, key) in columns"
                        :key="`tr-${index}.td-${key}`"
                        :class="{
                            'align-l' : value.align === 'left',
                            'align-r' : value.align === 'right',
                            'cursor-p': props.views === true,
                            'img-td' : value.type === 'image'
                        }"
                        @click="props.views === true ? $emit('update:selectItem', item) : ''"
                    >
                        <template
                            v-if="!value.type && !value.children && !value.option"
                        >
                            {{ isEmpty(item[key]) ? '-' : item[key] }}
                        </template>
                        <div
                            v-if="value.option?.ellipsis"
                            :class="value.option?.ellipsis ? 'ell-'+value.option?.ellipsisLine : ''"
                            v-html="isEmpty(item[key]) ? '-' : item[key]"
                        />
                        <v-input
                            v-if="value.type === 'input'"
                            class="pull"
                            :placeholder="value.placeholder"
                            v-model:value="item[key]"
                        />
                        <v-select
                            v-if="value.type === 'select'"
                            class="pull"
                            v-model:value="item[key]"
                            :datas="value.option"
                        />
                        <img
                            v-if="value.type === 'image' && isEmpty(item[key]) === false"
                            :src="item[key]"
                        />
                        <template
                            v-if="value.type === 'image' && isEmpty(item[key])"
                        >-</template>
                        <template 
                            v-if="value.children && value.type === 'button'"
                        >
                            <btn
                                v-for="(childItem, childIndex) in value.children"
                                :key="`tr-${index}.td-${key}.btn-${childIndex}`"
                                size="small"
                                :text="childItem.text"
                                :kind="childItem.kind"
                                :iconCls="childItem.icon"
                                :class="{
                                    'ml-10' : childIndex > 0
                                }"
                                @click="$emit('btnEvent', item)"
                            />
                        </template>
                    </td>
                </tr>
            </template>
            <template
                v-else
            >
                <tr>
                    <td
                        :colspan="Object.keys(columns).length"
                    >
                        {{ props.placeholder ?? `데이터가 없습니다.` }}
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
</template>
<script setup>
    import { reactive, computed, defineProps, watch } from "vue";
    import { isEmpty }  from "@/js/common/common";

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
        placeholder: {
            type: String,
            default: "",
        },
    })

    const setup = reactive({
        lists : computed(() => props.datas),
        selectItem: {},
    });

    const emit = defineEmits(['update:selectItem', 'btnEvent'])

    const columns = computed(() => {
        let column = {};

        Object.entries(props.column).forEach(([key, value]) => {
            column[key] = value;
        });

        return column;
    });

    const listClick = (value) => {
        setup.selectItem = value;
    }

    watch(() => setup.selectItem, (val) => {
        emit('update:selectItem', val)
    });

    watch(() => props.selectItem, (val) => {
        setup.selectItem = val;
    });

    // const clickEvent = (value) => {
    //     emit('update:selectItme', value)
    // }

    // const btnClick = (item, index, chIdx) => {
    //     console.log(11, item, index, chIdx)
    //     emit('btnEvent', {item, index, chIdx})
    // }
</script>
