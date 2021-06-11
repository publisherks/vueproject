<template>
    <p class="cate-nav" v-if="setup.navigation">
        <template v-for="( menu, index ) in cate.setNavi()">
            <template v-if="!cate.isLast(index)">
                {{ menu }}
            </template>
            <strong 
                :key="`cate${index}`"
                v-else
            >
                {{ menu }}
            </strong>
            <i
                class="fas fa-chevron-right"
                v-if="!cate.isLast(index)"
                :key="`cate${index}`"
            ></i>
        </template>
    </p>
</template>
<script setup>
    import { state as cateState, setIsCate } from "@/js/pattern/singleton/Layout";

    import { computed, onMounted, reactive } from "vue";
    import { useRoute, useRouter } from "vue-router";

    const route = useRoute();
    const router = useRouter();

    const setup = reactive({
        navigation: computed(() => route?.meta?.navigation?.split("->")),
    });

    const cate = {
        setNavi: () => {
            return setup.navigation || [];
        },

        isLast: (index) => {
            return setup.navigation.length - 1 === index;
        },

        isExistence: () => {
            cateState.isCate = setup.navigation ? true : false;
        },
    };

    onMounted(() => {
        cate.isExistence();
    })
</script>