<template>
    <a @click.prevent="scrollTop" class="scrolltop" href="#top" aria-label="Scroll to top">
        <ChevronCircleUp />
    </a>
</template>

<script setup>
    import ChevronCircleUp from './icons/ChevronCircleUp.vue';

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
</script>

<style>
    .scroll-top {
        display: none;
    }

    @supports(animation-timeline: scroll()) {
        .scroll-top {
            display: initial;
            position: fixed;
            bottom: 3rem;
            right: 1rem;
            opacity: 0;
            z-index: 1;
            animation: show linear both;
            animation-timeline: scroll();
            animation-range: 400px 500px;

            & svg {
                width: 3rem;
                fill: light-dark(var(--color-accent-dark), var(--color-accent-light));
            }
        }

        @keyframes show {
            to { opacity: 1; }
        }
    }
</style>
