<template>
    <div class="wrap">
        <header>
            <RouterLink to="/">
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
