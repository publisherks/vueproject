// 게시글 목록
export async function postsList(request) {
    return await $api.get("/posts", request).catch(e => { console.error(e);});
}

// 게시글 등록
export async function postsCreate(request) {
    return await $api.post("/posts", request).catch(e => { console.error(e);});
}

// 게시글 삭제
export async function postsDelete(id, request) {
    return await $api.delete(`/posts/${id}`, request).catch(e => { console.error(e);});
}

// 게시글 수정
export async function postsModify(id, request) {
    return await $api.patch(`/posts/${id}`, request).catch(e => { console.error(e);});
}
