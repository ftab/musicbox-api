<template>
    <div v-if="currentMedia" class="stream-info">
        <span class="accent uppercase"><i class="dot"></i> Stream Active</span>
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
    const source = ref(null);
    const reconnect = ref(null);

    const connect = () => {
        source.value = new EventSource('/api/stream');

        source.value.onerror = e => {
            source.value.close();
            reconnect.value = setTimeout(() => connect(), 5000);
        };

        source.value.addEventListener('currentMedia', e => {
            currentMedia.value = JSON.parse(e.data);
        });

        source.value.addEventListener('playlistMeta', e => {
            playlistMeta.value = JSON.parse(e.data);
        });
    };

    onMounted(() => connect());

    onUnmounted(() => {
        source.value?.close();
        clearTimeout(reconnect.value);
    });
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
        z-index: 3;
    }

    .playlist-info {
        margin-left: auto;
    }

    .playlist-info span {
        display: none;
    }

    .dot {
        display: inline-block;
        width: .5rem;
        height: .5rem;
        background: light-dark(var(--color-accent-dark), var(--color-accent-light));
        border-radius: 100vw;
        animation: pulse 2s ease-in-out infinite;
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

    @media(width > calc(786px + 2rem)) {
        .playlist-info span {
            display: inline;
        }
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: .1; }
    }
</style>
