import axios from 'axios';
import './configure'
axios.install = function (Vue, options) {
    Vue.prototype.$fetch = axios;
}
export default axios