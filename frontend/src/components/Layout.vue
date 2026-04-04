<template>
    <div class="wrap">
        <header>
            <RouterLink to="/">
                <DiskIcon />
                <h1>MusicBox</h1>
            </RouterLink>
        </header>

        <nav class="site-nav">
            <RouterLink :to="{ name: 'home' }" active-class="active" class="site-nav-link">
                Leaderboard
            </RouterLink>
            <RouterLink :to="{ name: 'top-tracks' }" active-class="active" class="site-nav-link">
                Top Tracks
            </RouterLink>
            <RouterLink :to="{ name: 'activity' }" active-class="active" class="site-nav-link">
                Activity
            </RouterLink>
            <RouterLink :to="{ name: 'peepee' }" active-class="active" class="site-nav-link">
                🍆
            </RouterLink>
            <RouterLink :to="{ name: 'search' }" active-class="active" class="site-nav-link">
                Search
            </RouterLink>
            <RouterLink :to="{ name: 'help' }" active-class="active" class="site-nav-link">
                Help
            </RouterLink>
            <RouterLink :to="{ name: 'api-docs' }" active-class="active" class="site-nav-link" target="_blank">
                API
            </RouterLink>
            <a href="https://cytu.be/r/MusicBox" class="site-nav-link" target="_blank">Stream</a>
        </nav>

        <main>
            <slot />
        </main>

        <ScrollTop />
    </div>
</template>

<script setup>
    import '../css/normalize.css';
    import '../css/app.css';
    import DiskIcon from './DiskIcon.vue';
    import ScrollTop from './ScrollTop.vue';
    import SearchForm from './SearchForm.vue';
</script>
