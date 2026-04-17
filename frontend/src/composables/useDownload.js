export function useDownload() {
    return function download(data = null, filename = null) {
        if( ! data || ! filename) return;

        const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
        const href = URL.createObjectURL(blob);

        Object.assign(document.createElement('a'), {
            href,
            download: filename,
        }).click();

        requestAnimationFrame(() => URL.revokeObjectURL(href));
    }
};
