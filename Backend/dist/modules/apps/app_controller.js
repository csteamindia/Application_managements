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
exports.AppController = void 0;
const index_1 = require("../../core/index");
const { db1, db2 } = require('../../db');
const { dbReader, dbWriter } = require("../../db");
const EC = new index_1.ErrorController();
const bcrypt_1 = require("bcrypt");
class AppController {
    constructor() {
        //Add new Application
        this.save_app = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            try {
                const reqBody = {
                    id: ((_a = req.body) === null || _a === void 0 ? void 0 : _a.id) || null,
                    app_title: ((_b = req.body) === null || _b === void 0 ? void 0 : _b.app_title) || "",
                    logo: ((_c = req.body) === null || _c === void 0 ? void 0 : _c.logo) || "",
                    url: ((_d = req.body) === null || _d === void 0 ? void 0 : _d.url) || "",
                    admin_url: ((_e = req.body) === null || _e === void 0 ? void 0 : _e.admin_url) || "",
                    domain_expiry_date: ((_f = req.body) === null || _f === void 0 ? void 0 : _f.domain_expiry_date) || new Date(),
                    database: ((_g = req.body) === null || _g === void 0 ? void 0 : _g.database) || "",
                    database_host: ((_h = req.body) === null || _h === void 0 ? void 0 : _h.database_host) || "",
                    database_username: ((_j = req.body) === null || _j === void 0 ? void 0 : _j.database_username) || "",
                    database_password: (yield (0, bcrypt_1.hash)((_k = req.body) === null || _k === void 0 ? void 0 : _k.database_password, 10)) || "",
                    last_backup: ((_l = req.body) === null || _l === void 0 ? void 0 : _l.last_backup) || "",
                    app_status: ((_m = req.body) === null || _m === void 0 ? void 0 : _m.app_status) || "",
                };
                let save, update;
                //@ts-ignore
                if (req.role === "ADMIN") {
                    if (reqBody.id) {
                        update = yield db1.apps.update(reqBody, {
                            where: { id: reqBody.id },
                        });
                        if (update[0] == 1) {
                            new index_1.NoContentResponse(EC.updated, {}).send(res);
                        }
                        else {
                            throw new Error("Something went wrong while update record!");
                        }
                    }
                    else {
                        save = yield db1.apps.create(reqBody);
                        save = JSON.parse(JSON.stringify(save));
                        if (save) {
                            delete save.database_password;
                            new index_1.CreatedResponse(EC.created, save).send(res);
                        }
                        else {
                            throw new Error(EC.error);
                        }
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
        //List all created Apps
        this.list_apps = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                if (req.role === "ADMIN") {
                    let data = yield db1.apps.findAll({
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
                        data.forEach((element) => {
                            delete element.database_password;
                        });
                        new index_1.SuccessResponse(EC.fetched, {
                            count: data.length,
                            rows: data,
                        }).send(res);
                    }
                    else {
                        new index_1.NoContentResponse(EC.noContent, {
                            count: data.length,
                            rows: [],
                        });
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
        //List single app by id
        this.list_app = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                if (req.role === "ADMIN") {
                    let data = yield db1.apps.findOne({
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
                        new index_1.SuccessResponse(EC.fetched, data).send(res);
                    }
                    else {
                        new index_1.NoContentResponse(EC.noContent, {}).send(res);
                    }
                }
                else {
                    index_1.ApiError.handle(new index_1.AuthFailureError("You are not authorized to perform this action."), res);
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
    }
}
exports.AppController = AppController;
