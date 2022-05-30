import { createApp } from 'vue'
import App           from './App.vue'
import router        from "./router";
import plugin        from "./plugin";

import FontAwesomeIcon from "@/assets/all.css";

// buttons
import BtnGroup     from "@/components/form/BtnGroup";
import Btn          from "@/components/form/Button";
import TabBtn       from "@/components/form/TabBtn";

// grid layout
import VContainer   from "@/components/grid/Container";
import VRow         from "@/components/grid/Row";
import VCol         from "@/components/grid/Col";

// table
import VTable       from "@/components/tables/Table";
import Pagination   from "@/components/tables/Pagination";

// form
import VInput        from "@/components/form/Input";
import VSelect       from "@/components/form/Select";
import VTextarea     from "@/components/form/Textarea";
import VCheck        from "@/components/form/Checkbox";
import VRadio        from "@/components/form/Radiobox";
import VCalendar     from "@/components/form/calendar/calendar";
import VQuantity     from "@/components/form/Quantity";

createApp(App)
    .use(router)
    .use(plugin)
    .use(FontAwesomeIcon)
    .component('BtnGroup', BtnGroup)
    .component('Btn', Btn)
    .component('TabBtn', TabBtn)
    .component('VContainer', VContainer)
    .component('VRow', VRow)
    .component('VCol', VCol)
    .component('VTable', VTable)
    .component('Pagination', Pagination)
    .component('VInput', VInput)
    .component('VSelect', VSelect)
    .component('VTextarea', VTextarea)
    .component('VCheck', VCheck)
    .component('VRadio', VRadio)
    .component('VCalendar', VCalendar)
    .component('VQuantity', VQuantity)
    .mount('#app')
