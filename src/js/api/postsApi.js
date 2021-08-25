// 게시글 목록
export async function postsList(request) {
    return await $api.get("/postsapi", request).catch(e => { console.error(e);});
}

// 게시글 등록
export async function postsCreate(request) {
    return await $api.post("/postsapi", request).catch(e => { console.error(e);});
}