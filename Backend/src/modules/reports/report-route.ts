import { Router } from "express";
import { ReportController } from "./report-controller";

const path="/reports"

export class ReportRoute extends ReportController{
    constructor(router:Router){
        super();
        this.route(router)
    }
   
    public route(router:Router){
    router.get(`${path}/apps/:id`,this.getTotalApplicationsSoldMonthly)
    }
}
