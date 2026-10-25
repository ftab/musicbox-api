<template>
    <div class="custom-select">
        <h2>
            <button popovertarget="selectList" type="button" class="custom-select-trigger">
                {{ selected.label }}
                <span class="select-caret">
                    <CaretDownIcon />
                </span>
            </button>
        </h2>

        <div popover id="selectList" class="custom-select-list">
            <button type="button"
                v-for="option in options"
                :key="option.value"
                popovertarget="selectList"
                popovertargetaction="hide"
                class="custom-select-option"
                @click="select(option)"
            >
                {{ option.label }}
            </button>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import CaretDownIcon from './icons/CaretDownIcon.vue';

    const props = defineProps({
        modelValue: {
            type: String,
            default: null,
        },
        options: {
            type: Array,
            required: true,
        },
    });

    const emit = defineEmits(['update:modelValue']);

    const selected = computed(() =>
        props.options.find(option => option.value === props.modelValue) || props.options[0]);

    const select = option => {
        emit('update:modelValue', option.value);
    };
</script>
