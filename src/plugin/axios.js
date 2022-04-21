import axios from "axios";

const api = axios.create({
    baseURL: process.env.VUE_APP_API,
    // headers: {
    //     "Content-Type": `application/json`
    // }
});

// 국회정보 key
const key = "a878d7a7c5f84397afcd772a1340fe2f";

// 국회정보
const petitionApi = axios.create({
    baseURL: "https://open.assembly.go.kr/portal/openapi",
    params: {
        key: key,
        type: "json"
    }
});

export {
    api,
    petitionApi
};