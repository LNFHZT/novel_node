const Mock = require('mockjs');
import api from '@/plugins/api';
Mock.mock(api.reqGetUserList, 'get', function () {
    return {
        status: 1,
        msg: 'ok',
        data: {
            result: []
        }
    }
});