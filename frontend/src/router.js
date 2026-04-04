import { createRouter, createWebHistory } from 'vue-router';
import { error } from './state';
import { setPageTitle } from './utils';
import Home from './views/Home.vue';
import User from './views/User.vue';
import Song from './views/Song.vue';
import Artist from './views/Artist.vue';
import TopTracks from './views/TopTracks.vue';
import Activity from './views/Activity.vue';
import Search from './views/Search.vue';
import PeePee from './views/PeePee.vue';
import Help from './views/Help.vue';
import ApiDocs from './views/ApiDocs.vue';
import Error from './views/Error.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: 'Leaderboard' },
    },
    {
        path: '/user/:nickname',
        name: 'profile',
        component: User,
    },
    {
        path: '/song/:id',
        name: 'song',
        component: Song,
    },
    {
        path: '/artist/:id',
        name: 'artist',
        component: Artist,
    },
    {
        path: '/top-tracks',
        name: 'top-tracks',
        component: TopTracks,
        meta: { title: 'Top Tracks' },
    },
    {
        path: '/activity',
        name: 'activity',
        component: Activity,
        meta: { title: 'Last activity' },
    },
    {
        path: '/peepee',
        name: 'peepee',
        component: PeePee,
        meta: { title: 'PP Leaderboard' },
    },
    {
        path: '/help',
        name: 'help',
        component: Help,
        meta: { title: 'Help' },
    },
    {
        path: '/docs/api',
        name: 'api-docs',
        component: ApiDocs,
        meta: { title: 'API Docs', noLayout: true },
    },
    {
        path: '/search',
        name: 'search',
        component: Search,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'error',
        component: Error,
        meta: { title: 'Uh oh', noLayout: true },
    }
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
});

export default router;
