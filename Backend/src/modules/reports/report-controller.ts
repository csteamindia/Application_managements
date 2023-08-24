import { NextFunction, Request, Response } from "express";
import {
  ErrorController,
  SuccessResponse,
  BadRequestError,
  CreatedResponse,
  NoContentResponse,
  ApiError,
} from "../../core/index";
const { dbReader, dbWriter } = require("../../db");
const EC = new ErrorController();

export class ReportController {

  public async getTotalApplicationsSoldMonthly(req: Request, res: Response) {
    try {
      let totalUser = await dbReader.apps.findOne({
        attributes: [['app_title', 'Application']],
        where: { id: req.params.id },
        include: [{
          model: dbReader.users,
          attributes: ['full_name', 'package_id', 'email','subscribed_date'],
          include: [{
            as: 'package',
            model: dbReader.packages,
            attributes: ['package_name', 'price']
          }]
        }],
        // group:['subscribed_date']
      })
      totalUser = JSON.parse(JSON.stringify(totalUser));
      let total_amount: any = 0;
      if (totalUser) {
        totalUser.users.forEach((x: any) => {
          total_amount = total_amount + x.package.price;
          // console.log("data", x)
        })
        console.log(total_amount)
        new SuccessResponse(EC.success, {
          user_count: totalUser.users.length,
          total_amount,
          totalUser
        }).send(res)
      } else {
        throw new Error()
      }
    }
    catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  }
}
