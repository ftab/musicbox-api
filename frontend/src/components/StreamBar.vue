<template>
    <div v-if="status && currentMedia" class="streambar">
        <span class="text-accent text-uppercase">
            <i class="stream-active-indicator"></i> Stream Active
        </span>
        <span class="text-soft">Playing:</span>
        <span class="text-ellipsis">{{ currentMedia.title }} ({{ currentMedia.duration }})</span>
        <div class="streambar-queue-info">
            <span v-if="playlistMeta?.count > 0" class="text-soft">{{ pluralize(playlistMeta.count, 'song') }} queued</span>
            <a href="https://cytu.be/r/MusicBox" class="button-accent" target="_blank" rel="noopener">Tune in!</a>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, onBeforeUnmount, ref } from 'vue';
    import { pluralize } from '../utils';

    const status = ref(false);
    const currentMedia = ref(null);
    const playlistMeta = ref(null);
    let source = null;
    let reconnect = null;

    const connect = () => {
        if(source) return;

        source = new EventSource('/api/stream');

        source.onerror = () => {
            source?.close();
            source = null;
            status.value = false;
            currentMedia.value = null;
            playlistMeta.value = null;
            reconnect = setTimeout(connect, 5000);
        };

        source.addEventListener('status', e => {
            status.value = JSON.parse(e.data);
        });

        source.addEventListener('currentMedia', e => {
            currentMedia.value = JSON.parse(e.data);
        });

        source.addEventListener('playlistMeta', e => {
            playlistMeta.value = JSON.parse(e.data);
        });
    };

    onMounted(() => connect());

    onBeforeUnmount(() => {
        source?.close();
        source = null;
        clearTimeout(reconnect);
    });
</script>
