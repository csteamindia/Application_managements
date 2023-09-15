"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageRoute = void 0;
const package_controller_1 = require("./package-controller");
const path = "/packages";
const bearerToken = require('../../middleware/bearer-token');
class PackageRoute extends package_controller_1.PackageController {
    constructor(router) {
        super();
        this.route(router);
    }
    route(router) {
        router.post(`${path}/save`, bearerToken, this.save_package);
        router.get(`${path}/list`, bearerToken, this.list_packages);
        router.get(`${path}/list/byId/:id`, bearerToken, this.list_package_by_id);
    }
}
exports.PackageRoute = PackageRoute;
