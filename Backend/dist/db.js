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
const db2 = new Sequelize(process.env.DB2, process.env.USER2, process.env.PSWD2, {
    host: 'localhost',
    dialect: 'mysql',
    loging: false
});
db1["apps"] = require(path_1.default.join(__dirname, "/modules/apps/app_model"))(db1, Sequelize);
db1["users"] = require(path_1.default.join(__dirname, "/modules/users/users-model"))(db1, Sequelize);
db1["packages"] = require(path_1.default.join(__dirname, "/modules/packages/package-model"))(db1, Sequelize);
db1["creds"] = require(path_1.default.join(__dirname, "/modules/demoCreds/demo-cred-model"))(db1, Sequelize);
db2["apps"] = require(path_1.default.join(__dirname, "/modules/apps/app_model"))(db2, Sequelize);
db2["users"] = require(path_1.default.join(__dirname, "/modules/users/users-model"))(db2, Sequelize);
db2["packages"] = require(path_1.default.join(__dirname, "/modules/packages/package-model"))(db2, Sequelize);
db2["creds"] = require(path_1.default.join(__dirname, "/modules/demoCreds/demo-cred-model"))(db2, Sequelize);
Object.keys(db1).forEach(function (modelName) {
    if ("associate" in db1[modelName]) {
        db1[modelName].associate(db1);
    }
});
// db1.sync({ force: false }).then(() => {
//   console.log('Database 2 synced');
// });
// db2.sync({ force: false }).then(() => {
//   console.log('Database 2 synced');
// });
console.log("Database connected");
db1.Sequelize = Sequelize;
db2.Sequelize = Sequelize;
module.exports = { db1, db2 };
