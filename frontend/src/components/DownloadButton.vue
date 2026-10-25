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

<style>
    .download-button {
        display: flex;
        gap: .25rem;
        background-color: light-dark(var(--color-accent-dark), var(--color-accent-light));
        color: light-dark(var(--color-lightest), var(--color-darkest));
        padding: .25rem .5rem;
    }

    .download-button svg {
        width: 1rem;
    }
</style>
