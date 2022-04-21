<template>
    <div class="login-wrap">
        <h1
            id="logo"
            class="mb-30">
            <img
                src="@/assets/images/logo.png"
                alt="Wim-MES" />
        </h1>
        <div class="login-form">
            <form @submit.prevent="login">
                <div class="title-box">
                    <p class="input-title">아이디</p>
                </div>
                <v-input 
                    placeholder="placeholder"
                    type="text"
                    v-model:value="setup.id"
                />
                <div class="title-box">
                    <p class="input-title">비밀번호</p>
                </div>
                <v-input 
                    placeholder="placeholder"
                    type="password"
                    v-model:value="setup.password"
                />
                <button
                    tabindex="-1"
                    type="submit"
                    class="btn lg btn-main w-100 mt-30"
                >
                    로그인
                </button>
            </form>
        </div>
    </div>
</template>
<script setup>
    import { computed, reactive } from "vue";
    import store from "@/store";

    const setup = reactive({
        id : "",
        password : "",
    })

    const login = () => {
        
    }
</script>
<style lang="scss" scoped="scoped">
@import "/src/assets/scss/pages/login";
</style>
