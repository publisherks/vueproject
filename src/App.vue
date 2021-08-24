<template>
    <router-view/>
    <transition
        name="modal"
        appear
    >
        <MessageModal
            title="안내"
            v-if="modalState.messageModal.status"
            :message="modalState.messageModal.message"
        />
    </transition>
</template>

<script setup>
    import { onMounted } from "vue";
    import { state as modalState } from "@/js/pattern/singleton/Modal";
    import MessageModal            from "@/components/Modal/MessageModal";

    onMounted(() => {
        // console.log(process.env)
    })
</script>

<style lang="scss">
    @import "@/assets/scss/main.scss";
</style>
