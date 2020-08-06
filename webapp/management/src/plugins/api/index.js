import user from './user';
/**
 * 驼峰写法
 * 命名规范 req + 请求方式 + 文件名 + 接口结尾单词
 * 
 */

let api = {
    ...user,
};
api.install = function (Vue, options) {
    Vue.prototype.$api = api;
}
export default api