// 유저 목록
export async function userList(request) {
    return await $api.get("/usersjson/users", request).catch(e => { console.error(e);});
}