<template>
    <div id="nav">
        <ul>
            <li
                v-for="({path ,icon ,menuName} , menuItemIndex) in setup.menuItems"
                :key="menuItemIndex"
            >
                <router-link 
                    :to="path"
                    :class="MENU.isChioce(path) ? 'on' : ''"
                >
                    <i :class="icon"></i>{{ menuName }}
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script setup>
    import menuItems from "@/js/menu.js";
    import { onMounted, reactive } from "vue";
    import { useRoute, useRouter } from "vue-router";

    const route  = useRoute();
    const router = useRouter();

    const setup = reactive({
        menuItems : menuItems,
    });

    const MENU = {
        setMenu: () => {
            menuItems.forEach(({path, icon, menuName}, index ) => {
                // console.log(path, icon, menuName, index);
            })
        },

        isChioce: (path) => {
            // return path === router.currentRoute.value.path ? true : false;
            return path.split('/')[1] === router.currentRoute.value.path.split('/')[1] ? true : false;
        }
    }

    onMounted(() => {
        // MENU.isChioce();
    })
</script>