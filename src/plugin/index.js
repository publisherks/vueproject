import moment from "moment";
import * as axios from "@/plugin/axios";

export default {
    install: (app, options) => {
        window.$moment = moment;
        window.$api = axios.api;
        window.$petitionApi = axios.petitionApi;
        window.$covidApi = axios.covidApi;
        window.$covidSidoApi = axios.covidSidoApi;
        window.$covidGenAgeCaseApi = axios.covidGenAgeCaseApi;
        window.$tourApi = axios.tourApi;
    }
};
