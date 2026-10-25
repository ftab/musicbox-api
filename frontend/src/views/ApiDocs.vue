<template>
    <section ref="redocContainer"></section>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';

    const redocContainer = ref(null);

    onMounted(() => {
        const script = document.createElement('script');

        script.src = 'https://cdn.jsdelivr.net/npm/redoc@2.5.1/bundles/redoc.standalone.js';

        script.onload = () => {
            Redoc.init('/openapi.yaml', {
                hideDownloadButton: true,
            }, redocContainer.value);
        }

        document.head.appendChild(script);

        document.documentElement.classList.add('api-docs');
    });

    onUnmounted(() => document.documentElement.classList.remove('api-docs'));
</script>
