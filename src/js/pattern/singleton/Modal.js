import { reactive } from "vue";

export const state = reactive({
    passwordChangeModal : false,
    tourViewModal: false,
    messageModal : {
        status : false,
        message : "",
    }
});

export function setPasswordChange (boolean) {
    state.passwordChangeModal = boolean;
}

export function setTourView (boolean) {
    state.tourViewModal = boolean;
}

export function setMessageModal (options) {
    state.messageModal = options;
}
