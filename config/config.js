   let config = {
       routeConfig: [{
           apititle: '/api/user',
           routeExample: require('../route/user'),
       }, {
           apititle: '/api/account',
           routeExample: require('../route/account'),
       }, {
           apititle: '/api/admin/base',
           routeExample: require('../route/admin/base'),
       }, ],
       listen: 3000,
   }
   module.exports = config;