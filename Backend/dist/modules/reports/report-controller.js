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
exports.ReportController = void 0;
const index_1 = require("../../core/index");
const { dbReader, dbWriter } = require("../../db");
const EC = new index_1.ErrorController();
class ReportController {
    getTotalApplicationsSoldMonthly(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let totalUser = yield dbReader.apps.findOne({
                    attributes: [['app_title', 'Application']],
                    where: { id: req.params.id },
                    include: [{
                            model: dbReader.users,
                            attributes: ['full_name', 'package_id', 'email', 'subscribed_date'],
                            include: [{
                                    as: 'package',
                                    model: dbReader.packages,
                                    attributes: ['package_name', 'price']
                                }]
                        }],
                    // group:['subscribed_date']
                });
                totalUser = JSON.parse(JSON.stringify(totalUser));
                let total_amount = 0;
                if (totalUser) {
                    totalUser.users.forEach((x) => {
                        total_amount = total_amount + x.package.price;
                        // console.log("data", x)
                    });
                    console.log(total_amount);
                    new index_1.SuccessResponse(EC.success, {
                        user_count: totalUser.users.length,
                        total_amount,
                        totalUser
                    }).send(res);
                }
                else {
                    throw new Error();
                }
            }
            catch (error) {
                index_1.ApiError.handle(new index_1.BadRequestError(error.message), res);
            }
        });
    }
}
exports.ReportController = ReportController;
