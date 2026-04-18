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
        props: route => ({
            nickname: route.params.nickname,
            page: parseInt(route.query.page, 10) || 1,
        }),
    },
    {
        path: '/song/:id',
        name: 'song',
        component: () => import('./views/Song.vue'),
        props: true,
    },
    {
        path: '/artists/:letter',
        name: 'artists',
        component: () => import('./views/Artists.vue'),
        props: route => ({
            letter: route.params.letter.toUpperCase(),
            page: parseInt(route.query.page, 10) || 1,
        }),
        beforeEnter(to, from) {
            const letter = to.params.letter;

            if(letter !== letter.toUpperCase()) {
                return {
                    name: 'artists',
                    query: { ...to.query },
                    params: { letter: letter.toUpperCase() },
                };
            }
        },
    },
    {
        path: '/artist/:id',
        name: 'artist',
        component: () => import('./views/Artist.vue'),
        props: route => ({
            id: route.params.id,
            page: parseInt(route.query.page, 10) || 1,
        }),
    },
    {
        path: '/top-tracks',
        name: 'top-tracks',
        component: () => import('./views/TopTracks.vue'),
        props: route => ({
            page: parseInt(route.query.page, 10) || 1,
        }),
        meta: { title: 'Top Tracks' },
    },
    {
        path: '/activity',
        name: 'activity',
        component: () => import('./views/Activity.vue'),
        props: route => ({
            page: parseInt(route.query.page, 10) || 1,
        }),
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
        props: route => ({
            searchTerm: route.query.searchTerm,
        }),
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
        return savedPosition || { top: 0 };
    },
});

router.beforeEach(to => {
    const page = to.query.page;

    if(page !== undefined && (isNaN(page) || page < 2)) {
        return { ...to, query: { ...to.query, page: undefined } };
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
