<template>
    <BandcampIcon v-if="track.bandcampId" />
    <span v-if="labels && track.bandcampId">Bandcamp</span>

    <SoundCloudIcon v-if="track.soundcloudId" />
    <span v-if="labels && track.soundcloudId">SoundCloud</span>

    <VimeoIcon v-if="track.vimeoId" />
    <span v-if="labels && track.vimeoId">Vimeo</span>

    <YouTubeIcon v-if="track.youtubeId" />
    <span v-if="labels && track.youtubeId">YouTube</span>
</template>

<script setup>
    import BandcampIcon from './icons/BandcampIcon.vue';
    import SoundCloudIcon from './icons/SoundCloudIcon.vue';
    import VimeoIcon from './icons/VimeoIcon.vue';
    import YouTubeIcon from './icons/YouTubeIcon.vue';

    defineProps({
        track: {
            type: Object,
            required: true,
        },
        labels: {
            type: Boolean,
            default: false,
        }
    });
</script>
