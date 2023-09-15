import { Router } from "express";
import { AppController } from "./app_controller";
const bearerToken = require('../../middleware/bearer-token');

export class AppRoute extends AppController {
  constructor(router: Router) {
    super();
    this.route(router);
  }

  public route(router: Router) {
    router.get('/apps',bearerToken, this.list_apps);
    router.get('/app/:id',bearerToken, this.list_app);
    router.post('/app/create',bearerToken, this.save_app);
  }
}
