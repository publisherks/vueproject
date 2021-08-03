import { createRouter, createWebHistory } from 'vue-router';

function load(name) {
    return () => import (`@/${name}.vue`)
}

const routes = [
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
                path      : "/posts",
                name      : "Posts",
                component : load("views/posts/List"),
                meta      : {
                    navigation : "게시판",
                },
            },
        ]
    }
]

const router = createRouter({
    history : createWebHashHistory('/vueproject/'),
    routes,
});

export default router;