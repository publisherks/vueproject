// 게시글 목록
export async function widgetList(request) {
    return await $api.get("/widget", request).catch(e => { console.error(e);});
}

// 게시글 수정
export async function widgetModify(id, request) {
    return await $api.patch(`/widget/${id}`, request).catch(e => { console.error(e);});
}