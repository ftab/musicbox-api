<template>
    <div v-if="currentMedia" class="streambar">
        <span class="text-accent text-uppercase">
            <i class="stream-active-indicator"></i> Stream Active
        </span>
        <span class="text-soft">Playing:</span>
        <span class="text-ellipsis">{{ currentMedia.title }} ({{ currentMedia.duration }})</span>
        <div class="streambar-queue-info">
            <span v-if="playlistMeta?.count > 0" class="text-soft">{{ pluralize(playlistMeta.count, 'song') }} queued</span>
            <a href="https://cytu.be/r/MusicBox" class="button-accent" target="_blank">Tune in!</a>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, onBeforeUnmount, ref } from 'vue';
    import { pluralize } from '../utils';

    const currentMedia = ref(null);
    const playlistMeta = ref(null);
    const source = ref(null);
    const reconnect = ref(null);

    const connect = () => {
        if(source.value) return;

        source.value = new EventSource('/api/stream');

        source.value.onerror = () => {
            source.value?.close();
            source.value = null;
            reconnect.value = setTimeout(connect, 5000);
        };

        source.value.addEventListener('currentMedia', e => {
            currentMedia.value = JSON.parse(e.data);
        });

        source.value.addEventListener('playlistMeta', e => {
            playlistMeta.value = JSON.parse(e.data);
        });
    };

    onMounted(async () => {
        connect();
    });

    onBeforeUnmount(() => {
        source.value?.close();
        clearTimeout(reconnect.value);
    });
</script>
