import { Request, Response } from "express";
import {
  ErrorController,
  SuccessResponse,
  BadRequestError,
  CreatedResponse,
  NoContentResponse,
  ApiError,
  AuthFailureError,
} from "../../core/index";
const { db1, db2 } = require('../../db')
import {roles} from '../../Enum/rolesEnum';
const { dbReader, dbWriter } = require("../../db");
const EC = new ErrorController();
import { hash, compare } from "bcrypt";
export class AppController {
  //Add new Application
  public save_app = async (req: Request, res: Response) => {
    try {

      const reqBody = {
        id: req.body?.id || null,
        app_title: req.body?.app_title || "",
        logo: req.body?.logo || "",
        url: req.body?.url || "",
        admin_url: req.body?.admin_url || "",
        domain_expiry_date: req.body?.domain_expiry_date || new Date(),
        database: req.body?.database || "",
        database_host: req.body?.database_host || "",
        database_username: req.body?.database_username || "",
        database_password: (await hash(req.body?.database_password, 10)) || "",
        last_backup: req.body?.last_backup || "",
        app_status: req.body?.app_status || "",
      };
      let save, update;
      //@ts-ignore
      if (req.role === roles.super_admin) {
        if (reqBody.id) {
          update = await db1.apps.update(reqBody, {
            where: { id: reqBody.id },
          });
          if (update[0] == 1) {
            new NoContentResponse(EC.updated, {}).send(res);
          } else {
            throw new Error("Something went wrong while update record!");
          }
        } else {
          save = await db1.apps.create(reqBody);
          save = JSON.parse(JSON.stringify(save));
          if (save) {
            delete save.database_password;
            new CreatedResponse(EC.created, save).send(res);
          } else {
            throw new Error(EC.error);
          }
        }
      } else {
        ApiError.handle(new AuthFailureError("You are not authorized to perform this action"), res)
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };

  //List all created Apps
  public list_apps = async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      if (req.role === roles.super_admin) {
        let data = await db1.apps.findAll({
          include: [
            {
              model: db1.users,
              attributes: [["full_name", "Full Name"], "Domain"],
              // attributes: { exclude: "id" },
            },
          ],
        });
        data = JSON.parse(JSON.stringify(data));
        if (data.length > 0) {
          data.forEach((element: any) => {
            delete element.database_password;
          });
          new SuccessResponse(EC.fetched, {
            count: data.length,
            rows: data,
          }).send(res);
        } else {
          new NoContentResponse(EC.noContent, {
            count: data.length,
            rows: [],
          });
        }
      } else {
        ApiError.handle(new AuthFailureError("You are not authorized to perform this action"), res)
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };

  //List single app by id
  public list_app = async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      if (req.role === roles.super_admin) {
        let data = await db1.apps.findOne({
          where: {
            id: req.params.id,
          },
          include: [
            {
              model: db1.users,
              attributes: [["full_name", "Full Name"], "Domain"],
              // group: [dbReader.Sequelize.fn("count",dbReader.Sequelize.col("app_id"))],
            },
          ],
        });
        data = JSON.parse(JSON.stringify(data));
        if (data) {
          delete data.database_password;
          new SuccessResponse(EC.fetched, data).send(res);
        } else {
          new NoContentResponse(EC.noContent, {}).send(res);
        }
      } else {
        ApiError.handle(new AuthFailureError("You are not authorized to perform this action."), res);
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };
}
