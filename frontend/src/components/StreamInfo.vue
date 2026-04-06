<template>
    <div v-if="currentMedia" class="stream-info">
        <span class="accent">● LIVE STREAM ACTIVE</span>
        <span class="dim">Playing:</span>
        <span class="ellipsis">{{ currentMedia.title }} ({{ currentMedia.duration }})</span>
        <div class="playlist-info">
            <span v-if="playlistMeta?.count > 0" class="dim">{{ pluralize(playlistMeta.count, 'song') }} queued</span>
            <a href="https://cytu.be/r/MusicBox" class="cta" target="_blank">Tune in!</a>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, onUnmounted, ref } from 'vue';
    import { pluralize } from '../utils';

    const currentMedia = ref(null);
    const playlistMeta = ref(null);

    onMounted(() => {
        const source = new EventSource('/api/stream');

        source.addEventListener('currentMedia', e => {
            currentMedia.value = JSON.parse(e.data);
        });

        source.addEventListener('playlistMeta', e => {
            playlistMeta.value = JSON.parse(e.data);
        });
    });

    onUnmounted(() => source?.close());
</script>

<style>
    .stream-info {
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        gap: .5rem;
        align-items: center;
        padding: .5rem;
        font-size: 0.7rem;
        text-wrap: nowrap;
        background-color: light-dark(var(--color-lighter), var(--color-darkest));
        border-top: 1px solid light-dark(var(--color-light), var(--color-dark));
        z-index: 1;
    }

    .playlist-info {
        display: none;
    }

    @media(width > calc(786px + 2rem)) {
        .playlist-info {
            display: inline-block;
            margin-left: auto;
        }

        .cta {
            display: inline-block;
            background: light-dark(var(--color-accent-dark), var(--color-accent-light));
            color: light-dark(var(--color-lightest), var(--color-darkest));
            padding: 0 0.25rem;
            margin-left: .5rem;
            text-decoration: none;

            &:hover {
                color: light-dark(var(--color-lightest), var(--color-darkest));
            }
        }
    }
</style>
