"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const user_controller_1 = require("./user-controller");
const path = "/users";
const bearerToken = require('../../middleware/bearer-token');
class UserRoute extends user_controller_1.UserController {
    constructor(router) {
        super();
        this.route(router);
    }
    route(router) {
        router.post(`${path}/save`, bearerToken, this.save_user);
        router.post(`${path}/login`, this.login);
        router.get(`${path}/list`, bearerToken, this.list_users);
        router.get(`${path}/list/:id`, bearerToken, this.single_user);
        router.get(`${path}/app/list/:app_id`, bearerToken, this.list_app_users);
        router.delete(`${path}/delete/:id`, bearerToken, this.user_deactivation);
    }
}
exports.UserRoute = UserRoute;
