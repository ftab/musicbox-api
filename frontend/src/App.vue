<template>
    <Error v-if="error" />

    <template v-else>
        <Layout v-if="!$route.meta.noLayout">
            <RouterView />
        </Layout>

        <RouterView v-else />
    </template>
</template>

<script setup>
    import Layout from './components/Layout.vue';
    import { error } from './state';
    import Error from './views/Error.vue';
</script>
