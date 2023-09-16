const Sequelize = require('sequelize');
const { db1 } = require('../db')
const fs = require('fs').promises;

/**
 * Dynamic Database Connection based on app Database config
 * @param id - Application ID
 * @returns connection jsonObject
 */
export const db2 = async (id: any) => {

  let data = await db1.apps.findOne({
    attributes: ["database", "database_host", "database_username", "database_password"],
    where: {
      id: id,
    }
  });
  data = JSON.parse(JSON.stringify(data));

  return new Sequelize(
    data.database,
    data.database_username,
    data.database_password,
    {
      host: data.database_host,
      dialect: 'mysql',
    }
  );
}

// Raw Query Config Object
export const dbConfig = { type: Sequelize.QueryTypes.SELECT }

/**
 * Querie Object read or update
 */
export const queryData = () => {
  fs.readFile('./queries.json', 'utf8', (err: any, data: any) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    // Parse the JSON data into a JavaScript object
    let jsonObject;
    try {
      jsonObject = JSON.parse(data);
      console.log('data -->', jsonObject)
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return;
    }

    // Modify the object by appending a new node
    jsonObject.newNode = 'This is a new node';

    // Write the updated object back to the file
    fs.writeFile('./queries.json', JSON.stringify(jsonObject, null, 2), (writeErr: any) => {
      if (writeErr) {
        console.error('Error writing to file:', writeErr);
      } else {
        console.log('Object updated and written to file successfully.');
      }
    });
  });
}

export const queriObject = async () => {
  const data = await fs.readFile('./queries.json', 'utf8')
  return JSON.parse(data)
} 