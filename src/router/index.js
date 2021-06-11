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
                path      : "/styleguide",
                name      : "Styleguide",
                component : load("components/guide/guide"),
                meta      : {
                    navigation : "Style Guide",
                },
            },
            {
                path      : "/styleguide",
                name      : "Styleguide",
                component : load("components/guide/guide"),
                meta      : {
                    navigation : "Style Guide -> guide",
                },
            },
        ]
    }
]

const router = createRouter({
    history : createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;