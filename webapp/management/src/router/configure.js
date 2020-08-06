import router from './index';
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
})