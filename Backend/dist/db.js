"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
const path_1 = __importDefault(require("path"));
const db1 = new Sequelize(process.env.DB1, process.env.USER1, process.env.PSWD1, {
    host: 'localhost',
    dialect: 'mysql',
    loging: false
});
db1["apps"] = require(path_1.default.join(__dirname, "/modules/apps/app_model"))(db1, Sequelize);
db1["users"] = require(path_1.default.join(__dirname, "/modules/users/users-model"))(db1, Sequelize);
db1["packages"] = require(path_1.default.join(__dirname, "/modules/packages/package-model"))(db1, Sequelize);
db1["creds"] = require(path_1.default.join(__dirname, "/modules/demoCreds/demo-cred-model"))(db1, Sequelize);
Object.keys(db1).forEach(function (modelName) {
    if ("associate" in db1[modelName]) {
        db1[modelName].associate(db1);
    }
});
db1.Sequelize = Sequelize;
module.exports = { db1 };
