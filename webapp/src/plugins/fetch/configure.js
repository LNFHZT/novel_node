import fetch from 'axios';
import { Message } from 'element-ui';
import Qs from 'qs';
import session from '@/plugins/session';
// import router from '@/router/index';
import { stringify } from '@/assets/js/utils';
const BASE_URL = process.env.BASE_URL;
// let noLoginErrMessage = false;
fetch.defaults.crossDomain = true;
fetch.defaults.withCredentials = true;
fetch.defaults.headers["Content-Type"] = "application/json";
fetch.defaults.headers["X-Request-Source"] = "novel_node";
// 默认配置
fetch.default.timeout = 50000;
fetch.defaults.baseURL = BASE_URL;
// fetch.defaults.baseURL = '/mock/56/57/70';

fetch.defaults.validateStatus = function (status) {
  return status;
}
// 数据预处理
fetch.defaults.transformRequest = [function (data, headers) {
  let req = '';
  if (headers['Content-Type'] == 'application/x-www-form-urlencoded' && typeof data == 'object' && Object.prototype.toString.call(data) != '[object FormData]') {
    req = Qs.stringify(data);
  } else if (headers['Content-Type'] == 'application/x-www-form-urlencoded' && typeof data == 'string') {
    try {
      let obj = JSON.parse(data);
      req = stringify(obj);
    } catch (error) {
      req = data;
    }
  } else if (typeof data == 'object' && Object.prototype.toString.call(data) != '[object FormData]') {
    req = JSON.stringify(data)
  } else {
    req = data;
  }
  return req;
  // 对 data 进行任意转换处理
}];
// 请求前拦截器
fetch.interceptors.request.use(config => {
  // 接口 是否判断错误 提示
  if (config.params && config.params._MessageTip) {
    delete config.params._MessageTip;
    config._MessageTip = true;
  }
  if (config.data && config.data._MessageTip) {
    delete config.data._MessageTip;
    config._MessageTip = true;
  }
  // 接口是否判断 非200 提示
  if (config.params && config.params._MessageCodeTip) {
    delete config.params._MessageCodeTip;
    config._MessageCodeTip = true;
  }
  if (config.data && config.data._MessageCodeTip) {
    delete config.data._MessageCodeTip;
    config._MessageCodeTip = true;
  }
  if (session.getL('token')) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    config.headers['X-Request-Token'] = session.getL('token');
  }
  return config
}, error => {
  // 请求错误处理
  console.error(error);
  return Promise.reject(error)
})

// 请求响应拦截
fetch.interceptors.response.use(data => {
  // 接口是否判断 非200 提示
  if (data.config._MessageCodeTip) {
    try {
      return data.data;
    } catch (error) {
      return null
    }
  }
  if (data.status != 200) {
    let error = '';
    switch (data.status) {
      case 502:
        error = '连接不上后台服务器';
        break;
      case 500:
        error = '服务器内部错误';
        break
      case 404:
        error = '未找到远程服务器';
        break
      case 400:
        error = '请求发送数据异常';
        break
      default:
        error = data.statusText;
    }
    Message.error(error)
    return Promise.reject(new Error(`${error},请求code:${data.status}`))
  }
  if (data.data && typeof data.data == 'object') {
    // 如果返回token失效
    if (data.data.code == "1064") {
      // if (!noLoginErrMessage) {
      //   noLoginErrMessage = true;
      //   if (session.getL('token')) {
      //     Message.error(data.data.tip);
      //   }
      //   setTimeout(() => {
      //     noLoginErrMessage = false;
      //   }, 1000);
      //   session.removeL('token');
      //   router.replace({
      //     path: '/login'
      //   })
      // }
      return Promise.reject(data.data);
    }
    // 扩展 如果传参中有_MessageTip为true 的话 则不进行data 数据格式校验
    if (data.config._MessageTip) {
      return data.data;
    }
    // data 数据格式校验 status ==1 表示后端返回数据正确
    if (data.data.status != 1) {
      if (data.data.tip) {
        Message.error(data.data.tip);
      } else {
        Message.error(`${data.config.url}:接口错误`);
      }
      return Promise.reject(data.data)
    }
    return data.data;
  }
}, error => {
  console.error(error);
  return Promise.reject(error)
})
