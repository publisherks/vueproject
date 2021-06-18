<template>
    <button
        :type="props.type"
        :class="{
            'btn' : props.size !== 'small',
            'btn-tb' : props.size === 'small',
            'btn-main' : props.kind === 'main',
            'btn-sub1' : props.kind === 'sub1',
            'btn-sub2' : props.kind === 'sub2',
            'btn-cancel' : props.kind === 'cancel',
            'btn-delete' : props.kind === 'delete',
        }"
        @click="props.fn"
    >
        <i
            v-if="props.isIcon"
            :class="props.iconCls"
        ></i>{{ props.text }}
    </button>
</template>
<script setup>
    import { defineProps } from "vue";

    const props = defineProps({
        // 버튼 텍스트
        text: {
            type: String,
            default: "",
        },

        // 버튼 타입
        type: {
            type: String,
            default: "button",
        },

        // 버튼 종류 ( main, sub1, sub2 ... )
        kind: {
            type: String,
            default: "",
        },

        // 아이콘 여부
        isIcon: {
            type: Boolean,
            default: true,
        },

        // 아이콘 클래스
        iconCls: {
            type: String,
            default: "",
        },

        // 버튼 크기 
        size: {
            type: String,
            default: "",
        },

        fn: {
            type: Function,
        }
    })
</script>
