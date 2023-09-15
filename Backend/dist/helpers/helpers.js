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
exports.db2 = void 0;
const Sequelize = require('sequelize');
const { db1 } = require('../db');
const db2 = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield db1.apps.findOne({
        attributes: ["database", "database_host", "database_username", "database_password"],
        where: {
            id: id,
        }
    });
    data = JSON.parse(JSON.stringify(data));
    return new Sequelize(data.database, data.database_username, data.database_password, {
        host: data.database_host,
        dialect: 'mysql',
    });
});
exports.db2 = db2;
const dbConfig = { type: Sequelize.QueryTypes.SELECT };
