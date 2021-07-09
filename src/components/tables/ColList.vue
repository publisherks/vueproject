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
            <tr
                v-for="(item, index) in setup.lists"
                :key="`tr-${index}`"
            >
                <td
                    v-for="(value, key) in columns"
                    :key="`tr-${index}.td-${key}`"
                    :class="{
                        'align-l' : value.align === 'left',
                        'align-r' : value.align === 'right'
                    }"
                >
                    <template
                        v-if="!value.type && !value.children"
                    >
                        {{ item[key] }}
                    </template>
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
                            :fn="childItem.fn"
                        />
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
    import { reactive, computed, defineProps } from "vue";

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
        }
    })

    const setup = reactive({
        lists : computed(() => props.datas),
    });

    const columns = computed(() => {
        let column = {};

        Object.entries(props.column).forEach(([key, value]) => {
            column[key] = value;
        });

        return column;
    });
</script>
