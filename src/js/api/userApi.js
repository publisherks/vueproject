// 유저 목록
export async function userList(request) {
    return await $api.get("/users.json", request).catch(e => { console.error(e);});
}