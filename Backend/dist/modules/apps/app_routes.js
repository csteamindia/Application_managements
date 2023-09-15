"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoute = void 0;
const app_controller_1 = require("./app_controller");
const path = "/apps";
const bearerToken = require('../../middleware/bearer-token');
class AppRoute extends app_controller_1.AppController {
    constructor(router) {
        super();
        this.route(router);
    }
    route(router) {
        router.post(`${path}/save`, bearerToken, this.save_app);
        router.get(`${path}/list`, bearerToken, this.list_apps);
        router.get(`${path}/list/byId/:id`, bearerToken, this.list_app);
    }
}
exports.AppRoute = AppRoute;
