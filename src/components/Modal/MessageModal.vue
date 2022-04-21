<template>
    <div
        class="modal modal-overlay"
        @:click.self="modalCloseHook"
        @:keyup.enter="modalConfirmHook"
    >
        <div class="modal-contanier">
            <div class="modal-top">
                <h3 class="sub-title">{{ title }}</h3>
                <a
                    href="#n"
                    class="close-btn"
                    v-on:click="modalCloseHook"
                >
                    <i class="fal fa-times"></i>
                </a>
            </div>
            <div class="modal-contents">
                <p
                    v-html="message"
                    class="sub-text mb-30 align-c"
                >
                </p>
                <div class="btn-box flex-c mt-30">
                    <btn
                        text="확인"
                        kind="main"
                        iconCls="fal fa-check"
                        :fn="modalConfirmHook"
                        ref="confirmBtn"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { state } from "@/js/pattern/singleton/Modal";
    import { defineProps, ref } from "vue";

    const props = defineProps({
        title: {
            type: String,
            default: "",
        },
        message: {
            type: String,
        },
    });

    const modalCloseHook = () => {
        state.messageModal.status = false;
    };

    const modalConfirmHook = () => {
        state.messageModal.status = false;
        state.messageModal.callback?.();
        console.log(state.messageModal.callback?.());
    };

    const autoFocus = () => {
        const confirmBtn = ref(null);

        if (state.messageModal.focus) {
            confirmBtn.value.focus();
        }
    };
</script>
<style lang="scss" scoped>
.modal-contanier {
    width: 400px;
}
</style>