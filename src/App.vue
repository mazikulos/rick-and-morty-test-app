<template>
    <div class="container mx-auto px-5 pb-5">
        <the-header></the-header>
        <router-view></router-view>
    </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
</script>
