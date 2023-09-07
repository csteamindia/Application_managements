import { Router } from "express";
import { DemoCreds } from "./demo-cred-controller";
const path = "/creds";
const bearerToken = require('../../middleware/bearer-token')

export class DemoCredsRoute extends DemoCreds {
  constructor(router: Router) {
    super();
    this.route(router);
  }

  public route(router: Router) {
    router.post(`${path}/save`,bearerToken, this.saveCredentials);
    router.get(`${path}/list`,bearerToken, this.listCredentials);
    router.get(`${path}/list`,bearerToken, this.listCredentials);
    router.delete(`${path}/delete/:id`,bearerToken, this.removeCredentials);
  }
}
