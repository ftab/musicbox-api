<template>
    <section v-html="renderedContent" class="help-content"></section>
</template>

<script setup>
    import { marked } from 'marked';
    import content from '../../../content/help.md?raw';

    const renderedContent = marked(content);
</script>
