"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var instance;
var Session = /** @class */ (function () {
    function Session() {
        this.default = {
            sign: ''
        };
        // 单例模式，只允许new一个对象
        if (instance) {
            return instance;
        }
        else {
            instance = this;
        }
    }
    // 兼容vue 注入
    Session.prototype.install = function (Vue) {
        Vue.prototype.$session = session;
    };
    /**
     * @param k string
     * @param v any
     * @description localStorage set
     */
    Session.prototype.setL = function (k, v) {
        if (v === void 0) { v = ''; }
        if (!k) {
            throw new Error('请传入key');
        }
        if (typeof v !== 'string') {
            v = JSON.stringify(v);
        }
        window.localStorage.setItem(this.default.sign + k, v);
    };
    /**
     * @param k string
     * @description localStorage get 没有值 返回false
     */
    Session.prototype.getL = function (k) {
        if (!k) {
            throw new Error('请传入key');
        }
        var data;
        var d = window.localStorage.getItem(this.default.sign + k);
        if (d) {
            try {
                data = JSON.parse(d);
            }
            catch (_a) {
                data = d;
            }
            return data;
        }
        else {
            return false;
        }
    };
    /**
     * @param k string
     * @description localStorage remove
     */
    Session.prototype.removeL = function (k) {
        if (!k) {
            throw new Error('请传入key');
        }
        window.localStorage.removeItem(this.default.sign + k);
    };
    /**
     * @param k string
     * @param v any
     * @description sessionStorage set
     */
    Session.prototype.setS = function (k, v) {
        if (v === void 0) { v = ''; }
        if (!k) {
            throw new Error('请传入key');
        }
        if (typeof v !== 'string') {
            v = JSON.stringify(v);
        }
        window.sessionStorage.setItem(this.default.sign + k, v);
    };
    /**
     * @param k string
     * @description sessionStorage get 没有值 返回false
     */
    Session.prototype.getS = function (k) {
        if (!k) {
            throw new Error('请传入key');
        }
        var data;
        var d = window.sessionStorage.getItem(this.default.sign + k);
        if (d) {
            try {
                data = JSON.parse(d);
            }
            catch (_a) {
                data = d;
            }
            return data;
        }
        else {
            return false;
        }
    };
    /**
     * @param k string
     * @description sessionStorage remove
     */
    Session.prototype.removeS = function (k) {
        if (!k) {
            throw new Error('请传入key');
        }
        window.sessionStorage.removeItem(this.default.sign + k);
    };
    return Session;
}());
var session = new Session();
exports.default = session;
