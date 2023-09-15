import { NextFunction, Request, Response } from "express";
import {
    ErrorController,
    SuccessResponse,
    BadRequestError,
    AuthFailureError,
    NoContentResponse,
    ApiError,
} from "../../core/index";
import { roles } from '../../Enum/rolesEnum'
const { db1, db2 } = require("../../db");
const EC = new ErrorController();

export class DemoCreds {

    /************Save Credential *******************/
    public async saveCredentials(req: Request, res: Response) {
        try {
            const reqBody = {
                type: req.body.type || "",
                email: req.body.email || "",
                password: req.body.password || "",
            }
            //@ts-ignore
            if (reqBody && req.role == roles.super_admin) {
                let saveData = await db1.creds.create(reqBody);
                if (saveData) {
                    saveData = JSON.parse(JSON.stringify(saveData));
                    await db2.creds.create(reqBody)
                    new SuccessResponse(EC.created, saveData).send(res);
                } else {
                    throw new Error(EC.error);
                }
            } else {
                ApiError.handle(new AuthFailureError("You are not authorized to perform this action"), res)
            }
        } catch (error: any) {
            ApiError.handle(new BadRequestError(error.message), res)
        }

    }

    /************List All Credential *******************/
    public async listCredentials(req: Request, res: Response) {
        try {
            //@ts-ignore
            if (req.role == roles.super_admin) {
                let data = await db1.creds.findAll({
                    where: { is_deleted: 0 }
                });
                if (data) {
                    data = JSON.parse(JSON.stringify(data));
                    new SuccessResponse(EC.created, {
                        count: data.length,
                        rows: data
                    }).send(res);
                } else {
                    new NoContentResponse(EC.noContent, {
                        count: data.rows.length,
                        rows: []
                    }).send(res)
                }
            } else {
                ApiError.handle(new AuthFailureError("You are not authorized to perform this action"), res)
            }
        } catch (error: any) {
            ApiError.handle(new BadRequestError(error.message), res)
        }

    }

    /************Delete Credential *******************/
    public async removeCredentials(req: Request, res: Response) {
        try {
            //@ts-ignore
            if (req.role == roles.super_admin) {
                const existData = await db1.creds.findOne({
                    attributes: ['is_deleted'],
                    where: { id: req.params.id }
                })
                existData
                    ? await db1.creds.update({
                        is_deleted: 1,
                    }, { where: { id: req.params.id } }).then(async () => {
                        await db2.creds.update({
                            is_deleted: 1
                        }, { where: { id: req.params.id } }).then(() => new SuccessResponse(EC.deleted, {}).send(res))
                            .catch((error: any) => { throw new Error(error) })
                    }).catch((error: any) => { throw new Error(error) })
                        .catch((error: any) => { throw new Error(error) })
                    : new NoContentResponse(EC.noContent, {}).send(res)
            } else {
                ApiError.handle(new AuthFailureError("You are not authorized to perform this action"), res)
            }

        } catch (error: any) {
            ApiError.handle(new BadRequestError(error.message), res)
        }

    }
}