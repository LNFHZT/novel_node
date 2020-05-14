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
    listen: 3000,
    check: false
}

export default config;