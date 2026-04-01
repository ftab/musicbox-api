<template>
    <div v-if="tabIndex === activeIndex" class="tab-content">
        <slot />
    </div>
</template>

<script setup>
    import { inject } from 'vue';

    defineProps({ label: String, required: true });

    const activeIndex = inject('activeIndex');
    const registerTab = inject('registerTab');

    const tabIndex = registerTab();
</script>
