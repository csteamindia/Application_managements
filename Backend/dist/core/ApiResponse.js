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
exports.TokenRefreshResponse = exports.AccessTokenErrorResponse = exports.FailureResponse = exports.NoContentResponse = exports.CreatedResponse = exports.SuccessResponse = exports.FailureMsgResponse = exports.NoContentMsgResponse = exports.CreatedMsgResponse = exports.SuccessMsgResponse = exports.InternalErrorResponse = exports.NotFoundCusResponse = exports.BadRequestResponse = exports.ForbiddenResponse = exports.NotFoundResponse = exports.AuthFailureResponse = void 0;
const { dbReader } = require("../db");
// const { accessLevel } = require("../modules/privileges/controller");
// Helper code for the API consumer to understand the error and handle is accordingly
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["SUCCESS"] = 200] = "SUCCESS";
    StatusCode[StatusCode["CREATED"] = 201] = "CREATED";
    StatusCode[StatusCode["ACCEPTED"] = 202] = "ACCEPTED";
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCode[StatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCode[StatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCode[StatusCode["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
})(StatusCode || (StatusCode = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["SUCCESS"] = 200] = "SUCCESS";
    ResponseStatus[ResponseStatus["CREATED"] = 201] = "CREATED";
    ResponseStatus[ResponseStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseStatus[ResponseStatus["ACCEPTED"] = 202] = "ACCEPTED";
    ResponseStatus[ResponseStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseStatus[ResponseStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseStatus[ResponseStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseStatus[ResponseStatus["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
})(ResponseStatus || (ResponseStatus = {}));
class ApiResponse {
    constructor(statusCode, status, message) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
    }
    prepare(res, response) {
        try {
            //@ts-ignore
            res.access_level = () => __awaiter(this, void 0, void 0, function* () { return yield accessLevel(res.req.user_id); });
        }
        catch (e) {
            console.log(e);
        }
        return res.status(this.status).json(ApiResponse.sanitize(response));
    }
    send(res) {
        return this.prepare(res, this);
    }
    static sanitize(response) {
        const clone = {};
        Object.assign(clone, response);
        // @ts-ignore
        delete clone.status;
        for (const i in clone)
            if (typeof clone[i] === "undefined")
                delete clone[i];
        return clone;
    }
}
class AuthFailureResponse extends ApiResponse {
    constructor(message = "Authentication Failure") {
        super(StatusCode.UNAUTHORIZED, ResponseStatus.UNAUTHORIZED, message);
    }
}
exports.AuthFailureResponse = AuthFailureResponse;
class NotFoundResponse extends ApiResponse {
    constructor(message = "Not Found") {
        super(StatusCode.NOT_FOUND, ResponseStatus.NOT_FOUND, message);
    }
    send(res) {
        var _a;
        this.url = (_a = res.req) === null || _a === void 0 ? void 0 : _a.originalUrl;
        return super.prepare(res, this);
    }
}
exports.NotFoundResponse = NotFoundResponse;
class ForbiddenResponse extends ApiResponse {
    constructor(message = "Forbidden") {
        super(StatusCode.FORBIDDEN, ResponseStatus.FORBIDDEN, message);
    }
}
exports.ForbiddenResponse = ForbiddenResponse;
class BadRequestResponse extends ApiResponse {
    constructor(message = "Bad Parameters") {
        super(StatusCode.BAD_REQUEST, ResponseStatus.BAD_REQUEST, message);
    }
}
exports.BadRequestResponse = BadRequestResponse;
class NotFoundCusResponse extends ApiResponse {
    constructor(message = "Data not found") {
        super(StatusCode.ACCEPTED, ResponseStatus.ACCEPTED, message);
    }
}
exports.NotFoundCusResponse = NotFoundCusResponse;
class InternalErrorResponse extends ApiResponse {
    constructor(message = "Internal Error") {
        super(StatusCode.INTERNAL_ERROR, ResponseStatus.INTERNAL_ERROR, message);
    }
}
exports.InternalErrorResponse = InternalErrorResponse;
class SuccessMsgResponse extends ApiResponse {
    constructor(message) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
    }
}
exports.SuccessMsgResponse = SuccessMsgResponse;
class CreatedMsgResponse extends ApiResponse {
    constructor(message) {
        super(StatusCode.CREATED, ResponseStatus.CREATED, message);
    }
}
exports.CreatedMsgResponse = CreatedMsgResponse;
class NoContentMsgResponse extends ApiResponse {
    constructor(message) {
        super(StatusCode.ACCEPTED, ResponseStatus.ACCEPTED, message);
    }
}
exports.NoContentMsgResponse = NoContentMsgResponse;
class FailureMsgResponse extends ApiResponse {
    constructor(message) {
        super(StatusCode.INTERNAL_ERROR, ResponseStatus.SUCCESS, message);
    }
}
exports.FailureMsgResponse = FailureMsgResponse;
class SuccessResponse extends ApiResponse {
    // access_level: any;
    constructor(message, data) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
        this.data = data;
    }
    send(res) {
        // new Promise((resolve, reject) => {
        //   //@ts-ignore
        //   resolve(accessLevel(res.req.user_id));
        // }).then((prev) => {
        //   this.access_level = prev;
        // });
        return super.prepare(res, this);
    }
}
exports.SuccessResponse = SuccessResponse;
class CreatedResponse extends ApiResponse {
    constructor(message, data) {
        super(StatusCode.CREATED, ResponseStatus.CREATED, message);
        this.data = data;
    }
    send(res) {
        return super.prepare(res, this);
    }
}
exports.CreatedResponse = CreatedResponse;
class NoContentResponse extends ApiResponse {
    constructor(message, data) {
        super(StatusCode.ACCEPTED, ResponseStatus.ACCEPTED, message);
        this.data = data;
    }
    send(res) {
        return super.prepare(res, this);
    }
}
exports.NoContentResponse = NoContentResponse;
class FailureResponse extends ApiResponse {
    constructor(message, data) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
        this.data = data;
    }
    send(res) {
        return super.prepare(res, this);
    }
}
exports.FailureResponse = FailureResponse;
class AccessTokenErrorResponse extends ApiResponse {
    constructor(message = "Access token invalid") {
        super(StatusCode.UNAUTHORIZED, ResponseStatus.UNAUTHORIZED, message);
        this.instruction = "refresh_token";
    }
    send(res) {
        res.setHeader("instruction", this.instruction);
        return super.prepare(res, this);
    }
}
exports.AccessTokenErrorResponse = AccessTokenErrorResponse;
class TokenRefreshResponse extends ApiResponse {
    constructor(message, accessToken, refreshToken) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
    send(res) {
        return super.prepare(res, this);
    }
}
exports.TokenRefreshResponse = TokenRefreshResponse;
