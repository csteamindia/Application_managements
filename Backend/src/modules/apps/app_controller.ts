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
const { db2, dbConfig, queryData, queriObject } = require('../../helpers/helpers')
const { db1 } = require('../../db')
import {roles} from '../../Enum/rolesEnum';
const EC = new ErrorController();
import { hash  } from "bcrypt";

export class AppController {

  /**
   * Create New Application
   * @param req POST
   *  - {}
   * @param res Json-Object 
   */
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
            queryData(reqBody.app_title)
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

  /**
   * Get All DATA Rows 
   * @param req GET
   * @param res Array-Object
   */
  public list_apps = async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      if (req.role === roles.super_admin) {
        let data = await db1.apps.findAll({
          include: [
            {
              model: db1.users,
              attributes: [["full_name", "Full Name"], "Domain"],
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

  /**
   * Get Single App Data
   * @param req GET
   *    Int ID
   * @param res 
   *  - Object 
   */
  public list_app = async (req: Request, res: Response) => {
    
    const data = await queriObject()
    await db2(req.params.id).then((conn: any) => {
      conn.query(data.tracking?.login, dbConfig)
      .then((data: any) => {
        new SuccessResponse(EC.fetched, data).send(res);
      })
    })
    .catch((error: { message: string | undefined; }) => {
      ApiError.handle(new BadRequestError(error.message), res);
    });
  };
}
