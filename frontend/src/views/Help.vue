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

            if (depth !== 3) {
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

<style>
    h3 {
        position: relative;
    }

    h3:target::before {
        content: '→';
        position: absolute;
        font-size: 2.5rem;
        top: -1.25rem;
        left: -4rem;
        color: light-dark(var(--color-accent-dark), var(--color-accent-light));
        animation: pointingAtCommand 3s ease-in-out infinite;
    }

    @keyframes pointingAtCommand {
        50% {
            left: -3rem;
        }
    }
</style>
