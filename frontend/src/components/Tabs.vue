<template>
    <div class="tabs">
        <div class="tab-buttons">
            <button @click="activate(index)" v-for="(tab, index) in tabs" :class="{ 'tab-button': true, 'active': index === activeIndex }">
                {{ tab.props?.label }}
            </button>
        </div>

        <slot />
    </div>
</template>

<script setup>
    import { provide, ref, useSlots, computed } from 'vue';

    const slots = useSlots();
    const tabs = computed(() => slots.default().filter(node => node.type?.__name === 'Tab'));

    const activeIndex = ref(0);
    const tabIndex = ref(0);

    const activate = index => {
        activeIndex.value = index;
    };

    const registerTab = () => {
        const index = tabIndex.value;

        tabIndex.value++;

        return index;
    };

    provide('activeIndex', activeIndex);
    provide('registerTab', registerTab);
</script>

<style>
    .tabs {
        margin-bottom: 2.5rem;
    }

    .tab-buttons {
        display: flex;
        gap: .5rem;
    }

    .tab-button {
        background: var(--color-darker);
        color: var(--color-neutral);
        padding: .5rem 1rem;
        border: none;

        &.active {
            color: var(--color-light);
        }
    }

    .tab-content {
        background: var(--color-darker);
        padding: 1rem;
    }
</style>
