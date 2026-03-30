<template>
    <div class="wrap">
        <header>
            <RouterLink to="/">
                <DiskIcon />
                <h1>MusicBox</h1>
            </RouterLink>
        </header>

        <nav class="site-nav">
            <RouterLink to="/" active-class="active" class="site-nav-link">Leaderboard</RouterLink>
            <RouterLink to="/top-tracks" active-class="active" class="site-nav-link">Top Tracks</RouterLink>
            <RouterLink to="/activity" active-class="active" class="site-nav-link">Activity</RouterLink>
            <RouterLink to="/peepee" active-class="active" class="site-nav-link">🍆</RouterLink>
            <RouterLink to="/help" active-class="active" class="site-nav-link">Help</RouterLink>
            <RouterLink to="/docs/api" active-class="active" class="site-nav-link" target="_blank">API</RouterLink>
            <a href="https://cytu.be/r/MusicBox" class="site-nav-link" target="_blank">Stream</a>
        </nav>

        <main>
            <slot />
        </main>
    </div>
</template>

<script setup>
    import '../css/normalize.css';
    import '../css/app.css';
    import DiskIcon from './DiskIcon.vue';
</script>
