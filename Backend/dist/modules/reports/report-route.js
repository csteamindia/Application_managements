"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRoute = void 0;
const report_controller_1 = require("./report-controller");
const path = "/reports";
class ReportRoute extends report_controller_1.ReportController {
    constructor(router) {
        super();
        this.route(router);
    }
    route(router) {
        router.get(`${path}/apps/:id`, this.getTotalApplicationsSoldMonthly);
    }
}
exports.ReportRoute = ReportRoute;
