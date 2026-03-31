<template>
    <section ref="redocContainer"></section>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';

    const redocContainer = ref(null);

    onMounted(() => {
        const script = document.createElement('script');

        script.src = 'https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js';

        script.onload = () => {
            Redoc.init('/openapi.yaml', {
                hideDownloadButton: true,
            }, redocContainer.value);
        }

        document.head.appendChild(script);

        document.body.classList.add('api-docs');
    });

    onUnmounted(() => document.body.classList.remove('api-docs'));
</script>

<style>
    body.api-docs {
        background: white;
    }
</style>
