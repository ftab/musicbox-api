<template>
    <div class="wrap">
        <header class="site-header">
            <RouterLink :to="{ name: 'home' }" class="site-logo">
                <DiskIcon />
                MusicBox
            </RouterLink>

            <div class="site-header-buttons">
                <ColorSchemeToggle />
            </div>
        </header>

        <Navigation />

        <main>
            <slot />
        </main>
    </div>

    <ScrollTop />
    <StreamBar />
</template>

<script setup>
    import StreamBar from './StreamBar.vue';
    import ColorSchemeToggle from './ColorSchemeToggle.vue';
    import Navigation from './Navigation.vue';
    import ScrollTop from './ScrollTop.vue';
    import DiskIcon from './icons/DiskIcon.vue';
</script>
