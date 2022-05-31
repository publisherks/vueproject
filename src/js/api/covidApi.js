// 코로나 감염 현황
export async function covidInfState(request) {
    return await $covidApi.get("/getCovid19InfStateJson", request).catch(e => { console.error(e);});
}

// 코로나 시/도별 감염 현황
export async function covidSidoInfState(request) {
    return await $covidSidoApi.get("/getCovid19SidoInfStateJson", request).catch(e => { console.error(e);});
}

// 코로나 성/연령 감염 현황
export async function covidGenAgeCaseInf(request) {
    return await $covidGenAgeCaseApi.get("/getCovid19GenAgeCaseInfJson", request).catch(e => { console.error(e);});
}