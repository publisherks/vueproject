<template>
    <div
        id="wrap"
        :class="{ 
            'reduce' : layoutState.leftReduce,
            'posTop' : !layoutState.leftMenu
        }"
    >
        <LeftLayout
            v-if="layoutState.leftMenu"/>
        <ContentLayout />
    </div>
</template>

<script setup>
    import LeftLayout    from "@/layout/LeftLayout";
    import ContentLayout from "@/layout/ContentLayout";

    import { state as layoutState } from "@/js/pattern/singleton/Layout";
</script>
