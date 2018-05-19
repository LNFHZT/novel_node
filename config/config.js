   let config = {
       routeConfig: [{
           apititle: '/api/user',
           routeExample: require('../route/user'),
       }, {
           apititle: '/api/account',
           routeExample: require('../route/account'),
       }, ],
       listen: 3000,
   }
   module.exports = config;