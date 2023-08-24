import { Router } from "express";
import { AppController } from "./app_controller";
const path = "/apps";
const bearerToken = require('../../middleware/bearer-token');

export class AppRoute extends AppController {
  constructor(router: Router) {
    super();
    this.route(router);
  }

  public route(router: Router) {
    router.post(`${path}/save`,bearerToken, this.save_app);
    router.get(`${path}/list`,bearerToken, this.list_apps);
    router.get(`${path}/list/byId/:id`,bearerToken, this.list_app);
  }
}
