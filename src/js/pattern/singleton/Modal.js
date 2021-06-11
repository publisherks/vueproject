import { reactive } from "vue";

export const state = reactive({
    passwordChangeModal : false,
});

export function setPasswordChange (boolean) {
    state.passwordChangeModal = boolean;
}