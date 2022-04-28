<template>
    <div class="top-container">
        <h1 class="logo">
            <router-link to="/">
                <img
                    src="@/assets/images/logo.png"
                    alt="wimMES"
                />
            </router-link>
        </h1>
        <Navi v-if="!layoutState.leftMenu" />
        <CateNav v-if="layoutState.leftMenu" />
        <ToggleTheme />
        <div
            class="user ml-10"
            :class="{ open: setup.userMenuOpen }"
        >
            <i
                class="fal fa-user-circle"
                v-on:click="setup.userMenuOpen = !setup.userMenuOpen"
            ></i>
            <div class="user-menu">
                <ul>
                    <li @click="setLeftMenu(layoutState.leftMenu = !layoutState.leftMenu)">
                        <template
                            v-if="!layoutState.leftMenu">
                            왼쪽메뉴로 보기
                        </template>
                        <template
                            v-if="layoutState.leftMenu">
                            상단메뉴로 보기
                        </template>
                    </li>
                    <li 
                        @click="router.push('/dashboardSet')"
                        :class="{
                            on: router.currentRoute.value.path.split('/')[1] === 'dashboardSet'
                        }"
                    >
                            대시보드 설정
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
    import Navi     from "@/layout/Navi";
    import CateNav  from "@/layout/CateNav";
    import ToggleTheme  from "@/layout/ToggleTheme";
    
    import { state as layoutState, setLeftMenu } from "@/js/pattern/singleton/Layout";
    
    import { reactive } from "vue";
    import { useRoute, useRouter } from "vue-router";

    const router = useRouter();

    const setup = reactive({
        userMenuOpen: false,
    })

    console.log();
</script>