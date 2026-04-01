<template>
    <section class="spinner-container">
        <div class="spinner">
            <DiskIcon />
        </div>
    </section>
</template>

<script setup>
    import DiskIcon from './DiskIcon.vue';
</script>

<style>
    .spinner-container {
        position: absolute;
        inset: 0;
        display: grid;
        place-content: center;
    }

    .spinner {
        display: inline-block;
        width: 75px;
        height: 75px;
        animation: rotate 1s linear infinite;
    }

    .spinner svg {
        fill: var(--color-dark);
    }

    @keyframes rotate {
        100% {
            rotate: 360deg;
        }
    }
</style>
