import { Request, Response } from "express";
import { result } from "lodash";
import {
  ErrorController,
  SuccessResponse,
  BadRequestError,
  ApiError,
  CreatedResponse,
  NoContentResponse,
  AuthFailureError
} from "../../core/index";
import { BadRequestResponse } from "../../core/ApiResponse";
// const { dbReader, dbWriter } = require("../../db");
const { db1, db2 } = require("../../db");
const EC = new ErrorController();

export class PackageController {
  /************* Add and Update Package's Details *************/
  public async save_package(req: Request, res: Response) {
    try {
      const createBody = {
        id: req.body.id || null,
        package_name: req.body.package_name,
        description: req.body.description || "",
        price: req.body?.price || null,
        type:
          (req.body?.type).replace(/^./, req.body?.type[0].toUpperCase()) || "", //monthly,quarterly and yearly
      };
      //@ts-ignore
      if (req.role === "ADMIN") {
        if (!createBody.id) {
          await db1.packages
            .create(createBody)
            .then((result: any) => {
              new CreatedResponse(EC.created, result).send(res);
            })
            .catch((error: any) => {
              throw new Error(error);
            });
        } else {
          await db1.packages
            .update(createBody, { where: { id: createBody.id } })
            .then((result: any) => {
              new NoContentResponse(EC.updated, {}).send(res);
            })
            .catch((error: any) => {
              throw new Error(error);
            });
        }
      } else {
        ApiError.handle(new AuthFailureError("You are not authorized to perform this action."), res);
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  }

  /************** List of All Available Packages ************/
  public async list_packages(req: Request, res: Response) {
    try {
      //@ts-ignore
      if (req.role === "ADMIN") {

        await db1.packages
          .findAll()
          .then((result: any) => {
            new SuccessResponse(EC.fetched, {
              count: result.length,
              rows: result,
            }).send(res);
          })
          .catch((error: any) => {
            new NoContentResponse(EC.noContent, {
              count: result.length,
              rows: [],
            });
          });
      } else {
        ApiError.handle(new AuthFailureError("You are not authorized to perform this action."), res);
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  }

  /********** List of Single Package By Id ******************/
  public async list_package_by_id(req: Request, res: Response) {
    try {
      //@ts-ignore 
      if (req.role === "ADMIN") {
        await db1.packages
          .findOne({
            where: { id: req.params.id },
          })
          .then((result: any) => {
            new SuccessResponse(EC.fetched, result).send(res);
          })
          .catch((error: any) => {
            new NoContentResponse(EC.noContent, {}).send(res);
          });
      } else {
        ApiError.handle(new AuthFailureError("Your are not authorized to perform this action."), res);
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  }
}
