import HomePage from './../components/HomePage.vue';
import AtCoderPage from './../components/AtCoderPage.vue';
import CodeforcesPage from './../components/CodeforcesPage.vue';
import CSAPage from './../components/CSAPage.vue';
import AOJPage from './../components/AOJPage.vue';

export default [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/AtCoder',
        component: AtCoderPage
    },
    {
        path: '/Codeforces',
        component: CodeforcesPage
    },
    {
        path: '/CSA',
        component: CSAPage
    },
    {
        path: '/AOJ',
        component: AOJPage
    },
];
