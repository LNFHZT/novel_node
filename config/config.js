   const config = {
       routeConfig: [{
           apititle: '/api/admin/base',
           routeExample: require('../route/admin/base'),
       }, {
           apititle: '/test/route/test',
           routeExample: require('../route/test/test'),
       }, ],
       listen: 3000,
   }
   /**
    * {
              apititle: '/api/user',
              routeExample: require('../route/user'),
          }, {
              apititle: '/api/account',
              routeExample: require('../route/account'),
          }, 
    */
   module.exports = config;