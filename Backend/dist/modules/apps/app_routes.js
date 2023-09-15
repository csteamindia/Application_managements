"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoute = void 0;
const app_controller_1 = require("./app_controller");
const bearerToken = require('../../middleware/bearer-token');
class AppRoute extends app_controller_1.AppController {
    constructor(router) {
        super();
        this.route(router);
    }
    route(router) {
        router.get('/apps', bearerToken, this.list_apps);
        router.get('/app/:id', bearerToken, this.list_app);
        router.post('/app/create', bearerToken, this.save_app);
    }
}
exports.AppRoute = AppRoute;
