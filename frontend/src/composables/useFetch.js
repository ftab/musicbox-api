import { ref } from 'vue';
import { error } from '../state';

export function useFetch({ immediate = true } = {}) {
    const data = ref(null);
    const meta = ref(null);
    const loading = ref(immediate);

    async function get(url = null) {
        loading.value = true;
        error.value = null;

        try {
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
