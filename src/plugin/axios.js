import axios from "axios";

import { reactive, watch } from "vue";
import { state, setLoding } from "@/components/Loading/state";
import { setMessageModal } from "@/js/pattern/singleton/Modal";

const setup = reactive({
    apiRequestStatus: false,
});

const api = axios.create({
    baseURL: process.env.VUE_APP_API,
    // headers: {
    //     "Content-Type": `application/json`
    // }
});

// 국회정보 key
const petitionKey = "a878d7a7c5f84397afcd772a1340fe2f";
// 코로나 정보 key
const covidKey = "uBa47fFhzx4TAiwEhOwGmedr9H7OvRQJh1QmZG08GM7kN0MPsrjyPk8JdnWmpHqQiAyFqTDyvku4Xepd9yj+yg==";

// 국회정보
const petitionApi = axios.create({
    baseURL: "https://open.assembly.go.kr/portal/openapi",
    params: {
        key: petitionKey,
        type: "json"
    }
});

// 코로나 정보
const covidApi = axios.create({
    baseURL: "https://nkscorsserver.herokuapp.com/http://openapi.data.go.kr/openapi/service/rest/Covid19",
    params: {
        serviceKey: covidKey,
    },
});

const covidSidoApi = axios.create({
    baseURL: "https://nkscorsserver.herokuapp.com/http://openapi.data.go.kr/openapi/service/rest/Covid19",
    params: {
        serviceKey: covidKey,
    },
});

const apiLoding = (api, key) => {
    api.interceptors.request.use(request => {
        setLoding(key, true);
        console.log(key, state);
        return request;
    }, error => {
        setLoding(key, false);
        messagePopup('데이터를 불러오지 못하였습니다.');
    })

    api.interceptors.response.use(response => {
        setLoding(key, false);
        console.log(key, state);
        return response;
    }, error => {
        setLoding(key, false);
        messagePopup('데이터를 불러오지 못하였습니다.');
    })
}

apiLoding(covidApi, "covidStatus");
apiLoding(covidSidoApi, "covidSidoStatus");

// covidApi.interceptors.request.use(request => {
//     setLoding("covidStatus", true);
//     console.log(state);
//     return request;
// }, error => {
//     setLoding("covidStatus", false);
//     messagePopup('데이터를 불러오지 못하였습니다.');
// })

// covidApi.interceptors.response.use(response => {
//     setLoding("covidStatus", false);
//     console.log(state);
//     return response;
// }, error => {
//     setLoding("covidStatus", false);
//     messagePopup('데이터를 불러오지 못하였습니다.');
// })

const messagePopup = (message) => {
    setMessageModal({
        status: true,
        message: message,
    });
};

export {
    api,
    petitionApi,
    covidApi,
    covidSidoApi
};