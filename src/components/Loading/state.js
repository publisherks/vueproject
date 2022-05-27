import { reactive } from "vue";

export const state = reactive({
    loadingStatus : true,
});

export function setLoding (type, val) {
    state[type] = val;
}

