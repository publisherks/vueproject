// 지역 코드 조회
export async function areaCode(request) {
    return await $tourApi.get("/areaCode", request).catch(e => { console.error(e);});
}

// 지역기반 관광정보 조회
export async function areaBasedList(request) {
    return await $tourApi.get("/areaBasedList", request).catch(e => { console.error(e);});
}

// 공통정보 조회
export async function detailCommon(request) {
    return await $tourApi.get("/detailCommon", request).catch(e => { console.error(e);});
}

// 소개정보 조회
export async function detailIntro(request) {
    return await $tourApi.get("/detailIntro", request).catch(e => { console.error(e);});
}

// 소개정보 조회
export async function detailInfo(request) {
    return await $tourApi.get("/detailInfo", request).catch(e => { console.error(e);});
}

// 이미지정보 조회
export async function detailImage(request) {
    return await $tourApi.get("/detailImage", request).catch(e => { console.error(e);});
}