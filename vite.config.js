import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const port = process.env.PORT || 5000;

export default defineConfig({
    plugins: [vue()],
    root: 'frontend',
    build: {
        outDir: '../dist',
    },
    test: {
        environment: 'jsdom',
        root: '.',
        include: ['tests/vue/**/*.test.js'],
    },
    server: {
        proxy: {
            '/api': `http://localhost:${port}`,
        },
    },
});
