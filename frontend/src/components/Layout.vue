<template>
    <div class="wrap">
        <header class="site-header">
            <RouterLink :to="{ name: 'home' }" class="site-logo">
                <DiskIcon />
                <h1>MusicBox</h1>
            </RouterLink>

            <div class="header-buttons">
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
    import '../css/normalize.css';
    import '../css/app.css';
    import StreamBar from './StreamBar.vue';
    import DiskIcon from './DiskIcon.vue';
    import ColorSchemeToggle from './ColorSchemeToggle.vue';
    import Navigation from './Navigation.vue';
    import ScrollTop from './ScrollTop.vue';
    import SearchForm from './SearchForm.vue';
</script>

<style>
    .site-header {
        padding-block: 1.5rem 1.25rem;
    }

    .site-logo {
        display: inline-flex;
        align-items: center;
        gap: 1rem;
        text-decoration: none;

        &:hover {
            color: currentColor;
        }

        & svg {
            height: 2rem;
            fill: light-dark(var(--color-dark), var(--color-lighter));
        }
    }

    @media(width < 375px) {
        .site-logo h1 {
            font-size: 1rem;
        }
    }
</style>
