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
                name      : "Dashboard",
                component : load("views/dashboard/View"),
                meta      : {
                    navigation : "Dashboard",
                },
            },
            {
                path      : "/dashboardSet",
                name      : "DashboardSet",
                component : load("views/dashboard/set/View"),
                meta      : {
                    navigation : "Dashboard Setting",
                },
            },
            {
                path      : "touristSpot",
                component: load(component.children),
                children: [
                    {
                        path      : "",
                        name      : "Tour",
                        component : load("views/tour/List"),
                        meta      : {
                            navigation : "관광정보",
                        },
                    },
                ]
            },
            // {
            //     path      : "festival",
            //     component: load(component.children),
            //     children: [
            //         {
            //             path      : "",
            //             name      : "Festival",
            //             component : load("views/festival/List"),
            //             meta      : {
            //                 navigation : "행사정보",
            //             },
            //         },
            //     ]
            // },
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
                            navigation : "자유 게시판 -> 게시글 보기",
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
                                    navigation : "자유 게시판 -> 게시글 작성",
                                },
                            },
                            {
                                path      : ":postsIdx",
                                name      : "PostsChange",
                                component : load("views/posts/Regist"),
                                meta      : {
                                    navigation : "자유 게시판 -> 게시글 수정",
                                },
                            },
                        ]
                    },
                ]
            },
            {
                path      : "/styleGuide",
                name      : "Styleguide",
                component : load("components/guide/guide"),
                meta      : {
                    navigation : "Style Guide",
                },
            },
        ]
    }
]

const router = createRouter({
    history : createWebHashHistory(),
    routes,
});

export default router;