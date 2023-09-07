"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoCredsRoute = void 0;
const demo_cred_controller_1 = require("./demo-cred-controller");
const path = "/creds";
const bearerToken = require('../../middleware/bearer-token');
class DemoCredsRoute extends demo_cred_controller_1.DemoCreds {
    constructor(router) {
        super();
        this.route(router);
    }
    route(router) {
        router.post(`${path}/save`, bearerToken, this.saveCredentials);
        router.get(`${path}/list`, bearerToken, this.listCredentials);
        router.delete(`${path}/delete/:id`, bearerToken, this.removeCredentials);
    }
}
exports.DemoCredsRoute = DemoCredsRoute;
