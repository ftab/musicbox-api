<template>
    <a @click.prevent="scrollTop" class="scrolltop" href="#top" aria-label="Scroll to top">
        <ChevronCircleUp />
    </a>
</template>

<script setup>
    import ChevronCircleUp from './icons/ChevronCircleUp.vue';

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
</script>
