// 게시글 목록
export async function postsList(request) {
    return await $api.get("/postsjson/posts", request).catch(e => { console.error(e);});
}

// 게시글 등록
export async function postsCreate(request) {
    return await $api.post("/postsjson/posts", request).catch(e => { console.error(e);});
}