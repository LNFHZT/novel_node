   const config = {
       routeConfig: [{
           apititle: '/admin/base',
           routeExample: require('../route/admin/base'),
       }, {
           apititle: '/admin/power',
           routeExample: require('../route/admin/power'),
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