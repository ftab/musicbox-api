import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const port = process.env.PORT || 5000;

const transformFilename = name => {
    return name.split('.')[0].replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

const preloadCss = () => {
    return {
        name: 'preload-css',
        transformIndexHtml(html) {
            return html.replace(
                /<link rel="stylesheet" crossorigin href="([^"]+\.css)">/g,
                `<link rel="preload" as="style" crossorigin href="$1"><link rel="stylesheet" crossorigin href="$1">`
            );
        },
    };
};

export default defineConfig({
    plugins: [
        vue(),
        preloadCss(),
    ],
    root: 'frontend',
    build: {
        outDir: '../dist',
        rolldownOptions: {
            output: {
                entryFileNames: 'assets/index-[hash].js',
                chunkFileNames(chunk) {
                    const name = transformFilename(chunk.name);
                    return `assets/${name}-[hash].js`;
                },
                assetFileNames(asset) {
                    const name = transformFilename(asset.name || 'asset');
                    return `assets/${name}-[hash].[ext]`;
                },
                manualChunks(id) {
                    if(id.includes('node_modules/vue') || id.includes('node_modules/vue-router')) {
                        return 'vendor';
                    }
                },
            },
        },
    },
    test: {
        environment: 'jsdom',
        root: '.',
        include: ['tests/vue/**/*.test.js'],
        setupFiles: ['tests/vue/setup.js'],
    },
    server: {
        proxy: {
            '/api': `http://localhost:${port}`,
        },
    },
});
