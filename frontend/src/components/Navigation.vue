<template>
    <Teleport to=".header-buttons" defer>
        <button @click="toggleNav" class="site-nav-toggle" aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="icon">
                <path d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z"/>
            </svg>
        </button>
    </Teleport>

    <Transition name="slide">
        <nav v-show="isOpen" class="site-nav">
            <button @click="toggleNav" class="site-nav-close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="icon">
                    <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/>
                </svg>
            </button>
            <RouterLink :to="{ name: 'home' }" active-class="active" class="site-nav-link" title="Leaderboard">Leaderboard</RouterLink>
            <RouterLink :to="{ name: 'top-tracks' }" active-class="active" class="site-nav-link" title="Top Tracks">Top Tracks</RouterLink>
            <RouterLink :to="{ name: 'activity' }" active-class="active" class="site-nav-link" title="Activity">Activity</RouterLink>
            <RouterLink :to="{ name: 'peepee' }" active-class="active" class="site-nav-link" title="PP Leaderboard">🍆</RouterLink>
            <RouterLink :to="{ name: 'search' }" active-class="active" class="site-nav-link" title="Search">Search</RouterLink>
            <RouterLink :to="{ name: 'help' }" active-class="active" class="site-nav-link" title="Help">Help</RouterLink>
            <RouterLink :to="{ name: 'api-docs' }" active-class="active" class="site-nav-link" target="_blank" title="API Docs">API</RouterLink>
        </nav>
    </Transition>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';

    const isOpen = ref(false);
    const route = useRoute();

    watch(() => route.path, () => {
        isOpen.value = false;
    });

    const toggleNav = () => {
        isOpen.value = ! isOpen.value;
    };
</script>

<style>
    .site-nav {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        width: 70vw;
        padding: 2rem;
        background-color: light-dark(var(--color-lighter), var(--color-darkest));
        box-shadow: 0 0 10px light-dark(var(--color-light), var(--color-darkest));
        margin: 0;
        overflow-y: auto;
        overflow-x: clip;
        z-index: 2;
    }

    .site-nav-link {
        color: light-dark(var(--color-neutral-light), var(--color-neutral-dark));
        text-decoration: none;
        white-space: nowrap;
        transition: color 300ms ease-in-out;
    }

    .site-nav-link:hover {
        color: light-dark(var(--color-dark), var(--color-light));
    }

    .site-nav-link.active {
        color: light-dark(var(--color-accent-dark), var(--color-accent-light));
    }

    .site-nav-close {
        position: absolute;
        top: 2rem;
        right: 2rem;
        background: none;
        width: 1.5rem;
        height: 1.5rem;
        margin-left: auto;
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: transform 250ms ease;
    }

    .slide-enter-from,
    .slide-leave-to {
        transform: translateX(-100%);
    }

    .slide-enter-to,
    .slide-leave-from {
        transform: translateX(0);
    }

    @media(width >= 567px) {
        .site-nav-close,
        .site-nav-toggle {
            display: none;
        }

        .site-nav {
            display: flex !important;
            position: static;
            width: auto;
            padding: .25rem 3px;
            transform: translateX(0);
            transition: none;
            flex-direction: row;
            margin-bottom: .75rem;
            box-shadow: none;
            z-index: auto;
        }
    }
</style>
