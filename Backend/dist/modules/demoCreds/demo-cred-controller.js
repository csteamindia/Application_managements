"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoCreds = void 0;
const index_1 = require("../../core/index");
const rolesEnum_1 = require("../../Enum/rolesEnum");
const { db1, db2 } = require("../../db");
const EC = new index_1.ErrorController();
class DemoCreds {
    /************Save Credential *******************/
    saveCredentials(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqBody = {
                    type: req.body.type || "",
                    email: req.body.email || "",
                    password: req.body.password || "",
                };
                //@ts-ignore
                if (reqBody && req.role == rolesEnum_1.roles.super_admin) {
                    let saveData = yield db1.creds.create(reqBody);
                    if (saveData) {
                        saveData = JSON.parse(JSON.stringify(saveData));
                        yield db2.creds.create(reqBody);
                        new index_1.SuccessResponse(EC.created, saveData).send(res);
                    }
                    else {
                        throw new Error(EC.error);
                    }
                }
                else {
                    index_1.ApiError.handle(new index_1.AuthFailureError("You are not authorized to perform this action"), res);
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
    }
    /************List All Credential *******************/
    listCredentials(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                if (req.role == rolesEnum_1.roles.super_admin) {
                    let data = yield db1.creds.findAll({
                        where: { is_deleted: 0 }
                    });
                    if (data) {
                        data = JSON.parse(JSON.stringify(data));
                        new index_1.SuccessResponse(EC.created, {
                            count: data.length,
                            rows: data
                        }).send(res);
                    }
                    else {
                        new index_1.NoContentResponse(EC.noContent, {
                            count: data.rows.length,
                            rows: []
                        }).send(res);
                    }
                }
                else {
                    index_1.ApiError.handle(new index_1.AuthFailureError("You are not authorized to perform this action"), res);
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
    }
    /************Delete Credential *******************/
    removeCredentials(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                if (req.role == rolesEnum_1.roles.super_admin) {
                    const existData = yield db1.creds.findOne({
                        attributes: ['is_deleted'],
                        where: { id: req.params.id }
                    });
                    existData
                        ? yield db1.creds.update({
                            is_deleted: 1,
                        }, { where: { id: req.params.id } }).then(() => __awaiter(this, void 0, void 0, function* () {
                            yield db2.creds.update({
                                is_deleted: 1
                            }, { where: { id: req.params.id } }).then(() => new index_1.SuccessResponse(EC.deleted, {}).send(res))
                                .catch((error) => { throw new Error(error); });
                        })).catch((error) => { throw new Error(error); })
                            .catch((error) => { throw new Error(error); })
                        : new index_1.NoContentResponse(EC.noContent, {}).send(res);
                }
                else {
                    index_1.ApiError.handle(new index_1.AuthFailureError("You are not authorized to perform this action"), res);
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
    }
}
exports.DemoCreds = DemoCreds;
