import { createApp } from "vue";
import App           from "./App.vue";
import router        from "./router";

import FontAwesomeIcon from "@/assets/all.css";

const app = createApp(App);
app.use(router).use(FontAwesomeIcon);
app.mount('#app')
