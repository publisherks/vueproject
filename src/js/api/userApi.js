// 유저 목록
export async function userList(request) {
    return await $api.get("/usersapi", request).catch(e => { console.error(e);});
}