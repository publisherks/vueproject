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
        <div
            class="user"
            :class="{ open: setup.userMenuOpen }"
        >
            <i
                class="fal fa-user-circle"
                v-on:click="setup.userMenuOpen = !setup.userMenuOpen"
            ></i>
            <div class="user-menu">
                <table>
                    <tbody>
                        <tr>
                            <td>0001</td>
                        </tr>
                        <tr>
                            <td>maum0001</td>
                        </tr>
                        <tr>
                            <td>정훈</td>
                        </tr>
                    </tbody>
                </table>
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
                    <li @click="setPasswordChange(true)">비밀번호 변경</li>
                    <li @click="logout">로그아웃</li>
                </ul>
            </div>
        </div>
    </div>
    <transition
        name="modal"
        appear
    >
        <password-change-modal 
            v-if="state.passwordChangeModal"
            title="비밀번호 변경"
        />
    </transition>
</template>
<script setup>
    import Navi     from "@/layout/Navi";
    import CateNav  from "@/layout/CateNav";
    
    import { state as layoutState, setLeftMenu } from "@/js/pattern/singleton/Layout";
    import { state, setPasswordChange }       from "@/js/pattern/singleton/Modal";
    
    import passwordChangeModal from "@/components/Modal/PasswordChange";

    import { reactive } from "vue";

    const setup = reactive({
        userMenuOpen: false,
    })
</script>