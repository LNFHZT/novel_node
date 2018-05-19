   let config = {
       routeConfig: [{
           apititle: '/api/user',
           routeExample: require('./route/user'),
       }, {
           apititle: '/api/account',
           routeExample: require('./route/account'),
       }, ],

       dbcConfig: {
           host: 'localhost',
           user: 'root',
           password: 'qx123456',
           database: 'test'
       },
       listen: 3000,
   }
   module.exports = config;