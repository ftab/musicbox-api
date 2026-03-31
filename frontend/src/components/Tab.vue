<template>
    <div v-if="tabIndex === activeIndex" class="tab-content">
        <slot />
    </div>
</template>

<script setup>
    import { inject } from 'vue';

    const activeIndex = inject('activeIndex');
    const registerTab = inject('registerTab');

    const tabIndex = registerTab();
</script>
