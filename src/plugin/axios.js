import axios from "axios";

import { reactive, watch } from "vue";
import { setLoding } from "@/components/Loading/state";
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
// 공공데이터 포털 인증key
const dataKey = process.env.VUE_APP_DATA_KEY;

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
        serviceKey: dataKey,
    },
});

const covidSidoApi = axios.create({
    baseURL: "https://nkscorsserver.herokuapp.com/http://openapi.data.go.kr/openapi/service/rest/Covid19",
    params: {
        serviceKey: dataKey,
    },
});

const covidGenAgeCaseApi = axios.create({
    baseURL: "https://nkscorsserver.herokuapp.com/http://openapi.data.go.kr/openapi/service/rest/Covid19",
    params: {
        serviceKey: dataKey,
    },
});


// 코로나 정보
const tourApi = axios.create({
    baseURL: "https://nkscorsserver.herokuapp.com/http://api.visitkorea.or.kr/openapi/service/rest/KorService",
    params: {
        serviceKey: dataKey,
        MobileOS: "ETC",
        MobileApp: "AppTest"
    },
});

const apiLoding = (api, key) => {
    api.interceptors.request.use(request => {
        setLoding(key, true);
        return request;
    }, error => {
        setLoding(key, false);
        messagePopup('데이터를 불러오지 못하였습니다.');
    })

    api.interceptors.response.use(response => {
        setLoding(key, false);
        return response;
    }, error => {
        setLoding(key, false);
        messagePopup('데이터를 불러오지 못하였습니다.');
    })
}

apiLoding(covidApi, "covidStatus");
apiLoding(covidGenAgeCaseApi, "covidGenAgeCaseStatus");


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
    covidSidoApi,
    covidGenAgeCaseApi,
    tourApi
};