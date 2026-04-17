import { ref } from 'vue';
import { compile } from 'path-to-regexp';
import { error } from '../state';

export function useFetch({ immediate = true } = {}) {
    const data = ref(null);
    const meta = ref(null);
    const loading = ref(immediate);

    function buildUrl(path, params, query) {
        const toPath = compile(path);
        const result = new URL(toPath(params), window.location.origin);

        result.search = new URLSearchParams(query).toString();

        return result;
    };

    async function get(path = null, { params = {}, query = {} } = {}) {
        loading.value = true;
        error.value = null;

        try {
            const url = buildUrl(path, params, query);
            const response = await fetch(url);

            if( ! response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const json = await response.json();

            data.value = json.data ?? json;
            meta.value = json.meta ?? null;
        } catch(err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    return {
        data,
        meta,
        loading,
        get,
    };
};
