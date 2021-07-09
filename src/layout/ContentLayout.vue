<template>
    <div id="container">
        <TopLayout />
        <div 
            class="contents"
            v-bind:class="{ 'hide-cate-navi' : !layoutState.leftMenu && !layoutState.isCate }"
        >
            <CateNav 
                class="mb-20 mt-15"
                v-if="!layoutState.leftMenu && layoutState.isCate"
            />
            <router-view
                :title="title"
            />
        </div>
    </div>
</template>

<script setup>
    import TopLayout from "@/layout/TopLayout";
    import CateNav  from "@/layout/CateNav";

    import { state as layoutState } from "@/js/pattern/singleton/Layout";

    import { computed, reactive } from "vue";
    import { useRoute } from "vue-router";

    const routes = useRoute();

    const setup = reactive({
        navigation: computed(() => routes.meta.navigation),
    });

    const title = computed(() => {
        return setup.navigation?.split("->")[setup.navigation?.split("->").length-1];
    });
</script>
