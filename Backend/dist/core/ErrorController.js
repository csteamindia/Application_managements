"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorController = void 0;
class ErrorController {
    constructor() {
        this.success = "Success.";
        this.error = "Oops! something went wrong.";
        this.created = "Data save successfully.";
        this.updated = "Data updated successfully!";
        this.deleted = "Data deleted successfully!";
        this.noContent = "No data found.";
        this.loginFail = "Invalid username and password.";
        this.fetched = "Data fetched successfully.";
        this.authFailure = "Invalid token.";
        this.userExist = "User already exist";
    }
    errorMessage(message, data = []) {
        var placeholder = process.env.ecPlaceHolder == undefined || process.env.ecPlaceHolder == null ? "" : process.env.ecPlaceHolder;
        var regex = new RegExp(placeholder, 'g');
        message.match(regex);
        var count = (message.match(regex) || []).length;
        for (let i = 0; i < count; i++) {
            message = message.replace(placeholder, (data[i] == undefined || data[i] == null ? "" : data[i]));
        }
        return message.charAt(0).toUpperCase() + message.substring(1).toLowerCase().trim();
    }
}
exports.ErrorController = ErrorController;
