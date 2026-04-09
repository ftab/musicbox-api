<template>
    <h2>Uh oh!</h2>
    <p>Looks like this track got lost in the queue...</p>
    <RouterLink :to="{ name: 'home' }">Take me back home</RouterLink>
</template>

<script setup>
    import { onMounted, onUnmounted } from 'vue';
    import { setPageTitle } from '../utils';

    onMounted(() => {
        document.documentElement.classList.add('error');

        setPageTitle('Uh oh');
    });

    onUnmounted(() => document.documentElement.classList.remove('error'));
</script>

<style>
    html.error body {
        display: grid;
        place-content: center;
        text-align: center;
        background: light-dark(var(--color-lighter), var(--color-darkest));
        min-height: 100svh;
    }
</style>
