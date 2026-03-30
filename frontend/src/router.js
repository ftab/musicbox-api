import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import User from './views/User.vue';
import TopTracks from './views/TopTracks.vue';
import Activity from './views/Activity.vue';
import PeePee from './views/PeePee.vue';
import Help from './views/Help.vue';
import ApiDocs from './views/ApiDocs.vue';

const routes = [
    {
        path: '/',
        component: Home,
        meta: { title: 'Leaderboard' },
    },
    {
        path: '/user/:nickname',
        component: User,
    },
    {
        path: '/top-tracks',
        component: TopTracks,
        meta: { title: 'Top Tracks' },
    },
    {
        path: '/activity',
        component: Activity,
        meta: { title: 'Last activity' },
    },
    {
        path: '/peepee',
        component: PeePee,
        meta: { title: 'PP Leaderboard' },
    },
    {
        path: '/help',
        component: Help,
        meta: { title: 'Help' },
    },
    {
        path: '/docs/api',
        component: ApiDocs,
        meta: { title: 'API Docs', noLayout: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach(to => {
    if(to.params.nickname) {
        document.title = `${to.params.nickname} - MusicBox IRC`;
        return;
    }

    document.title = to.meta.title ? `${to.meta.title} - MusicBox IRC` : 'MusicBox IRC';
});

export default router;
