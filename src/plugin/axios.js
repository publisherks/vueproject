import axios from "axios";

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
    params: {
        serviceKey: covidKey,
    },
});

export {
    api,
    petitionApi,
    covidApi
};