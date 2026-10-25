<template>
    <NotFound v-if="error" />

    <template v-else>
        <RouterView v-if="$route.meta.noLayout" />

        <Layout v-else>
            <RouterView />
        </Layout>
    </template>
</template>

<script setup>
    import { error } from './state';
    import Layout from './components/Layout.vue';
    import NotFound from './views/NotFound.vue';
</script>
