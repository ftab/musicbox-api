<template>
    <a @click.prevent="scrollTop" class="scroll-top" href="#top">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM377 271c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-87-87-87 87c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L239 167c9.4-9.4 24.6-9.4 33.9 0L377 271z"/>
        </svg>
    </a>
</template>

<script setup>
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
            bottom: 1rem;
            right: 1rem;
            opacity: 0;
            z-index: 1;
            animation: show linear both;
            animation-timeline: scroll();
            animation-range: 400px 500px;

            & svg {
                width: 3rem;
                fill: var(--color-accent-light);
            }
        }

        @keyframes show {
            to { opacity: 1; }
        }
    }
</style>
