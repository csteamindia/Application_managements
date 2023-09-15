const Sequelize = require('sequelize');
const { db1 } = require('../db')

export const db2 = async (id: any) => {
    let data = await db1.apps.findOne({
        attributes:["database", "database_host", "database_username", "database_password"],
        where: {
          id: id,
        }
    });
    data = JSON.parse(JSON.stringify(data));

    return  new Sequelize(
      data.database,
      data.database_username,
      data.database_password,
      {
        host: data.database_host,
        dialect: 'mysql',
      }
    );
}

const dbConfig = { type: Sequelize.QueryTypes.SELECT }