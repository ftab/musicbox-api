<template>
    <NotFound v-if="error" />

    <template v-else>
        <Layout v-if="!$route.meta.noLayout">
            <RouterView />
        </Layout>

        <RouterView v-else />
    </template>
</template>

<script setup>
    import { error } from './state';
    import Layout from './components/Layout.vue';
    import NotFound from './views/NotFound.vue';
</script>
