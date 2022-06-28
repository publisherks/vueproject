import { reactive } from "vue";

export const state = reactive({
    covidStatus: false,
    covidSidoStatus: false,
    covidGenAgeCaseStatus: false,
    tour: false,
    loadingStatus : false,
});

export function setLoding (type, val) {
    state[type] = val;
}