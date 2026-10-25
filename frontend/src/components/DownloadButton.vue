<template>
    <button @click="download" :disabled="loading" class="button-accent">
        <DownloadIcon />
        <span v-if="loading">Crunching data</span>
        <span v-else>Download</span>
    </button>
</template>

<script setup>
    import DownloadIcon from './icons/DownloadIcon.vue';

    defineProps({
        loading: {
            type: Boolean,
            default: false,
        },
    });

    const emit = defineEmits(['download']);

    const download = async () => {
        emit('download', true);
    };
</script>
