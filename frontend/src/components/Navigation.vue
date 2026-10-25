<template>
    <Teleport to=".site-header-buttons" defer>
        <button popovertarget="menu" class="site-nav-toggle" aria-label="Toggle menu">
            <BarsIcon />
        </button>
    </Teleport>

    <nav ref="nav" id="menu" class="site-nav" popover>
        <button class="site-nav-close" popovertarget="menu" popovertargetaction="hide">
            <XMarkIcon />
        </button>
        <RouterLink :to="{ name: 'home' }" active-class="active" class="site-nav-link" title="Leaderboard">Leaderboard</RouterLink>
        <RouterLink :to="{ name: 'top-tracks' }" active-class="active" class="site-nav-link" title="Top Tracks">Top Tracks</RouterLink>
        <RouterLink :to="{ name: 'artists', params: { letter: 'A' } }" active-class="active" class="site-nav-link" title="Artists">Artists</RouterLink>
        <RouterLink :to="{ name: 'activity' }" active-class="active" class="site-nav-link" title="Activity">Activity</RouterLink>
        <RouterLink :to="{ name: 'peepee' }" active-class="active" class="site-nav-link" title="PP Leaderboard">🍆</RouterLink>
        <RouterLink :to="{ name: 'search' }" active-class="active" class="site-nav-link" title="Search">Search</RouterLink>
        <RouterLink :to="{ name: 'help' }" active-class="active" class="site-nav-link" title="Help">Help</RouterLink>
        <RouterLink :to="{ name: 'api-docs' }" active-class="active" class="site-nav-link" target="_blank" title="API Docs">API</RouterLink>
    </nav>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import BarsIcon from './icons/BarsIcon.vue';
    import XMarkIcon from './icons/XMarkIcon.vue';

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

    @media(width >= 660px) {
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
