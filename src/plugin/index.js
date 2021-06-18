import moment from "moment";

export default {
    install: (app, options) => {
        window.$moment = moment;
    }
};
