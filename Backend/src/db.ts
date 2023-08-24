const Sequelize = require('sequelize');
import path from 'path';

const db1 = new Sequelize(process.env.DB1, process.env.USER1, process.env.PSWD1, {
  host: 'localhost',
  dialect: 'mysql', // Use the appropriate dialect
  loging:false
});

const db2 = new Sequelize(process.env.DB2, process.env.USER2, process.env.PSWD2, {
  host: 'localhost',
  dialect: 'mysql', // Use the appropriate dialect
  loging:false
});

db1["apps"] = require(path.join(__dirname, "/modules/apps/app_model"))(db1, Sequelize);
db1["users"] = require(path.join(__dirname, "/modules/users/users-model"))(db1, Sequelize);
db1["packages"] = require(path.join(__dirname, "/modules/packages/package-model"))(db1, Sequelize);
db2["apps"] = require(path.join(__dirname, "/modules/apps/app_model"))(db2, Sequelize);
db2["users"] = require(path.join(__dirname, "/modules/users/users-model"))(db2, Sequelize);
db2["packages"] = require(path.join(__dirname, "/modules/packages/package-model"))(db2, Sequelize);

Object.keys(db1).forEach(function (modelName) {
  if ("associate" in db1[modelName]) {
    db1[modelName].associate(db1);
  }
});
// db2.sync({ force: false }).then(() => {
//   console.log('Database 2 synced');
// });
console.log("Database connected");

db1.Sequelize = Sequelize;
db2.Sequelize = Sequelize;

module.exports = { db1, db2 }