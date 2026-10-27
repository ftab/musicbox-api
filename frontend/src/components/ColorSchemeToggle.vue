<template>
    <button @click="toggleColorScheme" :title="title" aria-label="Toggle color scheme">
        <SunIcon v-if="colorScheme === 'dark'" />
        <MoonIcon v-if="colorScheme === 'light'" />
    </button>
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue';
    import SunIcon from './icons/SunIcon.vue';
    import MoonIcon from './icons/MoonIcon.vue';

    const colorScheme = ref(null);

    const title = computed(() =>
        colorScheme.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

    const setColorScheme = scheme => {
        colorScheme.value = scheme;
        localStorage.setItem('color-scheme', colorScheme.value);
        document.documentElement.dataset.colorScheme = colorScheme.value;
    };

    const getColorScheme = () => {
        return localStorage.getItem('color-scheme');
    };

    const toggleColorScheme = () => {
        if(colorScheme.value === 'dark') {
            return setColorScheme('light');
        }

        setColorScheme('dark');
    };

    onMounted(() => {
        colorScheme.value = getColorScheme();

        if( ! colorScheme.value) {
            setColorScheme('dark');
        } else {
            setColorScheme(colorScheme.value);
        }
    });
</script>
