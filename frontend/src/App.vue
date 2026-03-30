<template>
    <Layout v-if="!$route.meta.noLayout">
        <RouterView />
    </Layout>

    <RouterView v-else />
</template>

<script setup>
    import Layout from './components/Layout.vue';
</script>
