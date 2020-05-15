import Vue from 'vue';
import fetch from './fetch';
import filter from './filter'
import ElementUI from 'element-ui'
import session from './session';
const plugins = [ fetch, session, ElementUI, filter ]

plugins.forEach(item => {
  Vue.use(item)
})