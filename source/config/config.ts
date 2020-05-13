import user from '../route/admin/user';
import noProofAdmin from '../route/no_proof/admin';
const config = {
    routers: [
        {
            api: '/admin/check/user',
            route: user,
        },
        {
            api: '/admin',
            route: noProofAdmin,
        },
    ],
    // routeConfig: [{
    //     api: '/common',
    //     route: require('../route/common/common'),
    // }, {
    //     api: '/test/route/test',
    //     route: require('../route/test/test'),
    // },],
    listen: 3000,
}
/**
 * {
           api: '/api/user',
           route: require('../route/user'),
       }
 */
export default config;