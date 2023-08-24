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
exports.PackageController = void 0;
const lodash_1 = require("lodash");
const index_1 = require("../../core/index");
// const { dbReader, dbWriter } = require("../../db");
const { db1, db2 } = require("../../db");
const EC = new index_1.ErrorController();
class PackageController {
    /************* Add and Update Package's Details *************/
    save_package(req, res) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createBody = {
                    id: ((_a = req.body) === null || _a === void 0 ? void 0 : _a.id) || null,
                    package_name: ((_b = req.body) === null || _b === void 0 ? void 0 : _b.package_name) || "",
                    description: ((_c = req.body) === null || _c === void 0 ? void 0 : _c.description) || "",
                    price: ((_d = req.body) === null || _d === void 0 ? void 0 : _d.price) || null,
                    type: ((_e = req.body) === null || _e === void 0 ? void 0 : _e.type).replace(/^./, (_f = req.body) === null || _f === void 0 ? void 0 : _f.type[0].toUpperCase()) || "", //monthly,quarterly and yearly
                };
                //@ts-ignore
                if (req.role === "ADMIN") {
                    if (!createBody.id) {
                        yield db1.packages
                            .create(createBody)
                            .then((result) => {
                            new index_1.CreatedResponse(EC.created, result).send(res);
                        })
                            .catch((error) => {
                            throw new Error(error);
                        });
                    }
                    else {
                        yield db1.packages
                            .update(createBody, { where: { id: createBody.id } })
                            .then((result) => {
                            new index_1.NoContentResponse(EC.updated, {}).send(res);
                        })
                            .catch((error) => {
                            throw new Error(error);
                        });
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
    /************** List of All Available Packages ************/
    list_packages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                if (req.role === "ADMIN") {
                    yield db1.packages
                        .findAll()
                        .then((result) => {
                        new index_1.SuccessResponse(EC.fetched, {
                            count: result.length,
                            rows: result,
                        }).send(res);
                    })
                        .catch((error) => {
                        new index_1.NoContentResponse(EC.noContent, {
                            count: lodash_1.result.length,
                            rows: [],
                        });
                    });
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
    /********** List of Single Package By Id ******************/
    list_package_by_id(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore 
                if (req.role === "ADMIN") {
                    yield db1.packages
                        .findOne({
                        where: { id: req.params.id },
                    })
                        .then((result) => {
                        new index_1.SuccessResponse(EC.fetched, result).send(res);
                    })
                        .catch((error) => {
                        new index_1.NoContentResponse(EC.noContent, {}).send(res);
                    });
                }
                else {
                    index_1.ApiError.handle(new index_1.AuthFailureError("Your are not authorized to perform this action."), res);
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
    }
}
exports.PackageController = PackageController;
