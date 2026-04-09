import { createRouter, createWebHistory } from 'vue-router';
import { error } from './state';
import { setPageTitle } from './utils';
import NotFound from './views/NotFound.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./views/Home.vue'),
        meta: { title: 'Leaderboard' },
    },
    {
        path: '/user/:nickname',
        name: 'profile',
        component: () => import('./views/User.vue'),
    },
    {
        path: '/song/:id',
        name: 'song',
        component: () => import('./views/Song.vue'),
    },
    {
        path: '/artist/:id',
        name: 'artist',
        component: () => import('./views/Artist.vue'),
    },
    {
        path: '/top-tracks',
        name: 'top-tracks',
        component: () => import('./views/TopTracks.vue'),
        meta: { title: 'Top Tracks' },
    },
    {
        path: '/activity',
        name: 'activity',
        component: () => import('./views/Activity.vue'),
        meta: { title: 'Last activity' },
    },
    {
        path: '/peepee',
        name: 'peepee',
        component: () => import('./views/PeePee.vue'),
        meta: { title: 'PP Leaderboard' },
    },
    {
        path: '/help',
        name: 'help',
        component: () => import('./views/Help.vue'),
        meta: { title: 'Help' },
    },
    {
        path: '/docs/api',
        name: 'api-docs',
        component: () => import('./views/ApiDocs.vue'),
        meta: { title: 'API Docs', noLayout: true },
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('./views/Search.vue'),
        meta: { title: 'Search' },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'error',
        component: NotFound,
        meta: { title: 'Uh oh', noLayout: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if(savedPosition) {
            return savedPosition;
        }

        return { top: 0 };
    },
});

router.beforeEach(to => {
    if(to.query.page !== undefined) {
        const page = parseInt(to.query.page, 10);

        if(isNaN(page) || page < 2) {
            return { ...to, query: { ...to.query, page: undefined } };
        }
    }
});

router.afterEach(to => {
    error.value = null;

    if(to.meta.title) {
        setPageTitle(to.meta.title);
    }

    if(to.hash) {
        document.querySelectorAll('.target').forEach(el => el.classList.remove('target'));

        requestAnimationFrame(() => {
            const el = document.querySelector(to.hash);

            if(el) {
                el.classList.add('target');
                el.scrollIntoView();
            }
        });
    }
});

export default router;
