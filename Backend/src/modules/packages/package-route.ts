import { Router } from "express";
import { PackageController } from "./package-controller";
const path = "/packages";
const bearerToken = require('../../middleware/bearer-token');
export class PackageRoute extends PackageController {
  constructor(router: Router) {
    super();
    this.route(router);
  }

  public route(router: Router) {
    router.post(`${path}/save`,bearerToken, this.save_package);
    router.get(`${path}/list`,bearerToken, this.list_packages);
    router.get(`${path}/list/byId/:id`,bearerToken, this.list_package_by_id);
  }
}
