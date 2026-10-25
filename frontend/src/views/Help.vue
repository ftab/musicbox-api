<template>
    <section v-html="renderedContent" class="help-content"></section>
</template>

<script setup>
    import { marked } from 'marked';
    import content from '../../../content/help.md?raw';

    const renderer = {
        link({ href, text }) {
            const escapedText = text
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');

            return `<a href="${href}">${escapedText}</a>`;
        },
        heading({ tokens, depth }) {
            const text = this.parser.parseInline(tokens);

            if (depth !== 2) {
                return `<h${depth}>${text}</h${depth}>`;
            }

            const escapedText = text
                .replace(/<[^>]*>/g, '')
                .toLowerCase()
                .split(' ')[0]
                .split('|')[0]
                .replace(/^\./, '')
                .replace(/[^\w]+/g, '-');

            return `<h${depth} id="${escapedText}">${text}</h${depth}>`;
        }
    };

    marked.use({ renderer });

    const renderedContent = marked(content);
</script>
