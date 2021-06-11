import { createApp } from "vue";
import App           from "./App.vue";
import router        from "./router";

import FontAwesomeIcon from "@/assets/all.css";

// 공통 컴포넌트
// 버튼 관련
import BtnContainer from "@/components/form/BtnContainer";
import Btn          from "@/components/form/Button";

// grid layout
import VContainer    from "@/components/grid/Container";
import VRow          from "@/components/grid/Row";
import VCol          from "@/components/grid/Col";

const app = createApp(App);
app.use(router).use(FontAwesomeIcon);
app.component('BtnContainer', BtnContainer)
    .component('Btn', Btn)
    .component('VContainer', VContainer)
    .component('VRow', VRow)
    .component('VCol', VCol);
app.mount('#app')
