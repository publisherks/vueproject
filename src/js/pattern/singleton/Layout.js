import { reactive } from "vue";

export const state = reactive({
    leftMenu : !localStorage.getItem("leftMenu") ? true : false,
    leftReduce : localStorage.getItem("leftReduce") ? true : false,
    isCate : true,
    isTheme : !localStorage.getItem("lightTheme") ? 'default' : 'light',
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

export function setIsTheme (theme) {
    state.isTheme = theme;
    theme === 'default' ? localStorage.removeItem('lightTheme', true) : localStorage.setItem('lightTheme', true);
}