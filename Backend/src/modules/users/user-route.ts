import { Router } from "express";
import { UserController } from "./user-controller";
const path = "/users";
const bearerToken = require('../../middleware/bearer-token')

export class UserRoute extends UserController {
  constructor(router: Router) {
    super();
    this.route(router);
  }

  public route(router: Router) {
    router.post(`${path}/save`,bearerToken, this.save_user);
    router.post(`${path}/login`, this.login);
    router.get(`${path}/list`,bearerToken, this.list_users);
    router.get(`${path}/list/:id`,bearerToken, this.single_user);
    router.get(`${path}/app/list/:app_id`,bearerToken, this.list_app_users)
    router.delete(`${path}/delete/:id`,bearerToken, this.user_deactivation);
  }
}
