<template>
    <div class="tab-btn">
        <button
            type="button"
            v-for="(item, index) in props.datas"
            :key="`tab-btn-${index}`"
            :class="{
                'btn' : item.size !== 'small',
                'btn-tb' : item.size === 'small',
                'btn-main' : item.kind === 'main',
                'btn-sub1' : item.kind === 'sub1',
                'btn-sub2' : item.kind === 'sub2',
                'btn-cancel' : item.kind === 'cancel',
                'btn-delete' : item.kind === 'delete',
                'active' : item.value === props.value
            }"
            @click="emit('update:value', item)"
        >
            {{ item.text }}
        </button>
    </div>
</template>
<script setup>
    import { defineProps, defineEmits } from "vue";
    
    const props = defineProps({
        // 탭버튼 데이터
        /*
            ex)
            Array[
                text: "버튼 텍스트",
                value: 1,
                kind: "main", // 버튼 종류 ( main, sub1, sub2 ... )
                size: "" || "small"
            ]
        */
        datas: {
            type: Array,
            default() {
                return [];
            }
        },
        value: {},
    });
    
    const emit = defineEmits(["update"]);
</script>