import Vue from 'vue';
import fetch from './fetch';
import filter from './filter'
import ElementUI from 'element-ui'
import session from './session';
import api from './api';
import './mock';
const plugins = [fetch, session, ElementUI, filter, api]

plugins.forEach(item => {
  Vue.use(item)
})