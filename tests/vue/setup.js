import { vi, beforeEach } from 'vitest'
import { config } from '@vue/test-utils';

let mockRoute = {
    params: {},
    query: {},
};

global.fetch = vi.fn();

vi.mock('vue-router', () => ({
    useRoute: () => mockRoute,
    useRouter: () => ({
        push: vi.fn(),
    }),
    onBeforeRouteUpdate: vi.fn(),
}));

config.global.stubs = {
    RouterLink: {
        template: '<a><slot /></a>',
    },
};

beforeEach(async () => {
    fetch.mockReset();
});

export function mockFetch(data) {
    fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(data)
    });
};

export function setRoute(route) {
    mockRoute = {
        ...mockRoute,
        ...route,
    };
};
