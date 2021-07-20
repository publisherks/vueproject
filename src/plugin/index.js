import moment from "moment";
// import * as axios from "@/plugin/axios";

export default {
    install: (app, options) => {
        window.$moment = moment;
        // window.$api = axios.api;
    }
};
