// 코로나 감염 현황
export async function covidState(request) {
    return await $covidTotalApi.get("http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson", request).catch(e => { console.error(e);});
}


export async function covidDecideState(request) {
    return await $covidApi.get("https://nkscorsserver.herokuapp.com/http://apis.data.go.kr/1790387/covid19CurrentStatusKorea/covid19CurrentStatusKoreaJason", request).catch(e => { console.error(e);});
}