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

        document.body.classList.add('no-style');

        document.head.appendChild(script);
    });

    onUnmounted(() => document.body.classList.remove('no-style'));
</script>
