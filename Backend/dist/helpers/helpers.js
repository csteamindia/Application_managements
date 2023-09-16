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
exports.queriObject = exports.queryData = exports.dbConfig = exports.db2 = void 0;
const Sequelize = require('sequelize');
const { db1 } = require('../db');
const fs = require('fs').promises;
/**
 * Dynamic Database Connection based on app Database config
 * @param id - Application ID
 * @returns connection jsonObject
 */
const db2 = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("step 1");
    let data = yield db1.apps.findOne({
        attributes: ["database", "database_host", "database_username", "database_password"],
        where: {
            id: id,
        }
    });
    data = JSON.parse(JSON.stringify(data));
    console.log("step 2", data);
    return new Sequelize(data.database, data.database_username, data.database_password, {
        host: data.database_host,
        dialect: 'mysql',
    });
});
exports.db2 = db2;
// Raw Query Config Object
exports.dbConfig = { type: Sequelize.QueryTypes.SELECT };
/**
 * Querie Object read or update
 */
const queryData = () => {
    fs.readFile('./queries.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        // Parse the JSON data into a JavaScript object
        let jsonObject;
        try {
            jsonObject = JSON.parse(data);
            console.log('data -->', jsonObject);
        }
        catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return;
        }
        // Modify the object by appending a new node
        jsonObject.newNode = 'This is a new node';
        // Write the updated object back to the file
        fs.writeFile('./queries.json', JSON.stringify(jsonObject, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to file:', writeErr);
            }
            else {
                console.log('Object updated and written to file successfully.');
            }
        });
    });
};
exports.queryData = queryData;
const queriObject = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fs.readFile('./queries.json', 'utf8');
    return JSON.parse(data);
});
exports.queriObject = queriObject;
