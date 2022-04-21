import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

function load(name) {
    return () => import (`@/${name}.vue`)
}

const component = {
    children: "components/router/View"
};

const routes = [
    {
        path: "/login",
        name: "LoginLayout",
        component: load("layout/LoginLayout"),
        children: [
            {
                path: "",
                name: "login",
                component: load("views/login/Login"),
                meta: {
                    ignore: true
                }
            }
        ]
    },
    {
        path: "/",
        name: "MainLayout",
        component: load("layout/MainLayout"),
        children  : [
            {
                path      : "/",
                name      : "Styleguide",
                component : load("components/guide/guide"),
                meta      : {
                    navigation : "Style Guide",
                },
            },
            {
                path      : "posts",
                component: load(component.children),
                children: [
                    {
                        path      : "",
                        name      : "Posts",
                        component : load("views/posts/List"),
                        meta      : {
                            navigation : "자유 게시판",
                        },
                    },
                    {
                        path      : ":postsIdx",
                        name      : "PostsView",
                        component : load("views/posts/View"),
                        meta      : {
                            navigation : "게시글 보기",
                        },
                    },
                    {
                        path      : "regist",
                        component : load(component.children),
                        children  : [
                            {
                                path      : "",
                                name      : "PostsRegist",
                                component : load("views/posts/Regist"),
                                meta      : {
                                    navigation : "게시글 작성",
                                },
                            },
                            {
                                path      : ":postsIdx",
                                name      : "PostsChange",
                                component : load("views/posts/Regist"),
                                meta      : {
                                    navigation : "게시글 수정",
                                },
                            },
                        ]
                    },
                ]
            },
            {
                path      : "petitionMoorage",
                component: load(component.children),
                children: [
                    {
                        path      : "",
                        name      : "PetitionMoorage",
                        component : load("views/petitionMoorage/List"),
                        meta      : {
                            navigation : "청원 계류현황",
                        },
                    }
                ]
            },
            {
                path      : "petitionProcessing",
                component: load(component.children),
                children: [
                    {
                        path      : "",
                        name      : "PetitionProcessing",
                        component : load("views/petitionProcessing/List"),
                        meta      : {
                            navigation : "청원 계류현황",
                        },
                    }
                ]
            },
        ]
    }
]

const router = createRouter({
    history : createWebHistory(),
    routes,
});

export default router;