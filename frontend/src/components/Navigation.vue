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
    import { useTemplateRef, watch, onMounted, onBeforeUnmount } from 'vue';
    import { useRoute } from 'vue-router';
    import BarsIcon from './icons/BarsIcon.vue';
    import XMarkIcon from './icons/XMarkIcon.vue';

    const nav = useTemplateRef('nav');
    const route = useRoute();

    const desktopQuery = window.matchMedia('(width > 660px)');

    const close = () => {
        if(nav.value?.matches(':popover-open')) {
            nav.value?.hidePopover()
        }
    };

    const onBreakpointChange = e => {
        if( ! nav.value) return;

        if(e.matches) close();

        nav.value.style.transition = 'none';
        nav.value.offsetWidth;
        nav.value.style.transition = '';
    };

    watch(() => route.fullPath, () => close());

    onMounted(() => desktopQuery.addEventListener('change', onBreakpointChange));

    onBeforeUnmount(() => desktopQuery.removeEventListener('change', onBreakpointChange));
</script>
