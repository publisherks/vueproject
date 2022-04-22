<template>
    <aside
        id="sideNav">
        <h2 class="logo">
            <img
                src="@/assets/images/logo.png"
                alt="" />
        </h2>
        <a
            href="#"
            class="side-btn"
            @click="setLeftReduce(layoutState.leftReduce = !layoutState.leftReduce)"
        >
            <i
                class="fal"
                :class="{
                    'fa-long-arrow-left' : layoutState.leftReduce === false,
                    'fa-long-arrow-right' : layoutState.leftReduce
                }"
            ></i>
        </a>
        <Navi />
    </aside>
</template>

<script setup>
    import Navi     from "@/layout/Navi";

    import { state as layoutState, setLeftReduce } from "@/js/pattern/singleton/Layout";
</script>