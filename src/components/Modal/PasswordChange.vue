<template>
    <div
        class="modal modal-overlay"
        v-on:click.self="modalCloseHook"
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
                <div class="tb-container left-th">
                    <table>
                        <colgroup>
                            <col width="25%">
                            <col width="">
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>비밀번호</th>
                                <td>
                                    <VInput
                                        :boxAttr="{
                                            class: 'pull'
                                        }"
                                        placeholder="변경할 비밀번호를 입력해주세요."
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>비밀번호 확인</th>
                                <td>
                                    <VInput
                                        :boxAttr="{
                                            class: 'pull'
                                        }"
                                        placeholder="비밀번호를 다시 한 번 입력해주세요."
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="btn-box flex-c mt-30">
                    <button
                        type="button"
                        class="btn btn-cancel"
                        v-on:click="modalCloseHook"
                    >
                        <i class="fal fa-times"></i>취소
                    </button>
                    <button
                        type="button"
                        class="btn btn-main ml-20"
                        v-on:click="modalConfirmHook"
                    >
                        <i class="fal fa-check"></i>확인
                    </button>
                </div>
            </div>
            <slot/>
        </div>
    </div>
</template>
<script setup>

    import { state }       from "@/js/pattern/singleton/Modal";
    import { defineProps } from "vue";

    const props = defineProps({
        title   : {
            type    : String,
            default : "",
        },
    });

    const modalCloseHook = () => {
        state.passwordChangeModal = false;
    };

    const modalConfirmHook = () => {
        state.passwordChangeModal = true;
    };
</script>
<style lang="scss" scoped>
.modal-contanier {
    width: 600px;
}
</style>
