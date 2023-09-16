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
exports.UserController = void 0;
const index_1 = require("../../core/index");
const { db1, db2 } = require("../../db");
const EC = new index_1.ErrorController();
const jwt = require("jsonwebtoken");
const rolesEnum_1 = require("../../Enum/rolesEnum");
class UserController {
    constructor() {
        /**
         * @method Post
         * @req - Object.
         * @res - Json-Object.
         * @desc - Create or Update new User or Existing User.
         */
        this.save_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                }
                else {
                    throw new Error("Expiry date should be greater than subscribed date");
                }
                console.log("proceed");
                // @ts-ignore
                if (req.role == rolesEnum_1.roles.super_admin) {
                    const user = yield db1.users.findOne({
                        where: { email: payload.email },
                    });
                    let updateData;
                    if (payload.id) {
                        updateData = yield db1.users.update(payload, {
                            where: { id: payload.id },
                        }).then(() => __awaiter(this, void 0, void 0, function* () {
                            yield db1.users.findOne({ where: { id: payload.id }, });
                            yield db1.creds.update({
                                type: payload.role,
                                email: payload.email,
                                password: payload.password
                            }, { where: { id: payload.id } });
                            yield db2.creds.update({
                                type: payload.role,
                                email: payload.email,
                                password: payload.password
                            }, { where: { id: payload.id } });
                            new index_1.NoContentResponse(EC.updated, user).send(res);
                        })).catch((error) => {
                            console.error(error);
                        });
                    }
                    else {
                        if (user) {
                            throw new Error("Email already taken..! Please try another");
                        }
                        else {
                            const data = yield db1.users.create(Object.assign({}, payload));
                            const user = JSON.parse(JSON.stringify(data));
                            if (user) {
                                yield db2.users.create(Object.assign({}, payload)).then((data) => __awaiter(this, void 0, void 0, function* () {
                                    data = JSON.parse(JSON.stringify(data));
                                    yield db1.creds.create({
                                        type: data.role,
                                        email: data.email,
                                        password: data.password
                                    }).then((dataD1) => __awaiter(this, void 0, void 0, function* () {
                                        dataD1 = JSON.parse(JSON.stringify(dataD1));
                                        yield db2.creds.create({
                                            type: dataD1.type,
                                            email: dataD1.email,
                                            password: dataD1.password
                                        });
                                    })).catch((error) => console.error(error));
                                })).catch((error) => console.error(error));
                                delete user.password;
                                user.privileges = JSON.parse(user.privileges);
                                new index_1.CreatedResponse(EC.created, {}).send(res);
                            }
                            else {
                                throw new Error(EC.error);
                            }
                        }
                    }
                }
                else {
                    index_1.ApiError.handle(new index_1.AuthFailureError("You are not authorized to perform this operation"), res);
                }
            }
            catch (e) {
                index_1.ApiError.handle(new index_1.BadRequestError(e.message), res);
            }
        });
        /**
         * @method Post
         * @req - Object
         * @res - Json_Object(token)
         * @desc - Login Application Email and Password
         */
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const LoginCred = {
                    email: process.env.EMAIL,
                    password: process.env.PASSWORD,
                    role: process.env.ROLE
                };
                if (payload.email === LoginCred.email &&
                    payload.password === LoginCred.password) {
                    const token = jwt.sign(LoginCred, process.env.JWT_SECRET_KEY);
                    new index_1.SuccessResponse(EC.success, {
                        token: token,
                    }).send(res);
                }
                else {
                    index_1.ApiError.handle(new index_1.AuthFailureError(EC.loginFail), res);
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
        /**
         * @method Get
         * @res -Array of Object
         * @desc -Get All Data Rows
         */
        this.list_users = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                if (req.role === rolesEnum_1.roles.super_admin) {
                    let user = yield db1.users.findAll({
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
                        user.forEach((element) => {
                            // delete element.password;
                            element.privileges = JSON.parse(element.privileges);
                            element.package_name =
                                element.package != null ? element.package.package_name : "";
                            delete element.package;
                        });
                        new index_1.SuccessResponse(EC.fetched, {
                            count: user.length,
                            rows: user,
                        }).send(res);
                    }
                    else {
                        new index_1.NoContentResponse(EC.noContent, {
                            count: user.length,
                            rows: [],
                        }).send(res);
                    }
                }
                else {
                    index_1.ApiError.handle(new index_1.AuthFailureError("You are not authorized to perform this operation"), res);
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
        /**
         * @method Get
         * @param req - int ID
         * @param res - Json-Object
         */
        this.single_user = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                if (req.role === rolesEnum_1.roles.super_admin) {
                    let user = yield db1.users.findOne({
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
                        new index_1.SuccessResponse(EC.fetched, user).send(res);
                    }
                    else {
                        new index_1.NoContentResponse(EC.noContent, {}).send(res);
                    }
                }
                else {
                    index_1.ApiError.handle(new index_1.AuthFailureError("You are not authorized to perform this operation"), res);
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
        /**
         * @method Get
         * @param req int Application ID
         * @param res Array of Object
         */
        this.list_app_users = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                if (req.role === rolesEnum_1.roles.super_admin) {
                    let user = yield db1.users.findAll({
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
                        user.forEach((element) => {
                            delete element.password;
                            element.privileges = JSON.parse(element.privileges);
                            element.package_name =
                                element.package != null ? element.package.package_name : "";
                            delete element.package;
                        });
                        new index_1.SuccessResponse(EC.fetched, {
                            count: user.length,
                            rows: user,
                        }).send(res);
                    }
                    else {
                        new index_1.NoContentResponse(EC.noContent, {
                            count: user.length,
                            rows: [],
                        }).send(res);
                    }
                }
                else {
                    index_1.ApiError.handle(new index_1.AuthFailureError("You are not authorized to perform this operation"), res);
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
        /**
         * @method Get
         * @req int ID
         * @res Json-Object
         * @desc Update the User Subscription Activation.
         */
        this.user_deactivation = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                if (req.role === rolesEnum_1.roles.super_admin) {
                    let user = yield db1.users.findOne({
                        where: { id: req.params.id, is_active: 0 },
                    });
                    user = JSON.parse(JSON.stringify(user));
                    if (user) {
                        yield db1.users.update({
                            is_active: 1
                        }, { where: { id: req.params.id } }).then(() => __awaiter(this, void 0, void 0, function* () {
                            yield db1.creds.update({ is_deleted: 1 }, { where: { id: req.params.id } });
                            yield db2.creds.update({ is_deleted: 1 }, { where: { id: req.params.id } });
                            new index_1.SuccessResponse(EC.deleted, {}).send(res);
                        }));
                    }
                    else {
                        new index_1.NoContentResponse(EC.noContent, {}).send(res);
                    }
                }
                else {
                    index_1.ApiError.handle(new index_1.AuthFailureError("You are not authorized to perform this operation"), res);
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
    }
}
exports.UserController = UserController;
