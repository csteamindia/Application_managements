import { NextFunction, Request, Response } from "express";
import {
  ErrorController,
  SuccessResponse,
  BadRequestError,
  CreatedResponse,
  AuthFailureError,
  NoContentResponse,
  ApiError,
} from "../../core/index";
const { db1, db2 } = require("../../db");
const EC = new ErrorController();
const jwt = require("jsonwebtoken");
import { roles } from '../../Enum/rolesEnum'
export class UserController {
  
  /**
   * @method Post
   * @req - Object.
   * @res - Json-Object.
   * @desc - Create or Update new User or Existing User.
   */
  public save_user = async (req: Request, res: Response) => {
    try {
      const payload = {
        id: req.body.id || null,
        app_id: req.body.app_id || null,
        package_id: req.body.package_id || null,
        subscribed_date: req.body.subscribed_date || null,
        expiry_date: req.body.expiry_date || null,
        full_name: req.body.full_name || "",
        username: req.body.username || "",
        password: req.body.password || "",
        email: req.body.email || "",
        mobile: req.body.mobile || "",
        role: req.body.role.toUpperCase() || "",
        domain: req.body.domain || "",
        privileges: JSON.stringify(req.body.privileges) || "",
        org_name: req.body.org_name || "",
        org_type: req.body.org_type || "",
        is_active: 0
      };

      if (payload.expiry_date > payload.subscribed_date) {
        payload.expiry_date = payload.expiry_date;
      } else {
        throw new Error("Expiry date should be greater than subscribed date");
      }
      console.log("proceed")
      // @ts-ignore
      if (req.role == roles.super_admin) {
        const user = await db1.users.findOne({
          where: { email: payload.email },
        });

        let updateData;
        if (payload.id) {
          updateData = await db1.users.update(payload, {
            where: { id: payload.id },
          }).then(async () => {
            await db1.users.findOne({ where: { id: payload.id }, })

            await db1.creds.update({
              type: payload.role,
              email: payload.email,
              password: payload.password
            }, { where: { id: payload.id } });

            await db2.creds.update({
              type: payload.role,
              email: payload.email,
              password: payload.password
            }, { where: { id: payload.id } })
            new NoContentResponse(EC.updated, user).send(res)
          }).catch((error: any) => {
            console.error(error);
          });
        } else {
          if (user) {
            throw new Error("Email already taken..! Please try another");
          } else {
            const data = await db1.users.create({ ...payload });
            const user = JSON.parse(JSON.stringify(data));
            if (user) {
              await db2.users.create({ ...payload }).then(async (data: any) => {
                data = JSON.parse(JSON.stringify(data));
                await db1.creds.create({
                  type: data.role,
                  email: data.email,
                  password: data.password
                }).then(async (dataD1: any) => {
                  dataD1 = JSON.parse(JSON.stringify(dataD1));
                  await db2.creds.create({
                    type: dataD1.type,
                    email: dataD1.email,
                    password: dataD1.password
                  })
                }).catch((error: any) => console.error(error))
              }).catch((error: any) => console.error(error))
              delete user.password;
              user.privileges = JSON.parse(user.privileges);
              new CreatedResponse(EC.created, {}).send(res);
            } else {
              throw new Error(EC.error);
            }
          }
        }
      } else {
        ApiError.handle(new AuthFailureError("You are not authorized to perform this operation"), res);
      }
    } catch (e: any) {
      ApiError.handle(new BadRequestError(e.message), res);
    }
  };


  /**
   * @method Post
   * @req - Object
   * @res - Json_Object(token)
   * @desc - Login Application Email and Password
   */
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const LoginCred = {
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
        role: process.env.ROLE
      };

      if (
        payload.email === LoginCred.email &&
        payload.password === LoginCred.password
      ) {
        const token = jwt.sign(LoginCred, process.env.JWT_SECRET_KEY);
        new SuccessResponse(EC.success, {
          token: token,
        }).send(res);
      } else {
        ApiError.handle(new AuthFailureError(EC.loginFail), res);
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };

/**
 * @method Get
 * @res -Array of Object
 * @desc -Get All Data Rows
 */
  public list_users = async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      if (req.role === roles.super_admin) {
        let user = await db1.users.findAll({
          where: { is_active: 0 },
          include: [
            {
              model: db1.packages,
              as: "package",
              attributes: ["package_name", "price", ["type", "Package Type"]],
            },
          ],
        });
        user = JSON.parse(JSON.stringify(user));
        if (user.length > 0) {
          user.forEach((element: any) => {
            // delete element.password;
            element.privileges = JSON.parse(element.privileges);
            element.package_name =
              element.package != null ? element.package.package_name : "";
            delete element.package;
          });
          new SuccessResponse(EC.fetched, {
            count: user.length,
            rows: user,
          }).send(res);
        } else {
          new NoContentResponse(EC.noContent, {
            count: user.length,
            rows: [],
          }).send(res);
        }
      } else {
        ApiError.handle(new AuthFailureError("You are not authorized to perform this operation"), res);
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };


  /**
   * @method Get
   * @param req - int ID
   * @param res - Json-Object
   */
  public single_user = async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      if (req.role === roles.super_admin) {
        let user = await db1.users.findOne({
          where: { id: req.params.id, is_active: 0 },
          include: [
            {
              model: db1.packages,
              as: "package",
              attributes: [
                ["package_name", "Package Name"],
                "price",
                ["type", "Package Type"],
              ],
            },
          ],
        });
        user = JSON.parse(JSON.stringify(user));
        if (user) {
          delete user.password;
          delete user.id;
          user.privileges = JSON.parse(user.privileges);
          new SuccessResponse(EC.fetched, user).send(res);
        } else {
          new NoContentResponse(EC.noContent, {}).send(res);
        }
      } else {
        ApiError.handle(new AuthFailureError("You are not authorized to perform this operation"), res);
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };

/**
 * @method Get
 * @param req int Application ID 
 * @param res Array of Object
 */
  public list_app_users = async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      if (req.role === roles.super_admin) {
        let user = await db1.users.findAll({
          where: { app_id: req.params.app_id, is_active: 0 },
          include: [
            {
              model: db1.packages,
              as: "package",
              attributes: ["package_name", "price", ["type", "Package Type"]],
            },
          ],
        });
        user = JSON.parse(JSON.stringify(user));
        if (user.length > 0) {
          user.forEach((element: any) => {
            delete element.password;
            element.privileges = JSON.parse(element.privileges);
            element.package_name =
              element.package != null ? element.package.package_name : "";
            delete element.package;
          });
          new SuccessResponse(EC.fetched, {
            count: user.length,
            rows: user,
          }).send(res);
        } else {
          new NoContentResponse(EC.noContent, {
            count: user.length,
            rows: [],
          }).send(res);
        }
      } else {
        ApiError.handle(new AuthFailureError("You are not authorized to perform this operation"), res);
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };

  /**
   * @method Get
   * @req int ID 
   * @res Json-Object
   * @desc Update the User Subscription Activation. 
   */
  public user_deactivation = async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      if (req.role === roles.super_admin) {
        let user = await db1.users.findOne({
          where: { id: req.params.id, is_active: 0 },
        });
        user = JSON.parse(JSON.stringify(user));
        if (user) {
          await db1.users.update({
            is_active: 1
          }, { where: { id: req.params.id } }).then(async () => {

            await db1.creds.update({ is_deleted: 1 }, { where: { id: req.params.id } })
            await db2.creds.update({ is_deleted: 1 }, { where: { id: req.params.id } })
            new SuccessResponse(EC.deleted, {}).send(res);
          })
        } else {
          new NoContentResponse(EC.noContent, {}).send(res);
        }
      } else {
        ApiError.handle(new AuthFailureError("You are not authorized to perform this operation"), res);
      }
    } catch (error: any) {
      ApiError.handle(new BadRequestError(error.message), res);
    }
  };
}