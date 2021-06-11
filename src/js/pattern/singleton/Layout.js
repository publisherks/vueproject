import { reactive } from "vue";

export const state = reactive({
    leftMenu : !localStorage.getItem("leftMenu") ? true : false,
    leftReduce : localStorage.getItem("leftReduce") ? true : false,
    isCate : true,
});

export function setLeftMenu (boolean) {
    state.leftMenu = boolean;
    state.leftMenu ? localStorage.removeItem("leftMenu") : localStorage.setItem("leftMenu", true);
}

export function setLeftReduce (boolean) {
    state.leftReduce = boolean;
    state.leftReduce ? localStorage.setItem("leftReduce", true) : localStorage.removeItem("leftReduce");
}

export function setIsCate (boolean) {
    state.isCate = boolean;
}