// 게시글 목록
export async function posts(request) {
    return await $api.get("/posts.json", request).catch(e => { console.error(e);});
}